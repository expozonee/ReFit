import { NextResponse } from "next/server";
// import { researchCompany } from "@/lib/agent";
import { agent } from "@/lib/agent";

export async function POST(request: Request) {
  try {
    const { companyName, jobUrl } = await request.json();
    if (!companyName || !jobUrl) {
      return NextResponse.json(
        { error: "companyName and jobUrl is required" },
        { status: 400 }
      );
    }
    const result = await agent.researchCompany(companyName, jobUrl);
    return NextResponse.json(result?.text);
  } catch (err) {
    return NextResponse.json(
      { error: "AI scraping failed", details: String(err) },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
