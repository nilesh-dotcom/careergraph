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
      "keyRequirements": ["People management", "System design"]
    }
  ],
  "skillGaps": [
    {
      "skill": "System Design",
      "importance": "Critical",
      "userLevel": "Beginner",
      "marketDemand": 73,
      "recommendation": "Specific action to take"
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
      "details": "Detailed steps and resources"
    }
  ]
}

Important rules:
- Generate exactly 3 career paths
- Generate 5-8 skill gaps (prioritize Critical and High importance)
- Generate 3-6 skill matches
- Generate 4-6 market insights
- Generate 10-14 action items covering 90 days (weeks 1-2, 3-4, 5-6, 7-8, 9-10, 11-12)
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
  };
}
