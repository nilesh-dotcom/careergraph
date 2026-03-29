"use client";

import { MarketInsight } from "@/types";
import { Zap, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Props {
  insights: MarketInsight[];
}

const trendConfig = {
  Rising: {
    icon: TrendingUp,
    color: "text-green-600",
    badge: "text-green-700 bg-green-50",
    bar: "bg-green-400",
  },
  Stable: {
    icon: Minus,
    color: "text-blue-500",
    badge: "text-blue-700 bg-blue-50",
    bar: "bg-blue-400",
  },
  Declining: {
    icon: TrendingDown,
    color: "text-red-500",
    badge: "text-red-700 bg-red-50",
    bar: "bg-red-400",
  },
};

export default function MarketInsightsCard({ insights }: Props) {
  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center">
          <Zap className="w-5 h-5 text-brand-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Market Insights</h2>
          <p className="text-sm text-gray-400">Live signals from the Indian tech job market</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {insights.map((insight, i) => {
          const config = trendConfig[insight.trend];
          const TrendIcon = config.icon;

          return (
            <div
              key={i}
              className="p-4 border border-gray-100 rounded-xl hover:border-brand-100 hover:bg-brand-50/20 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                  {insight.title}
                </h3>
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${config.badge}`}>
                  <TrendIcon className="w-3 h-3" />
                  {insight.trend}
                </span>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                {insight.description}
              </p>

              <div className="p-2.5 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-600">
                  📊 {insight.dataPoint}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
