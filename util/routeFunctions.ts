// Utility functions to call backend API routes from the frontend

export async function fetchCompanyInfoAI(companyName: string, jobUrl: string) {
  const res = await fetch("/api/scrape-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ companyName, jobUrl }),
  });
  if (!res.ok) throw new Error("Failed to fetch AI company info");
  return res.json();
}

export async function fetchCompanyInfo(companyName: string, jobTitle?: string) {
  const res = await fetch("/api/scrape", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ companyName, jobTitle }),
  });
  if (!res.ok) throw new Error("Failed to fetch company info");
  return res.json();
}

export async function fetchCompanyName(jobUrl: string): Promise<string> {
  const res = await fetch("/api/get-company-name", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jobUrl }),
  });
  if (!res.ok) throw new Error("Failed to extract company name");
  return res.json();
}

export async function analyzeUserResume(resume: string, data: string) {
  const formData = new FormData();
  formData.append("resume", resume);
  formData.append("data", data);

  const res = await fetch("/api/analyze-resume", {
    method: "POST",
    body: formData,
  });
  // console.log(res);
  return res.json();
}

/**
 * Calls the /api/read-pdf route to extract text from a PDF file.
 * @param file PDF file (File or Blob)
 * @returns Promise<string> Extracted text
 */
export async function extractTextFromPDF(
  file: File | Blob
): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const r = await fetch("/api/read-PDF", {
      method: "POST",
      body: formData,
    });

    if (!r.ok) {
      console.error("Failed to extract text from PDF", r.status, r.statusText);
      return null;
    }

    const data = await r.json();

    return (data as { text?: string }).text ?? null;
  } catch (e) {
    console.log(e);
    return null;
  }
}
