"use client";

import { ParsedProfile } from "@/types";
import { User, Briefcase, GraduationCap, Award } from "lucide-react";

interface Props {
  profile: ParsedProfile;
}

export default function ProfileHeader({ profile }: Props) {
  return (
    <div className="card p-6 sm:p-8 bg-gradient-to-r from-brand-700 to-indigo-700 text-white">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
          <User className="w-7 h-7 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-white">{profile.name}</h1>
          <p className="text-brand-200 text-sm mt-0.5">
            {profile.currentRole} @ {profile.currentCompany}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
            <span className="flex items-center gap-1.5 text-brand-100">
              <Briefcase className="w-4 h-4" />
              {profile.totalExperience} years experience
            </span>
            {profile.education[0] && (
              <span className="flex items-center gap-1.5 text-brand-100">
                <GraduationCap className="w-4 h-4" />
                {profile.education[0].degree}
              </span>
            )}
            {profile.certifications.length > 0 && (
              <span className="flex items-center gap-1.5 text-brand-100">
                <Award className="w-4 h-4" />
                {profile.certifications.length} cert{profile.certifications.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Top Skills */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {profile.topSkills.slice(0, 6).map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-white/15 text-white text-xs rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
            {profile.skills.length > 6 && (
              <span className="px-2.5 py-1 bg-white/10 text-brand-200 text-xs rounded-full">
                +{profile.skills.length - 6} more
              </span>
            )}
          </div>
        </div>
      </div>

      {profile.summary && (
        <p className="mt-5 text-sm text-brand-100 leading-relaxed border-t border-white/10 pt-5">
          {profile.summary}
        </p>
      )}
    </div>
  );
}
