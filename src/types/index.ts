// ============================================
// CareerGraph.ai - Core Types
// ============================================

export interface UserInput {
  resume: File | null;
  targetRole?: string;
  currentSalary: string;
  desiredSalary: string;
  preferredCities: string[];
}

export interface ParsedProfile {
  name: string;
  email?: string;
  phone?: string;
  currentRole: string;
  currentCompany: string;
  totalExperience: number;
  skills: string[];
  topSkills: string[];
  education: Education[];
  experience: WorkExperience[];
  certifications: string[];
  summary: string;
}

export interface Education {
  degree: string;
  institution: string;
  year?: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  duration: string;
  highlights: string[];
}

// ---- Career Positioning ----
export interface CareerPositioning {
  currentLevel: string; // e.g., "Senior Engineer", "Lead"
  marketPositioning: string; // e.g., "Top 25% in Bangalore market"
  salaryBenchmark: {
    low: number;
    median: number;
    high: number;
    userCurrent: number;
    currency: string;
  };
  positioningInsight: string;
}

// ---- Career Paths ----
export interface CareerPath {
  role: string;
  fitReason: string;
  demandLevel: "High" | "Medium" | "Low";
  salaryRange: { min: number; max: number; currency: string };
  transitionDifficulty: "Easy" | "Moderate" | "Hard";
  timelineMonths: number;
  keyRequirements: string[];
  readinessScore: number; // 0-100, how ready you are for this path
}

// ---- Skill Gap ----
export interface SkillGap {
  skill: string;
  importance: "Critical" | "High" | "Medium";
  userLevel: "Missing" | "Beginner" | "Intermediate" | "Advanced";
  marketDemand: number; // percentage of job postings requiring this
  recommendation: string;
  effortLevel: "Quick Win" | "Medium Effort" | "Long-term Investment";
  impactLevel: "High" | "Medium" | "Low";
}

export interface SkillMatch {
  skill: string;
  strength: "Strong" | "Moderate";
  marketDemand: number;
}

// ---- Market Insights ----
export interface MarketInsight {
  title: string;
  description: string;
  dataPoint: string; // e.g., "73% of postings require this"
  trend: "Rising" | "Stable" | "Declining";
}

// ---- Action Plan ----
export interface ActionItem {
  week: string; // e.g., "Week 1-2"
  action: string;
  category: "Skill" | "Certification" | "Project" | "Network" | "Application";
  priority: "High" | "Medium";
  details: string;
  weeklyCommitment: string; // e.g., "5-7 hours"
  expectedOutcome: string; // e.g., "Complete first 2 courses"
}

// ---- Job Matches ----
export interface JobMatch {
  title: string;
  company: string;
  location: string;
  salary?: string;
  whyYouMatch: string; // Detailed explanation of match
  whyYouMightGetRejected?: string; // Potential gaps
  matchScore: number; // 0-100
  matchReasons: string[];
  applyUrl?: string;
  postedDate?: string;
}

// ---- Wow Insight ----
export interface WowInsight {
  title: string;
  description: string;
  metric: string; // e.g., "₹15 Lakhs" or "12 months"
}

// ---- Resume Suggestions ----
export interface ResumeSuggestion {
  category: string; // e.g., "Skills Section", "Experience Highlights", "Summary"
  issue: string; // What the issue is
  suggestion: string; // Specific improvement recommendation
  impact: "High" | "Medium" | "Low"; // Impact on hiring likelihood
  example: string; // Example of how to implement
}

export interface CareerReport {
  profile: ParsedProfile;
  positioning: CareerPositioning;
  careerPaths: CareerPath[];
  skillGaps: SkillGap[];
  skillMatches: SkillMatch[];
  marketInsights: MarketInsight[];
  actionPlan: ActionItem[];
  jobMatches: JobMatch[];
  wowInsight: WowInsight;
  resumeSuggestions: ResumeSuggestion[];
  generatedAt: string;
}

// ---- API Types ----
export interface AnalyzeRequest {
  resumeText: string;
  targetRole?: string;
  currentSalary: string;
  desiredSalary: string;
  preferredCities: string[];
}

export interface AnalyzeResponse {
  success: boolean;
  report?: CareerReport;
  error?: string;
}
