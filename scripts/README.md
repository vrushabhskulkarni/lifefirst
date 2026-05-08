# R2 to HLS Video Conversion Script

This script automatically converts MP4 videos stored in Cloudflare R2 to HLS format (.m3u8 + .ts segments) for optimized streaming.

## Prerequisites

1. **FFmpeg installed on your system**
   - Windows: Download from [ffmpeg.org](https://ffmpeg.org/download.html) or use `choco install ffmpeg`
   - macOS: `brew install ffmpeg`
   - Linux: `sudo apt-get install ffmpeg` or `sudo yum install ffmpeg`

2. **Cloudflare R2 credentials**
   - Account ID
   - Access Key ID
   - Secret Access Key
   - Bucket Name

## Setup

1. **Create a `.env` file in the project root** with the following variables:

```env
# Cloudflare R2 Configuration
R2_ACCOUNT_ID=your_account_id_here
R2_ACCESS_KEY_ID=your_access_key_id_here
R2_SECRET_ACCESS_KEY=your_secret_access_key_here
R2_BUCKET_NAME=your_bucket_name_here

# Optional: Video prefix/folder in R2 (e.g., "videos/" to only process videos in that folder)
R2_VIDEO_PREFIX=

# Optional: Convert only specific MP4 object keys (comma-separated)
# Example: videos/new/video1.mp4,videos/new/video2.mp4
R2_VIDEO_KEYS=

# Optional: Convert local MP4 files from your machine (comma-separated paths)
# Example: scripts/new-video.mp4,scripts/others/another-video.mp4
LOCAL_VIDEO_FILES=

# Optional: Prefix applied to LOCAL_VIDEO_FILES for HLS output path
# Example: others
LOCAL_VIDEO_PREFIX=

# Optional: HLS output prefix/folder (default: "hls")
R2_HLS_PREFIX=hls

# HLS Segment Duration in seconds (default: 10)
HLS_SEGMENT_DURATION=10

# Delete original MP4 after conversion (default: false)
DELETE_ORIGINAL_MP4=false

# Safety mode: skip conversion when target HLS manifest already exists (default: true)
SKIP_IF_HLS_EXISTS=true
```

2. **Install dependencies** (already done):
```bash
npm install
```

## Usage

Run the conversion script:

```bash
npm run convert:hls
```

Or directly with tsx:

```bash
npx tsx scripts/convert-r2-to-hls.ts
```

### Safe Add-Only Run (Recommended for adding new videos)

To convert only newly uploaded videos while keeping existing HLS outputs untouched:

1. Set `SKIP_IF_HLS_EXISTS=true` (default behavior).
2. Set `R2_VIDEO_KEYS` to the exact 2 new MP4 object keys.
3. Run:

```bash
npm run convert:hls
```

Example:

```env
R2_VIDEO_KEYS=gallery/new-video-1.mp4,gallery/new-video-2.mp4
SKIP_IF_HLS_EXISTS=true
```

### Convert a local MP4 from `scripts/` and upload HLS

If your video file is in this repo (for example inside `scripts/`), you can convert and upload directly:

```env
LOCAL_VIDEO_FILES=scripts/your-video.mp4
LOCAL_VIDEO_PREFIX=
SKIP_IF_HLS_EXISTS=true
```

Then run:

```bash
npm run convert:hls
```

For this mode, HLS is uploaded to:

```text
{R2_HLS_PREFIX}/{LOCAL_VIDEO_PREFIX(optional)}/{video_name_without_ext}/{video_name_without_ext}.m3u8
```

## How It Works

1. **Lists all MP4 files** in your R2 bucket (optionally filtered by prefix)
   - If `LOCAL_VIDEO_FILES` is set, local files are used directly (no R2 MP4 download)
   - If `R2_VIDEO_KEYS` is set, only those files are processed
2. **Downloads each MP4** to a temporary directory
3. **Converts to HLS format** using FFmpeg:
   - Creates `.m3u8` playlist file
   - Segments video into `.ts` files (default: 10 seconds per segment)
4. **Uploads HLS files** back to R2 in the specified HLS folder
5. **Cleans up** temporary files
6. **Displays summary** with new HLS URLs

## Output Structure

HLS files are stored in R2 with this structure:
```
hls/
  └── {original_folder}/
      └── {video_name}/
          ├── {video_name}.m3u8
          ├── {video_name}_000.ts
          ├── {video_name}_001.ts
          └── ...
```

## Example Output

```
🚀 Starting R2 to HLS conversion process...

📋 Listing MP4 files from R2 bucket...
✅ Found 15 MP4 file(s)

[1/15] Processing: 3MLD_jftt8k.mp4
⬇️  Downloading 3MLD_jftt8k.mp4...
✅ Downloaded 3MLD_jftt8k.mp4
🔄 Converting 3MLD_jftt8k to HLS...
   Progress: 100%
✅ Conversion complete: 3MLD_jftt8k
⬆️  Uploading hls/3MLD_jftt8k/3MLD_jftt8k.m3u8...
✅ Uploaded hls/3MLD_jftt8k/3MLD_jftt8k.m3u8
...

📊 Conversion Summary
============================================================
✅ Successful: 15
❌ Failed: 0

📝 HLS URLs:
  1. 3MLD_jftt8k.mp4 → https://your-bucket.r2.dev/hls/3MLD_jftt8k/3MLD_jftt8k.m3u8
  ...
```

## Updating Gallery URLs

After conversion, update your `src/app/gallery/page.tsx` file to use the new HLS URLs:

```typescript
{
  id: 1,
  title: "3MLD",
  url: "https://gallery.life-first.in/hls/3MLD_jftt8k/3MLD_jftt8k.m3u8", // Changed from .mp4 to .m3u8
  // ...
}
```

## Troubleshooting

### FFmpeg not found
- Ensure FFmpeg is installed and in your system PATH
- Test with: `ffmpeg -version`

### R2 Connection Issues
- Verify your credentials in `.env`
- Check that your R2 bucket name is correct
- Ensure your R2 API token has read/write permissions

### Conversion Fails
- Check video file format (must be valid MP4)
- Ensure sufficient disk space for temporary files
- Check FFmpeg logs in the console output

### Large Files
- The script processes videos sequentially to avoid memory issues
- For very large files, consider increasing `HLS_SEGMENT_DURATION` to create fewer segments

## Notes

- Original MP4 files are preserved by default (set `DELETE_ORIGINAL_MP4=true` to delete them)
- Temporary files are automatically cleaned up after each conversion
- The script uses codec copy mode for faster conversion (no re-encoding)

