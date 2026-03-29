"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResumeUploader from "@/components/ResumeUploader";
import {
  ArrowRight,
  Loader2,
  MapPin,
  X,
  BriefcaseBusiness,
  IndianRupee,
} from "lucide-react";

const SALARY_RANGES = [
  "Below 5 LPA",
  "5-10 LPA",
  "10-15 LPA",
  "15-25 LPA",
  "25-40 LPA",
  "40-60 LPA",
  "60-80 LPA",
  "80+ LPA",
];

const POPULAR_CITIES = [
  "Bangalore",
  "Mumbai",
  "Delhi NCR",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
  "Remote",
];

export default function AnalyzePage() {
  const router = useRouter();
  const [resume, setResume] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");
  const [desiredSalary, setDesiredSalary] = useState("");
  const [preferredCities, setPreferredCities] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const toggleCity = (city: string) => {
    setPreferredCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const canProceedStep1 = resume !== null;
  const canProceedStep2 = currentSalary && desiredSalary;
  const canSubmit = resume && currentSalary && desiredSalary && preferredCities.length > 0;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Read file as base64
      const fileBuffer = await resume.arrayBuffer();
      const base64 = Buffer.from(fileBuffer).toString("base64");

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeBase64: base64,
          resumeFileName: resume.name,
          targetRole,
          currentSalary,
          desiredSalary,
          preferredCities,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Analysis failed. Please try again.");
      }

      // Store report in sessionStorage for the results page
      sessionStorage.setItem("careerReport", JSON.stringify(data.report));
      sessionStorage.setItem("isMockReport", data.mock ? "true" : "false");
      router.push("/results");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/30">
      <Navbar />

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Analyze your career
            </h1>
            <p className="mt-3 text-gray-500">
              Upload your resume and tell us your preferences. Takes about 2
              minutes.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    step >= s
                      ? "bg-brand-700 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-0.5 ${
                      step > s ? "bg-brand-700" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Resume Upload */}
          {step === 1 && (
            <div className="card p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <BriefcaseBusiness className="w-5 h-5 text-brand-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Your Resume
                </h2>
              </div>

              <ResumeUploader onFileSelect={setResume} selectedFile={resume} />

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target role{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g., Engineering Manager, Staff Engineer, Product Manager"
                  className="input-field"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="btn-primary w-full mt-8 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          )}

          {/* Step 2: Salary */}
          {step === 2 && (
            <div className="card p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <IndianRupee className="w-5 h-5 text-brand-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Salary Information
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Current salary range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SALARY_RANGES.map((range) => (
                      <button
                        key={range}
                        onClick={() => setCurrentSalary(range)}
                        className={`px-4 py-2.5 text-sm rounded-xl border transition-all ${
                          currentSalary === range
                            ? "border-brand-500 bg-brand-50 text-brand-700 font-medium"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Desired salary range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SALARY_RANGES.map((range) => (
                      <button
                        key={range}
                        onClick={() => setDesiredSalary(range)}
                        className={`px-4 py-2.5 text-sm rounded-xl border transition-all ${
                          desiredSalary === range
                            ? "border-brand-500 bg-brand-50 text-brand-700 font-medium"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Cities + Submit */}
          {step === 3 && (
            <div className="card p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-5 h-5 text-brand-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Preferred Locations
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {POPULAR_CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => toggleCity(city)}
                    className={`px-4 py-2.5 text-sm rounded-xl border transition-all ${
                      preferredCities.includes(city)
                        ? "border-brand-500 bg-brand-50 text-brand-700 font-medium"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {city}
                    {preferredCities.includes(city) && (
                      <X className="w-3 h-3 ml-1.5 inline" />
                    )}
                  </button>
                ))}
              </div>

              {preferredCities.length === 0 && (
                <p className="text-sm text-gray-400 mt-3">
                  Select at least one location
                </p>
              )}

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="btn-secondary flex-1"
                  disabled={isAnalyzing}
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isAnalyzing}
                  className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Generate My Report
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>

              {isAnalyzing && (
                <div className="mt-6 text-center">
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-600 rounded-full animate-pulse w-2/3" />
                    </div>
                    <p className="text-sm text-gray-400">
                      Parsing your resume, fetching job data, and generating
                      insights...
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
