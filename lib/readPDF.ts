// NOTE: pdf-parse is imported dynamically below to avoid bundling issues
import type { Buffer } from "node:buffer";

// Dynamically import pdf-parse to avoid bundling issues when this code runs on the edge
const getPdfParse = async () => (await import("pdf-parse")).default;

/**
 * Reads the content of a PDF (provided as a Buffer or a file path) and returns the extracted text.
 * @param pdfBufferOrPath Buffer of the PDF file OR absolute/relative file path
 * @returns Extracted text content from the PDF
 */
export async function readPDF(
  pdfBufferOrPath: Buffer | string
): Promise<string> {
  try {
    let dataBuffer: Buffer;

    if (typeof pdfBufferOrPath === "string") {
      // Lazy-load fs only when we actually need to read from the filesystem.
      const fs = await import("fs/promises");
      dataBuffer = await fs.readFile(pdfBufferOrPath);
    } else {
      dataBuffer = pdfBufferOrPath;
    }

    const pdfParse = await getPdfParse();
    const data = await pdfParse(dataBuffer);

    return data.text;
  } catch (error) {
    // Re-throw with additional context so callers can differentiate failures.
    throw new Error(
      `[readPDF] Failed to extract text from PDF: ${(error as Error).message}`
    );
  }
}
