"use client";
import React, { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import TurnstileWidget, { TurnstileWidgetRef } from "../../TurnstileWidget";
import { Job } from "@/data/careers";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const JobApplyClient = ({ job }: { job: Job }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [turnstileKey, setTurnstileKey] = useState(0);
  const turnstileRef = useRef<TurnstileWidgetRef>(null);

  // Reset Turnstile on mount so the token is fresh for this page load
  useEffect(() => {
    setTimeout(() => {
      turnstileRef.current?.reset();
    }, 300);
  }, [turnstileKey]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = turnstileRef.current?.getToken();
    if (!token) {
      alert("Please complete the security verification.");
      return;
    }

    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("turnstileToken", token);

    try {
      const response = await fetch(
        "https://formflowapi.thefortune.club/api/submit/2ddf5b7e-e0c6-4877-878f-584885823abe",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setSubmitted(true);
        form.reset();
        setSelectedFileName("");
        turnstileRef.current?.reset();
      } else {
        alert("Something went wrong. Please try again later.");
        turnstileRef.current?.reset();
        setTurnstileKey((k) => k + 1);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Error submitting form. Please try again.");
      turnstileRef.current?.reset();
      setTurnstileKey((k) => k + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:sticky lg:top-28 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">
          Apply for this role
        </h2>
      </div>

      <div className="p-6">
        {submitted ? (
          <div className="text-center py-4">
            <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Application submitted
            </h3>
            <p className="text-sm text-gray-600 mb-5">
              Thank you for applying to {job.title}. We&apos;ll review your
              submission and get back to you soon.
            </p>
            <Link
              href="/careers"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Back to Careers
            </Link>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input type="hidden" name="jobTitle" value={job.title} />

            <div className="space-y-1">
              <Label className="text-xs">Full Name</Label>
              <Input name="name" required className="h-9" />
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Email</Label>
              <Input name="email" type="email" required className="h-9" />
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Phone</Label>
              <Input name="phone" required className="h-9" />
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Resume</Label>
              <Input
                type="file"
                name="resume"
                className="h-9"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setSelectedFileName(file ? file.name : "");
                }}
              />
              {selectedFileName && (
                <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                  <span className="text-green-600">✓</span>
                  Selected:{" "}
                  <span className="font-medium">{selectedFileName}</span>
                </p>
              )}
            </div>

            <div className="py-2 min-h-[80px] flex items-center justify-center w-full overflow-visible">
              <TurnstileWidget
                key={`turnstile-${turnstileKey}`}
                ref={turnstileRef}
              />
            </div>

            <Button
              className="w-full rounded-full h-9 bg-blue-600 hover:bg-blue-700"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobApplyClient;
