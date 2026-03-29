import { NextRequest, NextResponse } from "next/server";
import { parseResume } from "@/lib/resume-parser";
import { fetchJobs, matchJobsToProfile, extractMarketSkills } from "@/lib/job-search";
import { generateCareerInsights } from "@/lib/insight-engine";
import { extractTextFromPDF, extractTextFromDOCX } from "@/lib/pdf-extract";
import { getMockReport } from "@/lib/mock-data";
import { saveCareerReport } from "@/lib/supabase/database";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { CareerReport } from "@/types";
import { cookies } from "next/headers";

export const maxDuration = 60; // Allow up to 60 seconds for analysis

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      resumeBase64,
      resumeFileName,
      targetRole,
      currentSalary,
      desiredSalary,
      preferredCities,
    } = body;

    if (!resumeBase64 || !resumeFileName) {
      return NextResponse.json(
        { success: false, error: "Resume file is required" },
        { status: 400 }
      );
    }

    // ── Check if API keys are configured ──────────────────────────────
    const hasOpenAI = process.env.OPENAI_API_KEY &&
      !process.env.OPENAI_API_KEY.startsWith("sk-your");
    const hasRapidAPI = process.env.RAPIDAPI_KEY &&
      process.env.RAPIDAPI_KEY !== "your-rapidapi-key";

    // ── MOCK MODE: Return realistic mock data when keys are not set ───
    if (!hasOpenAI) {
      console.log("[CareerGraph] Running in MOCK MODE — set OPENAI_API_KEY to enable real analysis");
      const mockReport = getMockReport(
        "Your Profile",
        "Software Engineer",
        7,
        currentSalary,
        desiredSalary,
        preferredCities
      );
      return NextResponse.json({ success: true, report: mockReport, mock: true });
    }

    // ── STEP 1: Extract text from resume ─────────────────────────────
    const fileBuffer = Buffer.from(resumeBase64, "base64");
    const isDocx = resumeFileName.endsWith(".docx");
    const isPdf = resumeFileName.endsWith(".pdf");

    let resumeText = "";
    if (isPdf) {
      resumeText = await extractTextFromPDF(fileBuffer);
    } else if (isDocx) {
      resumeText = await extractTextFromDOCX(fileBuffer);
    } else {
      return NextResponse.json(
        { success: false, error: "Unsupported file type. Please upload PDF or DOCX." },
        { status: 400 }
      );
    }

    if (!resumeText || resumeText.trim().length < 100) {
      return NextResponse.json(
        { success: false, error: "Could not extract text from resume. Please ensure the file is not scanned/image-based." },
        { status: 400 }
      );
    }

    // ── STEP 2: Parse resume with OpenAI ─────────────────────────────
    const profile = await parseResume(resumeText);

    // ── STEP 3: Fetch real job data (or skip if no API key) ──────────
    let jobMatches = [];
    let marketSkillsRecord: Record<string, number> = {};
    let totalJobs = 0;

    const searchQuery = targetRole || profile.currentRole;

    if (hasRapidAPI) {
      try {
        const jobs = await fetchJobs(searchQuery, preferredCities, 2);
        totalJobs = jobs.length;

        // Extract market skill frequencies
        const marketSkillsMap = extractMarketSkills(jobs);
        marketSkillsMap.forEach((count, skill) => {
          marketSkillsRecord[skill] = count;
        });

        // Match jobs to profile
        jobMatches = matchJobsToProfile(jobs, profile.skills, targetRole);
      } catch (jobErr) {
        console.error("[CareerGraph] Job fetch failed, using mock jobs:", jobErr);
        // Fall back to mock jobs from getMockReport
        const mockReport = getMockReport(
          profile.name,
          profile.currentRole,
          profile.totalExperience,
          currentSalary,
          desiredSalary,
          preferredCities
        );
        jobMatches = mockReport.jobMatches;
        totalJobs = 50; // Estimate for insight generation
      }
    } else {
      // Use mock job data as market signal
      const mockReport = getMockReport(
        profile.name,
        profile.currentRole,
        profile.totalExperience,
        currentSalary,
        desiredSalary,
        preferredCities
      );
      jobMatches = mockReport.jobMatches;
      marketSkillsRecord = {
        java: 38, python: 32, aws: 41, react: 34, "spring boot": 29,
        kubernetes: 28, docker: 36, typescript: 27, "node.js": 25,
        microservices: 31, "system design": 33, mongodb: 21, postgresql: 24,
        kafka: 18, "machine learning": 22, "ci/cd": 26
      };
      totalJobs = 50;
    }

    // ── STEP 4: Generate AI career insights ──────────────────────────
    const insights = await generateCareerInsights({
      profile,
      currentSalary,
      desiredSalary,
      preferredCities,
      targetRole,
      marketSkills: marketSkillsRecord,
      totalJobs,
    });

    // ── STEP 5: Assemble the full report ─────────────────────────────
    const report: CareerReport = {
      profile,
      positioning: insights.positioning,
      careerPaths: insights.careerPaths,
      skillGaps: insights.skillGaps,
      skillMatches: insights.skillMatches,
      marketInsights: insights.marketInsights,
      actionPlan: insights.actionPlan,
      jobMatches,
      generatedAt: new Date().toISOString(),
    };

    // ── STEP 6: Save report to database if user is authenticated ──────
    let reportId: string | null = null;
    try {
      const cookieStore = await cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) =>
                  cookieStore.set(name, value, options as CookieOptions)
                );
              } catch {
                // Ignore cookie set errors
              }
            },
          },
        }
      );
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        reportId = await saveCareerReport(user.id, report);
      }
    } catch (dbErr) {
      console.error("[CareerGraph] Database save failed:", dbErr);
      // Continue without saving to database
    }

    return NextResponse.json({ success: true, report, reportId });
  } catch (error: any) {
    console.error("[CareerGraph] Analysis error:", error);

    // Surface a helpful error message
    let message = "Analysis failed. Please try again.";
    if (error.code === "insufficient_quota") {
      message = "OpenAI quota exceeded. Please check your API key billing.";
    } else if (error.code === "invalid_api_key") {
      message = "Invalid OpenAI API key. Please check your .env.local file.";
    } else if (error.message) {
      message = error.message;
    }

    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
