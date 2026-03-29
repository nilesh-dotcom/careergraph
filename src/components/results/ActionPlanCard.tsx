"use client";

import { ActionItem } from "@/types";
import { FileText, CheckCircle2 } from "lucide-react";

interface Props {
  actionPlan: ActionItem[];
}

const categoryConfig: Record<string, { color: string; emoji: string }> = {
  Skill: { color: "text-blue-700 bg-blue-50", emoji: "📚" },
  Certification: { color: "text-purple-700 bg-purple-50", emoji: "🎓" },
  Project: { color: "text-green-700 bg-green-50", emoji: "🛠️" },
  Network: { color: "text-orange-700 bg-orange-50", emoji: "🤝" },
  Application: { color: "text-brand-700 bg-brand-50", emoji: "🚀" },
};

const priorityConfig = {
  High: "border-l-brand-500",
  Medium: "border-l-gray-300",
};

export default function ActionPlanCard({ actionPlan }: Props) {
  // Group by week
  const grouped = actionPlan.reduce<Record<string, ActionItem[]>>((acc, item) => {
    if (!acc[item.week]) acc[item.week] = [];
    acc[item.week].push(item);
    return acc;
  }, {});

  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center">
          <FileText className="w-5 h-5 text-brand-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">90-Day Action Plan</h2>
          <p className="text-sm text-gray-400">Week-by-week milestones to reach your next role</p>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([week, items], wi) => (
          <div key={week}>
            {/* Week header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 bg-brand-700 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                {wi + 1}
              </div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                {week}
              </h3>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Actions */}
            <div className="space-y-3 ml-9">
              {items.map((item, i) => {
                const catConfig = categoryConfig[item.category] || categoryConfig.Skill;

                return (
                  <div
                    key={i}
                    className={`p-4 border border-gray-100 border-l-2 ${priorityConfig[item.priority]} rounded-xl`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{catConfig.emoji}</span>
                        <h4 className="text-sm font-semibold text-gray-900">
                          {item.action}
                        </h4>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${catConfig.color}`}>
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-brand-50/60 rounded-xl border border-brand-100">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-brand-700">
            <strong>Pro tip:</strong> High-priority items are marked with a blue left border. Focus on these first for maximum impact.
          </p>
        </div>
      </div>
    </div>
  );
}
