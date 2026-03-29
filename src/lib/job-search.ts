import { JobMatch } from "@/types";

interface JSearchJob {
  job_id: string;
  job_title: string;
  employer_name: string;
  job_city: string;
  job_state: string;
  job_country: string;
  job_description: string;
  job_min_salary: number | null;
  job_max_salary: number | null;
  job_salary_currency: string | null;
  job_apply_link: string;
  job_posted_at_datetime_utc: string;
  job_required_skills: string[] | null;
}

interface JSearchResponse {
  status: string;
  data: JSearchJob[];
}

export async function fetchJobs(
  query: string,
  locations: string[],
  numPages: number = 1
): Promise<JSearchJob[]> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    throw new Error("RAPIDAPI_KEY is not configured");
  }

  const allJobs: JSearchJob[] = [];

  // Search for each location
  for (const location of locations.slice(0, 3)) {
    const searchQuery = `${query} in ${location}, India`;

    try {
      const response = await fetch(
        `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
          searchQuery
        )}&page=1&num_pages=${numPages}&country=in&date_posted=month`,
        {
          headers: {
            "x-rapidapi-host": "jsearch.p.rapidapi.com",
            "x-rapidapi-key": apiKey,
          },
        }
      );

      if (!response.ok) {
        console.error(`JSearch API error for ${location}: ${response.status}`);
        continue;
      }

      const data: JSearchResponse = await response.json();
      if (data.data) {
        allJobs.push(...data.data);
      }
    } catch (err) {
      console.error(`Failed to fetch jobs for ${location}:`, err);
    }
  }

  return allJobs;
}

export function matchJobsToProfile(
  jobs: JSearchJob[],
  userSkills: string[],
  targetRole?: string
): JobMatch[] {
  const normalizedUserSkills = userSkills.map((s) => s.toLowerCase().trim());

  const scored = jobs.map((job) => {
    let score = 50; // base score

    // Title match bonus
    const title = job.job_title.toLowerCase();
    if (targetRole && title.includes(targetRole.toLowerCase())) {
      score += 25;
    }

    // Skill match from description
    const desc = job.job_description?.toLowerCase() || "";
    let matchedSkills = 0;
    const matchReasons: string[] = [];

    for (const skill of normalizedUserSkills) {
      if (desc.includes(skill)) {
        matchedSkills++;
      }
    }

    const skillMatchPct = normalizedUserSkills.length > 0
      ? (matchedSkills / normalizedUserSkills.length) * 100
      : 0;

    score += Math.min(skillMatchPct * 0.25, 25);

    if (matchedSkills > 0) {
      matchReasons.push(
        `${matchedSkills} of your ${normalizedUserSkills.length} skills match`
      );
    }
    if (targetRole && title.includes(targetRole.toLowerCase())) {
      matchReasons.push("Matches your target role");
    }

    // Salary formatting
    let salary: string | undefined;
    if (job.job_min_salary && job.job_max_salary) {
      const currency = job.job_salary_currency || "INR";
      salary = `${currency} ${(job.job_min_salary / 100000).toFixed(1)}L - ${(
        job.job_max_salary / 100000
      ).toFixed(1)}L`;
    }

    return {
      title: job.job_title,
      company: job.employer_name,
      location: [job.job_city, job.job_state].filter(Boolean).join(", ") || "India",
      salary,
      matchScore: Math.min(Math.round(score), 98),
      matchReasons:
        matchReasons.length > 0 ? matchReasons : ["Relevant to your profile"],
      applyUrl: job.job_apply_link,
      postedDate: job.job_posted_at_datetime_utc,
    };
  });

  // Sort by score, return top 12
  return scored
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 12);
}

export function extractMarketSkills(jobs: JSearchJob[]): Map<string, number> {
  const skillCount = new Map<string, number>();
  const commonSkills = [
    "python", "java", "javascript", "typescript", "react", "angular", "vue",
    "node.js", "nodejs", "express", "django", "flask", "spring", "spring boot",
    "aws", "azure", "gcp", "google cloud", "docker", "kubernetes", "k8s",
    "terraform", "jenkins", "ci/cd", "git", "linux", "sql", "nosql",
    "mongodb", "postgresql", "mysql", "redis", "elasticsearch", "kafka",
    "rabbitmq", "graphql", "rest api", "microservices", "system design",
    "data structures", "algorithms", "machine learning", "ml", "ai",
    "deep learning", "nlp", "tensorflow", "pytorch", "pandas", "numpy",
    "spark", "hadoop", "airflow", "tableau", "power bi",
    "agile", "scrum", "jira", "confluence", "product management",
    "figma", "css", "html", "tailwind", "next.js", "nextjs",
    "go", "golang", "rust", "c++", "c#", ".net", "scala", "kotlin",
    "swift", "flutter", "react native", "ios", "android",
    "devops", "sre", "monitoring", "observability", "grafana", "prometheus",
    "security", "blockchain", "web3", "cloud computing",
  ];

  for (const job of jobs) {
    const desc = job.job_description?.toLowerCase() || "";
    for (const skill of commonSkills) {
      if (desc.includes(skill)) {
        skillCount.set(skill, (skillCount.get(skill) || 0) + 1);
      }
    }
  }

  return skillCount;
}
