import { NextResponse } from "next/server";

import { isPDF } from "@/util/isPDF";
import { readPDF } from "@/lib/readPDF";

// Ensure this API route runs in the Node.js runtime (pdf-parse relies on Node APIs)
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "No PDF file uploaded." },
        { status: 400 }
      );
    }

    // Read the file as a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Ensure the file is a PDF
    if (!isPDF(file as File)) {
      return NextResponse.json(
        { error: "Uploaded file is not a valid PDF." },
        { status: 400 }
      );
    }

    // Extract the text from the PDF buffer
    const extractedText = await readPDF(buffer);

    return NextResponse.json({ text: extractedText });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to read PDF." }, { status: 500 });
  }
}
