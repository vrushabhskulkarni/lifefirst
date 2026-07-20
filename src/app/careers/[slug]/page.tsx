import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "@/Landing/Navigation";
import Footer from "@/Landing/Footer";
import JsonLd from "@/components/JsonLd";
import { jobs, Job } from "@/data/careers";
import JobApplyClient from "./JobApplyClient";
import JobDescriptionView from "./JobDescriptionView";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const JobPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const job = jobs.find((j: Job) => j.slug === slug);

  if (!job) {
    notFound();
  }

  const baseUrl = "https://life-first.in";
  const jobUrl = `${baseUrl}/careers/${job.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Careers",
        item: `${baseUrl}/careers`,
      },
      { "@type": "ListItem", position: 3, name: job.title, item: jobUrl },
    ],
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      <JsonLd data={breadcrumbSchema} />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4 sm:px-6 lg:px-8 mt-24 md:mt-26">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/careers"
            className="inline-block text-sm text-blue-100 hover:text-white mb-3 transition-colors"
          >
            ← Back to Careers
          </Link>
          <h1 className="text-2xl md:text-5xl font-extrabold mb-3 drop-shadow-lg">
            {job.title}
          </h1>
          <p className="text-md md:text-lg font-light drop-shadow-md">
            {job.department} • {job.location}
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
          <JobDescriptionView job={job} />
          <JobApplyClient job={job} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobPage;

export async function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const job = jobs.find((j: Job) => j.slug === slug);

  if (!job) {
    return {
      title: "Job Not Found",
      description: "The requested job opening could not be found.",
    };
  }

  return {
    title: `${job.title} | Careers at LifeFirst`,
    description: `Apply for the ${job.title} role (${job.department}) at LifeFirst, ${job.location}.`,
  };
}
