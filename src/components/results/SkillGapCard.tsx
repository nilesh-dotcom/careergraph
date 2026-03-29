"use client";

import { SkillGap, SkillMatch } from "@/types";
import { TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

interface Props {
  skillGaps: SkillGap[];
  skillMatches: SkillMatch[];
}

const importanceConfig = {
  Critical: { color: "text-red-700 bg-red-50 border-red-200", dot: "bg-red-500" },
  High: { color: "text-orange-700 bg-orange-50 border-orange-200", dot: "bg-orange-400" },
  Medium: { color: "text-yellow-700 bg-yellow-50 border-yellow-200", dot: "bg-yellow-400" },
};

export default function SkillGapCard({ skillGaps, skillMatches }: Props) {
  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-brand-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Skill Gap Analysis</h2>
          <p className="text-sm text-gray-400">Your skills vs. real job market requirements</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Gaps */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <h3 className="text-sm font-semibold text-gray-700">Skills to Develop</h3>
          </div>
          <div className="space-y-3">
            {skillGaps.map((gap, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${importanceConfig[gap.importance].dot}`} />
                    <span className="text-sm font-medium text-gray-800">{gap.skill}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${importanceConfig[gap.importance].color}`}>
                      {gap.importance}
                    </span>
                    <span className="text-xs text-gray-400 w-8 text-right">{gap.marketDemand}%</span>
                  </div>
                </div>

                {/* Market demand bar */}
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-400 to-orange-400 rounded-full transition-all duration-700"
                    style={{ width: `${gap.marketDemand}%` }}
                  />
                </div>

                <p className="text-xs text-gray-500 leading-relaxed">{gap.recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <h3 className="text-sm font-semibold text-gray-700">Your Strengths</h3>
          </div>
          <div className="space-y-3">
            {skillMatches.map((match, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${match.strength === "Strong" ? "bg-green-500" : "bg-blue-400"}`} />
                    <span className="text-sm font-medium text-gray-800">{match.skill}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${match.strength === "Strong" ? "text-green-700 bg-green-50" : "text-blue-700 bg-blue-50"}`}>
                      {match.strength}
                    </span>
                    <span className="text-xs text-gray-400 w-8 text-right">{match.marketDemand}%</span>
                  </div>
                </div>

                {/* Market demand bar */}
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-700"
                    style={{ width: `${match.marketDemand}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-4">% = share of job postings requiring this skill</p>
        </div>
      </div>
    </div>
  );
}
