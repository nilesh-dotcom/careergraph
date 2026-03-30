"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/results/ProfileHeader";
import CareerPositioningCard from "@/components/results/CareerPositioningCard";
import CareerPathsCard from "@/components/results/CareerPathsCard";
import SkillGapCard from "@/components/results/SkillGapCard";
import MarketInsightsCard from "@/components/results/MarketInsightsCard";
import ActionPlanCard from "@/components/results/ActionPlanCard";
import JobMatchesCard from "@/components/results/JobMatchesCard";
import PaywallBanner from "@/components/results/PaywallBanner";
import { CareerReport } from "@/types";
import { Loader2, RefreshCw, AlertTriangle, Sparkles } from "lucide-react";
import WowInsightCard from "@/components/results/WowInsightCard";
import ResumeSuggestionsCard from "@/components/results/ResumeSuggestionsCard";

export default function ResultsPage() {
  const router = useRouter();
  const [report, setReport] = useState<CareerReport | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMockData, setIsMockData] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("careerReport");
      const mockFlag = sessionStorage.getItem("isMockReport");

      if (stored) {
        setReport(JSON.parse(stored));
        setIsMockData(mockFlag === "true");
      } else {
        // No report in session — redirect to analyze
        router.push("/analyze");
      }
    } catch (err) {
      router.push("/analyze");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleUnlock = () => {
    // TODO: Integrate Razorpay here
    // For now, simulate unlock
    alert("Razorpay integration coming soon! For now, unlocking preview...");
    setIsUnlocked(true);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50/30">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-brand-600 animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading your report...</p>
        </div>
      </main>
    );
  }

  if (!report) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50/30">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <p className="text-gray-700 font-medium mb-2">No report found</p>
          <Link href="/analyze" className="btn-primary text-sm py-2">
            Start analysis
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/30">
      <Navbar />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

          {/* Mock data notice */}
          {isMockData && (
            <div className="mb-6 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800">Running in demo mode</p>
                <p className="text-sm text-amber-700">
                  This is a sample report. Add your{" "}
                  <code className="px-1 py-0.5 bg-amber-100 rounded text-xs font-mono">OPENAI_API_KEY</code>
                  {" "}to{" "}
                  <code className="px-1 py-0.5 bg-amber-100 rounded text-xs font-mono">.env.local</code>
                  {" "}for a real analysis based on your resume.
                </p>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Your Career Report</h1>
              <p className="text-sm text-gray-400 mt-0.5">
                Generated {new Date(report.generatedAt).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric"
                })}
              </p>
            </div>
            <Link href="/analyze" className="btn-secondary text-sm py-2 px-4 gap-1.5">
              <RefreshCw className="w-4 h-4" />
              New Analysis
            </Link>
          </div>

          {/* Profile Header */}
          <div className="mb-6">
            <ProfileHeader profile={report.profile} />
          </div>

          {/* Section 1: Career Positioning — Always visible */}
          <div className="mb-6">
            <CareerPositioningCard
              positioning={report.positioning}
              profile={report.profile}
            />
          </div>

          {/* Section 2: Career Paths — Always visible */}
          <div className="mb-6">
            <CareerPathsCard careerPaths={report.careerPaths} />
          </div>

          {/* Section 2.5: Wow Insight — Always visible */}
          <div className="mb-6">
            <WowInsightCard insight={report.wowInsight} />
          </div>

          {/* Section 2.6: Resume Suggestions — Always visible */}
          <div className="mb-6">
            <ResumeSuggestionsCard suggestions={report.resumeSuggestions} />
          </div>

          {/* PAYWALL — shows after 2 free sections */}
          {!isUnlocked && (
            <PaywallBanner onUnlock={handleUnlock} />
          )}

          {/* Section 3: Skill Gap — gated */}
          <div className={`mb-6 ${!isUnlocked ? "opacity-40 pointer-events-none select-none blur-sm" : ""}`}>
            <SkillGapCard
              skillGaps={report.skillGaps}
              skillMatches={report.skillMatches}
            />
          </div>

          {/* Section 4: Market Insights — gated */}
          <div className={`mb-6 ${!isUnlocked ? "opacity-40 pointer-events-none select-none blur-sm" : ""}`}>
            <MarketInsightsCard insights={report.marketInsights} />
          </div>

          {/* Section 5: Action Plan — gated */}
          <div className={`mb-6 ${!isUnlocked ? "opacity-40 pointer-events-none select-none blur-sm" : ""}`}>
            <ActionPlanCard actionPlan={report.actionPlan} />
          </div>

          {/* Section 6: Job Matches — partially gated */}
          <div className="mb-6">
            <JobMatchesCard
              jobMatches={report.jobMatches}
              isLocked={!isUnlocked}
            />
          </div>

          {/* Second unlock CTA at bottom */}
          {!isUnlocked && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm mb-4">
                Unlock your complete analysis including skill gaps, action plan, and all job matches.
              </p>
              <button onClick={handleUnlock} className="btn-primary">
                Unlock Full Report — ₹499
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
