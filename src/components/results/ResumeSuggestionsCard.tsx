"use client";

import { ResumeSuggestion } from "@/types";
import { FileText, AlertCircle, Lightbulb, CheckCircle2 } from "lucide-react";

interface Props {
  suggestions: ResumeSuggestion[];
}

const impactConfig = {
  High: { color: "text-red-700 bg-red-50 border-red-200", icon: "🔴" },
  Medium: { color: "text-yellow-700 bg-yellow-50 border-yellow-200", icon: "🟡" },
  Low: { color: "text-gray-600 bg-gray-50 border-gray-200", icon: "⚪" },
};

export default function ResumeSuggestionsCard({ suggestions }: Props) {
  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center">
          <FileText className="w-5 h-5 text-brand-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Resume Improvements</h2>
          <p className="text-sm text-gray-400">Quick wins to boost your hiring chances</p>
        </div>
      </div>

      <div className="space-y-3">
        {suggestions.map((suggestion, i) => (
          <div
            key={i}
            className={`p-4 border rounded-lg transition-all ${suggestion.impact === "High" ? "border-red-200 bg-red-50/30" : suggestion.impact === "Medium" ? "border-yellow-200 bg-yellow-50/30" : "border-gray-200 bg-gray-50/30"}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${impactConfig[suggestion.impact].color}`}>
                  {suggestion.impact} Impact
                </span>
                <span className="text-sm font-semibold text-gray-800">{suggestion.category}</span>
              </div>
            </div>

            {/* Issue */}
            <div className="flex items-start gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                <strong>Issue:</strong> {suggestion.issue}
              </p>
            </div>

            {/* Suggestion */}
            <div className="flex items-start gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                <strong>Fix:</strong> {suggestion.suggestion}
              </p>
            </div>

            {/* Example */}
            <div className="flex items-start gap-2 pl-1 pt-2 border-t border-gray-200/50">
              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-gray-600">
                <strong className="block mb-1">Example:</strong>
                <code className="block bg-gray-100 p-2 rounded border border-gray-200 text-gray-800 whitespace-pre-wrap font-mono leading-relaxed">
                  {suggestion.example}
                </code>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>💡 Pro tip:</strong> Implement these changes, then save a PDF version of your resume. Many ATS systems parse PDFs better than DOC files.
        </p>
      </div>
    </div>
  );
}
