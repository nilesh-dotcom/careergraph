"use client";

import { CareerPositioning, ParsedProfile } from "@/types";
import { BarChart3, TrendingUp, IndianRupee } from "lucide-react";

interface Props {
  positioning: CareerPositioning;
  profile: ParsedProfile;
}

function formatLPA(value: number): string {
  return `₹${(value / 100000).toFixed(1)}L`;
}

export default function CareerPositioningCard({ positioning, profile }: Props) {
  const { salaryBenchmark } = positioning;

  // Calculate user's position percentage on the salary spectrum
  const range = salaryBenchmark.high - salaryBenchmark.low;
  const userPos = Math.min(
    Math.max(
      ((salaryBenchmark.userCurrent - salaryBenchmark.low) / range) * 100,
      2
    ),
    98
  );
  const medianPos = Math.min(
    Math.max(
      ((salaryBenchmark.median - salaryBenchmark.low) / range) * 100,
      2
    ),
    98
  );

  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-brand-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Career Positioning</h2>
          <p className="text-sm text-gray-400">Where you stand in the market</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Left: Level & Positioning */}
        <div className="space-y-4">
          <div className="p-4 bg-brand-50/60 rounded-xl">
            <p className="text-xs font-medium text-brand-600 uppercase tracking-wide mb-1">Current Level</p>
            <p className="text-base font-semibold text-gray-900">{positioning.currentLevel}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Market Positioning</p>
            <p className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-green-500" />
              {positioning.marketPositioning}
            </p>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">{positioning.positioningInsight}</p>
        </div>

        {/* Right: Salary Benchmark */}
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-1">
            <IndianRupee className="w-3.5 h-3.5" /> Salary Benchmark (Annual)
          </p>

          {/* Salary Bar */}
          <div className="relative mb-6">
            <div className="h-3 bg-gray-100 rounded-full overflow-visible relative">
              {/* Gradient fill */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-brand-300 to-brand-600 rounded-full opacity-60" />

              {/* Median marker */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gray-400"
                style={{ left: `${medianPos}%` }}
              />

              {/* User marker */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-700 border-2 border-white rounded-full shadow-md"
                style={{ left: `${userPos}%`, transform: "translate(-50%, -50%)" }}
              />
            </div>

            {/* Labels */}
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-400">{formatLPA(salaryBenchmark.low)}</span>
              <span className="text-xs text-gray-400">{formatLPA(salaryBenchmark.high)}</span>
            </div>
          </div>

          {/* Values */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-brand-700 rounded-full" />
                <span className="text-sm text-gray-600">Your salary (est.)</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {formatLPA(salaryBenchmark.userCurrent)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-gray-400" />
                <span className="text-sm text-gray-600">Market median</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {formatLPA(salaryBenchmark.median)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 ml-5">Top quartile</span>
              <span className="text-sm text-gray-500">
                {formatLPA(salaryBenchmark.high)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
