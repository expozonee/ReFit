import { NextResponse } from "next/server";
import { getCompanyName } from "@/util/getCompanyName";

export async function POST(request: Request) {
  try {
    const { jobUrl } = await request.json();
    if (!jobUrl) {
      return NextResponse.json(
        { error: "jobUrl is required" },
        { status: 400 }
      );
    }
    const companyName = await getCompanyName(jobUrl);
    if (!companyName) {
      return NextResponse.json(
        { error: "Could not extract company name" },
        { status: 500 }
      );
    }
    return NextResponse.json({ companyName });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to extract company name", details: String(err) },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
