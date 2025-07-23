import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getCompanyName(jobUrl: string): Promise<string | null> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set in environment variables");
  }

  // Updated system prompt for better accuracy on job boards
  const systemPrompt = `You are a helpful assistant. When given a job posting URL, your task is to visit the provided URL, analyze the job post, and extract the actual company name offering the job. If the URL is from a job board (like LinkedIn, Indeed, Glassdoor, etc.), do NOT return the job board's name. Instead, determine the real company that is hiring for the position by analyzing the job post content. Only return the company name, nothing else.`;

  const prompt = `Extract the company name from this job URL: ${jobUrl}. Only return the company name, nothing else.`;

  try {
    const response = await openai.responses.create({
      model: "gpt-4o",
      tools: [
        {
          type: "web_search_preview",
        },
      ],
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    });
    const companyName = response.output_text;

    return companyName || null;
  } catch (error) {
    console.error("Error extracting company name:", error);
    return null;
  }
}
