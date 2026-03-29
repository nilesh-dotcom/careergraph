"use client";

import { Lock, CheckCircle2, IndianRupee, Zap } from "lucide-react";

interface Props {
  onUnlock: () => void;
}

const UNLOCK_FEATURES = [
  "Full 90-Day Action Plan (all 12 weeks)",
  "All 8-12 curated job matches with apply links",
  "Complete skill gap analysis with resources",
  "Full market insights with data sources",
  "Downloadable PDF report",
];

export default function PaywallBanner({ onUnlock }: Props) {
  return (
    <div className="relative my-8 overflow-hidden rounded-2xl border-2 border-brand-200 bg-gradient-to-br from-brand-50 to-indigo-50">
      {/* Lock icon */}
      <div className="absolute top-4 right-4 w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
        <Lock className="w-5 h-5 text-brand-600" />
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-brand-600" />
          <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide">
            You're viewing a free preview
          </p>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Unlock your full career report
        </h3>
        <p className="text-gray-500 mb-6 text-sm leading-relaxed">
          You've seen your career positioning and top paths. Unlock the complete report to get everything you need to make your move.
        </p>

        <div className="grid sm:grid-cols-2 gap-2 mb-6">
          {UNLOCK_FEATURES.map((feat, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{feat}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onUnlock}
            className="btn-primary text-base py-3.5 px-8 w-full sm:w-auto"
          >
            <IndianRupee className="w-4 h-4 mr-1" />
            Unlock Full Report — ₹499
          </button>
          <p className="text-sm text-gray-400">One-time payment. Instant access.</p>
        </div>
      </div>
    </div>
  );
}
