"use client";

import { CareerPath } from "@/types";
import { Target, Clock, TrendingUp, CheckCircle2 } from "lucide-react";

interface Props {
  careerPaths: CareerPath[];
}

const demandColors = {
  High: "text-green-700 bg-green-50",
  Medium: "text-yellow-700 bg-yellow-50",
  Low: "text-gray-600 bg-gray-100",
};

const difficultyColors = {
  Easy: "text-green-700 bg-green-50",
  Moderate: "text-yellow-700 bg-yellow-50",
  Hard: "text-red-700 bg-red-50",
};

function formatLPA(value: number): string {
  return `₹${(value / 100000).toFixed(0)}L`;
}

export default function CareerPathsCard({ careerPaths }: Props) {
  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center">
          <Target className="w-5 h-5 text-brand-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Top Career Paths</h2>
          <p className="text-sm text-gray-400">3 best moves based on your profile + market data</p>
        </div>
      </div>

      <div className="space-y-4">
        {careerPaths.map((path, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-xl p-5 hover:border-brand-200 hover:bg-brand-50/30 transition-all duration-200"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-brand-700 text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <h3 className="text-base font-semibold text-gray-900">{path.role}</h3>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${demandColors[path.demandLevel]}`}>
                  {path.demandLevel} Demand
                </span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyColors[path.transitionDifficulty]}`}>
                  {path.transitionDifficulty}
                </span>
              </div>
            </div>

            {/* Fit Reason */}
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{path.fitReason}</p>

            {/* Metrics */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-1.5 text-gray-500">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>
                  {formatLPA(path.salaryRange.min)} – {formatLPA(path.salaryRange.max)}/yr
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500">
                <Clock className="w-4 h-4 text-brand-500" />
                <span>{path.timelineMonths} months to transition</span>
              </div>
            </div>

            {/* Readiness Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-medium text-gray-600">Your Readiness</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  path.readinessScore >= 75
                    ? "text-green-700 bg-green-50"
                    : path.readinessScore >= 50
                    ? "text-yellow-700 bg-yellow-50"
                    : "text-orange-700 bg-orange-50"
                }`}>
                  {path.readinessScore}%
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    path.readinessScore >= 75
                      ? "bg-gradient-to-r from-green-400 to-emerald-500"
                      : path.readinessScore >= 50
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                      : "bg-gradient-to-r from-orange-400 to-red-500"
                  }`}
                  style={{ width: `${path.readinessScore}%` }}
                />
              </div>
            </div>

            {/* Key Requirements */}
            <div className="flex flex-wrap gap-1.5">
              {path.keyRequirements.map((req, j) => (
                <span
                  key={j}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full"
                >
                  <CheckCircle2 className="w-3 h-3 text-gray-400" />
                  {req}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
