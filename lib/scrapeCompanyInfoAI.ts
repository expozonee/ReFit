import { OpenAI } from "openai";
import type { CompanyProfile } from "./agent";
import { SYSTEM_PROMPT } from "@/prompts/systemPrompt";
import { companyInfoSchema } from "@/schema/companyInfoSchema";
import { zodTextFormat } from "openai/helpers/zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Uses OpenAI to generate company-specific resume info.
 * @param companyName The name of the company to research.
 * @param jobUrl The specific job title to look for.
 * @returns CompanyProfile with typical skills and description, plus job-specific info if found.
 */
export async function scrapeCompanyInfoAI(
  companyName: string,
  jobUrl?: string
): Promise<CompanyProfile & { jobSpecificInfo?: string }> {
  const prompt = `Give me a brief description of ${companyName}. What are the typical skills required for someone working there
    and this is the job URL:${jobUrl} use the job URL to extract keyResponsibilities, basicQualifications, preferredQualifications for that job specific info`;

  const response = await openai.responses.parse({
    model: "gpt-4o",
    tools: [
      {
        type: "web_search_preview",
      },
    ],
    input: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      { role: "user", content: prompt },
    ],
    text: {
      format: zodTextFormat(companyInfoSchema, "companyInfo"),
    },
  });
  console.log("============================== parsed");
  console.log(response.output_parsed);
  console.log("============================== parsed");
  const result = response.output_parsed;

  if (!result) {
    throw new Error("No result from OpenAI");
  }

  const {
    companyInfo,
    jobTitle,
    typicalSkills,
    keyResponsibilities,
    basicQualifications,
    preferredQualifications,
  } = result;

  return {
    name: companyName,
    jobTitle,
    typicalSkills,
    keyResponsibilities,
    basicQualifications,
    preferredQualifications,
    companyDescription: companyInfo,
  };
}

// const response = await openai.chat.completions.create({
//   model: "gpt-4o",
//   messages: [
//     {
//       role: "system",
//       content: SYSTEM_PROMPT,
//     },
//     { role: "user", content: prompt },
//   ],
//   max_tokens: 500,
// });

// const text = response.choices[0].message.content || "";

// // Extract Typical Skills
// const skillsMatch = text.match(
//   /\*\*Typical Skills:\*\*\s*([\s\S]*?)(?=\n\*\*)/i
// );
// const typicalSkills = skillsMatch
//   ? skillsMatch[1]
//       .replace(/\n/g, " ")
//       .split(",")
//       .map((s) => s.trim())
//       .filter(Boolean)
//   : [];

// // Extract Key Responsibilities
// const keyRespMatch = text.match(
//   /\*\*Key Responsibilities:\*\*\s*([\s\S]*?)(?=\n\*\*)/i
// );
// const keyResponsibilities = keyRespMatch
//   ? keyRespMatch[1]
//       .replace(/\n/g, " ")
//       .split(",")
//       .map((s) => s.trim())
//       .filter(Boolean)
//   : [];

// console.log("==============================");
// console.log(text);
// console.log("==============================");

// // Extract Basic Qualifications
// const basicQualMatch = text.match(
//   /\*\*Basic Qualifications:\*\*\s*([\s\S]*?)(?=\n\*\*)/i
// );
// const basicQualifications = basicQualMatch
//   ? basicQualMatch[1]
//       .replace(/\n/g, " ")
//       .split(",")
//       .map((s) => s.trim())
//       .filter(Boolean)
//   : [];

// // Extract Preferred Qualifications
// const prefQualMatch = text.match(
//   /\*\*Preferred Qualifications:\*\*\s*([\s\S]*?)(?=\n\*\*|$)/i
// );
// const preferredQualifications = prefQualMatch
//   ? prefQualMatch[1]
//       .replace(/\n/g, " ")
//       .split(",")
//       .map((s) => s.trim())
//       .filter(Boolean)
//   : [];

// // Extract Job-Specific Info
// let jobSpecificInfo = undefined;
// const jobInfoMatch = text.match(
//   /[*_]*Job-Specific Info[*_]*[:\-]?\s*([\s\S]+)/i
// );
// if (jobInfoMatch) {
//   jobSpecificInfo = jobInfoMatch[1].trim();
// }
//   console.log(jobInfoMatch);
