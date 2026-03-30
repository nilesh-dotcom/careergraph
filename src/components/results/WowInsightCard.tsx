"use client";

import { WowInsight } from "@/types";
import { Sparkles, TrendingUp, Target } from "lucide-react";

interface Props {
  insight: WowInsight;
}

export default function WowInsightCard({ insight }: Props) {
  return (
    <div className="card overflow-hidden bg-gradient-to-br from-brand-50 via-indigo-50 to-purple-50 border-2 border-brand-200 p-6 sm:p-8">
      {/* Sparkle decoration */}
      <div className="absolute top-4 right-4 opacity-10">
        <Sparkles className="w-20 h-20 text-brand-600" />
      </div>

      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-brand-600" />
          <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">
            🎯 Key Insight
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          {insight.title}
        </h2>

        <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
          {insight.description}
        </p>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
            {insight.metric}
          </span>
          <TrendingUp className="w-6 h-6 text-green-500 mt-1" />
        </div>

        <p className="text-sm text-gray-600 mt-6 pt-6 border-t border-brand-200">
          💡 <strong>Pro tip:</strong> This projection is based on your current trajectory and following the recommended 90-day action plan. Actual results may vary based on execution and market conditions.
        </p>
      </div>
    </div>
  );
}
