// Load environment variables from .env file
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

// Load .env from project root
dotenvConfig({ path: resolve(process.cwd(), ".env") });

import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { createWriteStream, readdirSync, unlinkSync, existsSync, mkdirSync, readFileSync } from "fs";
import { join, dirname, basename, extname } from "path";
import { pipeline } from "stream/promises";
import ffmpeg from "fluent-ffmpeg";
import { Readable } from "stream";

// Configuration from environment variables
const config = {
  accountId: process.env.R2_ACCOUNT_ID || "",
  accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  bucketName: process.env.R2_BUCKET_NAME || "",
  endpoint: process.env.R2_ENDPOINT || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  // Optional: specify video prefix/folder in R2
  videoPrefix: process.env.R2_VIDEO_PREFIX || "",
  // Optional: convert only specific R2 object keys (comma-separated)
  videoKeys: (process.env.R2_VIDEO_KEYS || "")
    .split(",")
    .map((key) => key.trim())
    .filter(Boolean),
  // Optional: convert local MP4 file paths (comma-separated, relative to project root or absolute path)
  localVideoFiles: (process.env.LOCAL_VIDEO_FILES || "")
    .split(",")
    .map((file) => file.trim())
    .filter(Boolean),
  // Optional: R2 source prefix used for local files (helps place HLS under hls/{prefix}/...)
  localVideoPrefix: process.env.LOCAL_VIDEO_PREFIX || "",
  // Optional: output folder for HLS files
  hlsPrefix: process.env.R2_HLS_PREFIX || "hls",
  // FFmpeg settings
  segmentDuration: parseInt(process.env.HLS_SEGMENT_DURATION || "10"), // seconds
  deleteOriginal: process.env.DELETE_ORIGINAL_MP4 === "true", // Set to true to delete MP4 after conversion
  // Safety guard: skip conversion if target HLS manifest already exists
  skipIfHLSExists: process.env.SKIP_IF_HLS_EXISTS !== "false",
};

// Initialize S3 client for R2
const s3Client = new S3Client({
  region: "auto",
  endpoint: config.endpoint,
  credentials: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  },
});

// Temporary directory for processing
const TEMP_DIR = join(process.cwd(), ".temp-videos");
const HLS_TEMP_DIR = join(TEMP_DIR, "hls-output");

// Ensure temp directories exist
if (!existsSync(TEMP_DIR)) {
  mkdirSync(TEMP_DIR, { recursive: true });
}
if (!existsSync(HLS_TEMP_DIR)) {
  mkdirSync(HLS_TEMP_DIR, { recursive: true });
}

interface VideoFile {
  key: string;
  name: string;
  localPath?: string;
}

function getHlsDirForVideo(video: VideoFile): string {
  const originalDir = dirname(video.key);
  const baseName = basename(video.name, extname(video.name));
  return originalDir === "."
    ? `${config.hlsPrefix}/${baseName}`
    : `${config.hlsPrefix}/${originalDir}/${baseName}`;
}

function getManifestKeyForVideo(video: VideoFile): string {
  const baseName = basename(video.name, extname(video.name));
  return `${getHlsDirForVideo(video)}/${baseName}.m3u8`;
}

async function hlsManifestExists(video: VideoFile): Promise<boolean> {
  const manifestKey = getManifestKeyForVideo(video);
  try {
    await s3Client.send(
      new HeadObjectCommand({
        Bucket: config.bucketName,
        Key: manifestKey,
      })
    );
    return true;
  } catch {
    return false;
  }
}

/**
 * List all MP4 files in the R2 bucket
 */
async function listMP4Files(): Promise<VideoFile[]> {
  if (config.localVideoFiles.length > 0) {
    console.log("📋 Using local MP4 files from LOCAL_VIDEO_FILES...");
    const localVideos = config.localVideoFiles
      .map((filePath) => {
        const absolutePath = resolve(process.cwd(), filePath);
        return {
          key: config.localVideoPrefix
            ? `${config.localVideoPrefix.replace(/\/+$/, "")}/${basename(filePath)}`
            : basename(filePath),
          name: basename(filePath),
          localPath: absolutePath,
        };
      })
      .filter((video) => video.name.toLowerCase().endsWith(".mp4") && existsSync(video.localPath || ""));
    console.log(`✅ Found ${localVideos.length} local MP4 file(s)`);
    return localVideos;
  }

  if (config.videoKeys.length > 0) {
    console.log("📋 Using explicit R2 video keys from R2_VIDEO_KEYS...");
    const explicitVideos = config.videoKeys
      .filter((key) => key.toLowerCase().endsWith(".mp4"))
      .map((key) => ({
        key,
        name: basename(key),
      }));
    console.log(`✅ Found ${explicitVideos.length} explicit MP4 file(s)`);
    return explicitVideos;
  }

  console.log("📋 Listing MP4 files from R2 bucket...");
  const videos: VideoFile[] = [];
  let continuationToken: string | undefined;

  do {
    const command = new ListObjectsV2Command({
      Bucket: config.bucketName,
      Prefix: config.videoPrefix,
      ContinuationToken: continuationToken,
    });

    const response = await s3Client.send(command);
    
    if (response.Contents) {
      for (const object of response.Contents) {
        if (object.Key && object.Key.endsWith(".mp4")) {
          videos.push({
            key: object.Key,
            name: basename(object.Key),
          });
        }
      }
    }

    continuationToken = response.NextContinuationToken;
  } while (continuationToken);

  console.log(`✅ Found ${videos.length} MP4 file(s)`);
  return videos;
}

/**
 * Download a file from R2
 */
async function downloadFromR2(key: string, localPath: string): Promise<void> {
  console.log(`⬇️  Downloading ${key}...`);
  const command = new GetObjectCommand({
    Bucket: config.bucketName,
    Key: key,
  });

  const response = await s3Client.send(command);
  
  if (!response.Body) {
    throw new Error(`Failed to download ${key}: No body in response`);
  }

  const body = response.Body as Readable;
  const writeStream = createWriteStream(localPath);
  
  await pipeline(body, writeStream);
  console.log(`✅ Downloaded ${key}`);
}

/**
 * Convert MP4 to HLS format
 */
async function convertToHLS(inputPath: string, outputDir: string, baseName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const outputPath = join(outputDir, `${baseName}.m3u8`);
    
    console.log(`🔄 Converting ${baseName} to HLS...`);
    
    ffmpeg(inputPath)
      .outputOptions([
        "-codec: copy", // Copy codec (faster, no re-encoding)
        "-start_number 0",
        `-hls_time ${config.segmentDuration}`,
        "-hls_list_size 0", // Keep all segments in playlist
        "-f hls",
        "-hls_segment_filename", join(outputDir, `${baseName}_%03d.ts`),
      ])
      .output(outputPath)
      .on("start", (commandLine: string) => {
        console.log(`   FFmpeg command: ${commandLine}`);
      })
      .on("progress", (progress: { percent?: number }) => {
        if (progress.percent) {
          process.stdout.write(`\r   Progress: ${Math.round(progress.percent)}%`);
        }
      })
      .on("end", () => {
        console.log(`\n✅ Conversion complete: ${baseName}`);
        resolve(outputPath);
      })
      .on("error", (err: Error) => {
        console.error(`\n❌ Conversion failed: ${err.message}`);
        reject(err);
      })
      .run();
  });
}

/**
 * Upload a file to R2
 */
async function uploadToR2(localPath: string, r2Key: string, contentType: string): Promise<void> {
  console.log(`⬆️  Uploading ${r2Key}...`);
  
  const fileContent = readFileSync(localPath);
  
  const command = new PutObjectCommand({
    Bucket: config.bucketName,
    Key: r2Key,
    Body: fileContent,
    ContentType: contentType,
  });

  await s3Client.send(command);
  console.log(`✅ Uploaded ${r2Key}`);
}

/**
 * Upload all HLS files (m3u8 + ts segments) to R2
 */
async function uploadHLSToR2(localDir: string, baseName: string, originalKey: string): Promise<string> {
  const files = readdirSync(localDir);
  const hlsFiles = files.filter(f => 
    f.startsWith(baseName) && (f.endsWith(".m3u8") || f.endsWith(".ts"))
  );

  // Determine the HLS path in R2
  const originalDir = dirname(originalKey);
  const hlsDir = originalDir === "." 
    ? `${config.hlsPrefix}/${baseName}`
    : `${config.hlsPrefix}/${originalDir}/${baseName}`;

  // Upload m3u8 file first
  const m3u8File = hlsFiles.find(f => f.endsWith(".m3u8"));
  if (m3u8File) {
    const m3u8Key = `${hlsDir}/${m3u8File}`;
    await uploadToR2(join(localDir, m3u8File), m3u8Key, "application/vnd.apple.mpegurl");
  }

  // Upload all TS segments
  const tsFiles = hlsFiles.filter(f => f.endsWith(".ts"));
  for (const tsFile of tsFiles) {
    const tsKey = `${hlsDir}/${tsFile}`;
    await uploadToR2(join(localDir, tsFile), tsKey, "video/mp2t");
  }

  // Return the m3u8 URL
  const m3u8Key = `${hlsDir}/${m3u8File}`;
  return m3u8Key;
}

/**
 * Clean up temporary files
 */
function cleanupTempFiles(filePath: string): void {
  try {
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  } catch (error) {
    console.warn(`⚠️  Failed to delete temp file ${filePath}:`, error);
  }
}

/**
 * Clean up HLS output directory
 */
function cleanupHLSDir(): void {
  try {
    const files = readdirSync(HLS_TEMP_DIR);
    for (const file of files) {
      const filePath = join(HLS_TEMP_DIR, file);
      try {
        unlinkSync(filePath);
      } catch (error) {
        console.warn(`⚠️  Failed to delete ${filePath}:`, error);
      }
    }
  } catch (error) {
    console.warn(`⚠️  Failed to cleanup HLS dir:`, error);
  }
}

/**
 * Main conversion process
 */
async function convertVideo(video: VideoFile): Promise<string | null> {
  const tempMP4Path = join(TEMP_DIR, video.name);
  const baseName = basename(video.name, extname(video.name));
  const inputPath = video.localPath || tempMP4Path;

  try {
    // Step 1: Use local MP4 or download from R2
    if (video.localPath) {
      console.log(`📁 Using local file ${video.localPath}`);
    } else {
      await downloadFromR2(video.key, tempMP4Path);
    }

    // Step 2: Convert to HLS
    await convertToHLS(inputPath, HLS_TEMP_DIR, baseName);

    // Step 3: Upload HLS files to R2
    const hlsKey = await uploadHLSToR2(HLS_TEMP_DIR, baseName, video.key);

    // Step 4: Cleanup temp files
    if (!video.localPath) {
      cleanupTempFiles(tempMP4Path);
    }
    cleanupHLSDir();

    // Step 5: Optionally delete original MP4
    if (config.deleteOriginal) {
      console.log(`🗑️  Deleting original MP4: ${video.key}`);
      // Note: You'd need to implement DeleteObjectCommand for this
      // For now, we'll skip this step
    }

    return hlsKey;
  } catch (error) {
    console.error(`❌ Failed to convert ${video.name}:`, error);
    if (!video.localPath) {
      cleanupTempFiles(tempMP4Path);
    }
    cleanupHLSDir();
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log("🚀 Starting R2 to HLS conversion process...\n");
  if (config.skipIfHLSExists) {
    console.log("🛡️  Safety mode ON: existing HLS manifests will be skipped.");
  } else {
    console.log("⚠️  Safety mode OFF: existing HLS outputs can be overwritten.");
  }

  // Validate configuration
  if (!config.accountId || !config.accessKeyId || !config.secretAccessKey || !config.bucketName) {
    console.error("❌ Missing required environment variables!");
    console.error("Please set:");
    console.error("  - R2_ACCOUNT_ID");
    console.error("  - R2_ACCESS_KEY_ID");
    console.error("  - R2_SECRET_ACCESS_KEY");
    console.error("  - R2_BUCKET_NAME");
    process.exit(1);
  }

  try {
    // List all MP4 files
    const videos = await listMP4Files();

    if (videos.length === 0) {
      console.log("ℹ️  No MP4 files found in the bucket.");
      return;
    }

    // Process each video
    const results: Array<{ original: string; hls: string | null }> = [];
    
    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      console.log(`\n[${i + 1}/${videos.length}] Processing: ${video.name}`);

      if (config.skipIfHLSExists && (await hlsManifestExists(video))) {
        const manifestKey = getManifestKeyForVideo(video);
        console.log(`⏭️  Skipping ${video.name} (already exists: ${manifestKey})`);
        results.push({
          original: video.key,
          hls: manifestKey,
        });
        continue;
      }

      const hlsKey = await convertVideo(video);
      results.push({
        original: video.key,
        hls: hlsKey,
      });
    }

    // Summary
    console.log("\n" + "=".repeat(60));
    console.log("📊 Conversion Summary");
    console.log("=".repeat(60));
    
    const successful = results.filter(r => r.hls !== null).length;
    const failed = results.length - successful;
    
    console.log(`✅ Successful: ${successful}`);
    console.log(`❌ Failed: ${failed}`);
    console.log("\n📝 HLS URLs:");
    
    results.forEach((result, index) => {
      if (result.hls) {
        // Construct the public URL (adjust based on your R2 public URL structure)
        const publicUrl = `https://${config.bucketName}/${result.hls}`;
        console.log(`  ${index + 1}. ${result.original} → ${publicUrl}`);
      } else {
        console.log(`  ${index + 1}. ${result.original} → ❌ Failed`);
      }
    });

  } catch (error) {
    console.error("❌ Fatal error:", error);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);

