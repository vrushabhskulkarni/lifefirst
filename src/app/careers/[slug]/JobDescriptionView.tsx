import { Check } from "lucide-react";
import { Job } from "@/data/careers";

const JobDescriptionView = ({ job }: { job: Job }) => {
  const { description } = job;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">
          Job Description
        </h2>
      </div>

      {description ? (
        <div className="p-6 space-y-8">
          {(description.positions ||
            description.experience ||
            description.employmentType) && (
            <div className="flex flex-wrap gap-2">
              {description.positions && (
                <span className="text-xs font-medium bg-blue-50 text-blue-700 rounded-full px-3 py-1.5">
                  {description.positions} open position
                  {description.positions === "1" ? "" : "s"}
                </span>
              )}
              {description.experience && (
                <span className="text-xs font-medium bg-blue-50 text-blue-700 rounded-full px-3 py-1.5">
                  {description.experience} experience
                </span>
              )}
              {description.employmentType && (
                <span className="text-xs font-medium bg-blue-50 text-blue-700 rounded-full px-3 py-1.5">
                  {description.employmentType}
                </span>
              )}
            </div>
          )}

          {description.sections.map((section) => (
            <div key={section.heading}>
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                {section.heading}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                      <Check className="w-3 h-3 text-blue-600" strokeWidth={2.5} />
                    </span>
                    <span className="text-gray-600 leading-relaxed text-[15px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : job.pdf ? (
        <div className="p-6 space-y-4">
          <p className="text-gray-600 text-[15px] leading-relaxed">
            View the full job description for {job.title} in the PDF below.
          </p>
          <div className="hidden md:block border border-gray-100 rounded-xl overflow-hidden h-[70vh]">
            <iframe src={job.pdf} className="w-full h-full" />
          </div>
          <a
            href={job.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 transition-colors"
          >
            View Job Description (PDF)
          </a>
        </div>
      ) : (
        <div className="p-6">
          <p className="text-gray-600 text-[15px] leading-relaxed">
            Job description for {job.title} is coming soon.
          </p>
        </div>
      )}
    </div>
  );
};

export default JobDescriptionView;
