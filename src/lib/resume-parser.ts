import OpenAI from "openai";
import { ParsedProfile } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function parseResume(resumeText: string): Promise<ParsedProfile> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.1,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are an expert resume parser for Indian tech professionals. Extract structured information from the resume text. Return a JSON object with these exact fields:

{
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "phone number",
  "currentRole": "Most recent job title",
  "currentCompany": "Most recent employer",
  "totalExperience": 8,  // number of years (estimate from work history)
  "skills": ["skill1", "skill2", ...],  // ALL skills mentioned
  "topSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],  // top 5 strongest skills based on experience depth
  "education": [
    { "degree": "B.Tech Computer Science", "institution": "IIT Delhi", "year": "2015" }
  ],
  "experience": [
    {
      "title": "Senior Software Engineer",
      "company": "Company Name",
      "duration": "Jan 2020 - Present",
      "highlights": ["Led team of 5", "Built microservices"]
    }
  ],
  "certifications": ["AWS Solutions Architect", ...],
  "summary": "2-3 sentence professional summary based on the resume"
}

Be thorough with skill extraction. Include programming languages, frameworks, tools, methodologies, cloud services, databases, and soft skills. For Indian tech resumes, pay attention to WITCH companies (Wipro, Infosys, TCS, Cognizant, HCL) and product companies.`,
      },
      {
        role: "user",
        content: `Parse this resume:\n\n${resumeText}`,
      },
    ],
  });

  const parsed = JSON.parse(response.choices[0].message.content || "{}");
  return parsed as ParsedProfile;
}
