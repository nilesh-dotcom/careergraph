import OpenAI from "openai";
import {
  ParsedProfile,
  CareerPositioning,
  CareerPath,
  SkillGap,
  SkillMatch,
  MarketInsight,
  ActionItem,
} from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface InsightInput {
  profile: ParsedProfile;
  currentSalary: string;
  desiredSalary: string;
  preferredCities: string[];
  targetRole?: string;
  marketSkills: Record<string, number>; // skill -> count of job postings
  totalJobs: number;
}

export async function generateCareerInsights(input: InsightInput) {
  const {
    profile,
    currentSalary,
    desiredSalary,
    preferredCities,
    targetRole,
    marketSkills,
    totalJobs,
  } = input;

  // Format market skills for the prompt
  const topMarketSkills = Object.entries(marketSkills)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([skill, count]) => `${skill}: ${count}/${totalJobs} postings (${Math.round(count/totalJobs*100)}%)`)
    .join("\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are CareerGraph.ai's career strategy engine for Indian tech professionals. Generate specific, data-backed career insights. You MUST return valid JSON.

Context about the Indian tech market:
- LPA = Lakhs Per Annum (1 Lakh = 100,000 INR)
- Tier 1 cities: Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune
- Key industry segments: IT Services (TCS, Infosys, Wipro), Product (Google, Microsoft, Flipkart), Startups
- Current market trends: AI/ML demand surge, full-stack expected, cloud certifications valued

Return this exact JSON structure:

{
  "positioning": {
    "currentLevel": "Senior Software Engineer (IC3-IC4 equivalent)",
    "marketPositioning": "Description of where they stand in the market",
    "salaryBenchmark": {
      "low": 1500000,
      "median": 2200000,
      "high": 3500000,
      "userCurrent": 2000000,
      "currency": "INR"
    },
    "positioningInsight": "Specific insight about their position"
  },
  "careerPaths": [
    {
      "role": "Engineering Manager",
      "fitReason": "Why this path fits based on their specific background",
      "demandLevel": "High",
      "salaryRange": { "min": 3000000, "max": 5500000, "currency": "INR" },
      "transitionDifficulty": "Moderate",
      "timelineMonths": 6,
      "keyRequirements": ["People management", "System design"],
      "readinessScore": 72
    }
  ],
  "skillGaps": [
    {
      "skill": "System Design",
      "importance": "Critical",
      "userLevel": "Beginner",
      "marketDemand": 73,
      "recommendation": "Specific action to take",
      "effortLevel": "Long-term Investment",
      "impactLevel": "High"
    }
  ],
  "skillMatches": [
    {
      "skill": "React",
      "strength": "Strong",
      "marketDemand": 85
    }
  ],
  "marketInsights": [
    {
      "title": "AI/ML Skills Premium",
      "description": "Specific market trend insight",
      "dataPoint": "45% of senior roles now require ML experience",
      "trend": "Rising"
    }
  ],
  "actionPlan": [
    {
      "week": "Week 1-2",
      "action": "Specific action to take",
      "category": "Skill",
      "priority": "High",
      "details": "Detailed steps and resources",
      "weeklyCommitment": "5-7 hours",
      "expectedOutcome": "Complete first 2 courses"
    }
  ],
  "jobMatches": [
    {
      "title": "Senior Software Engineer",
      "company": "TCS",
      "location": "Bangalore",
      "salary": "₹18-22L",
      "matchScore": 85,
      "matchReasons": ["Django", "System Design"],
      "whyYouMatch": "You have 5+ years with Django and your system design skills align with their backend requirements",
      "whyYouMightGetRejected": "May need to showcase more cloud infrastructure experience (AWS/GCP)"
    }
  ],
  "wowInsight": {
    "title": "Expected Salary Jump",
    "description": "By following the Engineering Manager path and gaining leadership skills over 12 months, you could increase your salary by",
    "metric": "₹25-30 lakhs per annum"
  },
  "resumeSuggestions": [
    {
      "category": "Skills Section",
      "issue": "Missing high-demand skills from job descriptions",
      "suggestion": "Add System Design, Kubernetes, and AI/ML experience to your resume to match 70% of senior backend postings",
      "impact": "High",
      "example": "Instead of just listing 'AWS', highlight 'AWS Solutions Architect certified with 35% infrastructure cost optimization experience'"
    }
  ]
}

Important rules:
- Generate exactly 3 career paths
- Generate 5-8 skill gaps (prioritize Critical and High importance)
  - For each gap, set effortLevel: "Quick Win" (< 2 weeks), "Medium Effort" (1-3 months), or "Long-term Investment" (3+ months)
  - Set impactLevel: "High" (transforms career), "Medium" (strengthens position), or "Low" (nice to have)
- Generate 3-6 skill matches
- Generate 4-6 market insights
- Generate 10-14 action items covering 90 days (weeks 1-2, 3-4, 5-6, 7-8, 9-10, 11-12)
  - For each action, set weeklyCommitment (e.g., "5-7 hours", "10 hours/week")
  - For each action, set expectedOutcome (e.g., "Complete first 2 courses", "Build 1 project")
- Generate 8-12 job matches with:
  - whyYouMatch: Specific explanation of alignment to their profile
  - whyYouMightGetRejected: Potential skill or experience gaps
- Generate 1 wow insight tied to a specific career path
  - Title should be compelling (e.g., "Expected Salary Jump")
  - Metric should be specific and quantified
- Generate 3-5 resume suggestions:
  - Focus on: missing high-demand skills, weak quantification, poor targeting for desired role, missing certifications
  - impact: "High" for critical gap fixes, "Medium" for incremental improvements
  - Always provide concrete examples
- Salary values must be in annual INR (not LPA notation, use actual numbers)
- userCurrent salary should be estimated from their provided range
- All insights must reference the user's specific skills, experience, and the real market data provided
- DO NOT be generic. Reference specific skills, companies, and data points.`,
      },
      {
        role: "user",
        content: `Generate career insights for this professional:

PROFILE:
- Name: ${profile.name}
- Current Role: ${profile.currentRole} at ${profile.currentCompany}
- Experience: ${profile.totalExperience} years
- Skills: ${profile.skills.join(", ")}
- Top Skills: ${profile.topSkills.join(", ")}
- Education: ${profile.education.map(e => `${e.degree} from ${e.institution}`).join("; ")}
- Certifications: ${profile.certifications.join(", ") || "None listed"}

PREFERENCES:
- Current Salary: ${currentSalary}
- Desired Salary: ${desiredSalary}
- Target Role: ${targetRole || "Open to suggestions"}
- Preferred Cities: ${preferredCities.join(", ")}

REAL MARKET DATA (from ${totalJobs} current job postings in ${preferredCities.join(", ")}):
${topMarketSkills}

Generate specific, actionable, data-backed career insights.`,
      },
    ],
  });

  const insights = JSON.parse(response.choices[0].message.content || "{}");

  return {
    positioning: insights.positioning as CareerPositioning,
    careerPaths: insights.careerPaths as CareerPath[],
    skillGaps: insights.skillGaps as SkillGap[],
    skillMatches: insights.skillMatches as SkillMatch[],
    marketInsights: insights.marketInsights as MarketInsight[],
    actionPlan: insights.actionPlan as ActionItem[],
    jobMatches: insights.jobMatches as any[],
    wowInsight: insights.wowInsight as any,
    resumeSuggestions: insights.resumeSuggestions as any[],
  };
}
