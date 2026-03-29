"use client";

import { JobMatch } from "@/types";
import { BriefcaseBusiness, ExternalLink, MapPin, Calendar } from "lucide-react";

interface Props {
  jobMatches: JobMatch[];
  isLocked?: boolean;
}

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

function MatchScore({ score }: { score: number }) {
  const color =
    score >= 85 ? "text-green-700 bg-green-50 border-green-200" :
    score >= 70 ? "text-yellow-700 bg-yellow-50 border-yellow-200" :
    "text-gray-600 bg-gray-50 border-gray-200";

  return (
    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold ${color}`}>
      {score}% match
    </div>
  );
}

export default function JobMatchesCard({ jobMatches, isLocked = false }: Props) {
  const visibleJobs = isLocked ? jobMatches.slice(0, 3) : jobMatches;

  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center">
          <BriefcaseBusiness className="w-5 h-5 text-brand-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Curated Job Matches</h2>
          <p className="text-sm text-gray-400">
            {jobMatches.length} roles matched to your profile
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {visibleJobs.map((job, i) => (
          <div
            key={i}
            className="flex items-start justify-between gap-4 p-4 border border-gray-100 rounded-xl hover:border-brand-200 hover:bg-brand-50/20 transition-all duration-200 group"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {job.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{job.company}</p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {job.location}
                </span>
                {job.salary && (
                  <span className="font-medium text-gray-600">{job.salary}</span>
                )}
                {job.postedDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {timeAgo(job.postedDate)}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1">
                {job.matchReasons.map((reason, j) => (
                  <span
                    key={j}
                    className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full"
                  >
                    {reason}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 flex-shrink-0">
              <MatchScore score={job.matchScore} />
              {job.applyUrl && (
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:text-brand-800 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Apply <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}

        {/* Locked overlay for remaining jobs */}
        {isLocked && jobMatches.length > 3 && (
          <div className="relative">
            <div className="space-y-3 opacity-30 pointer-events-none select-none blur-sm">
              {jobMatches.slice(3, 6).map((job, i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-xl">
                  <p className="text-sm font-semibold text-gray-900">{job.title}</p>
                  <p className="text-sm text-gray-500">{job.company}</p>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6 py-4 bg-white/90 rounded-xl border border-gray-200 shadow-lg">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  +{jobMatches.length - 3} more matches
                </p>
                <p className="text-xs text-gray-500">Unlock full report to see all</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
