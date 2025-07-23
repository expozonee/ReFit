import { NextResponse } from "next/server";
import { analyzeResume } from "@/lib/analyzeResume";

export async function POST(request: Request) {
  try {
    // To fix this, parse the incoming multipart/form-data using `request.formData()` instead of `request.json()`
    const formData = await request.formData();
    const resume = formData.get("resume") as string;
    const data = formData.get("data") as string;

    if (!data || !resume) {
      return NextResponse.json(
        { error: "data and resume are required" },
        { status: 400 }
      );
    }

    await analyzeResume(resume, data);

    // if (!res) {
    //   return NextResponse.json(
    //     { error: "Could not analyze " },
    //     { status: 500 }
    //   );
    // }
    return NextResponse.json({ res: "ok" });
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
