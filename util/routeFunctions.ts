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

export async function fetchCompanyName(jobUrl: string) {
  const res = await fetch("/api/get-company-name", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jobUrl }),
  });
  if (!res.ok) throw new Error("Failed to extract company name");
  return res.json();
}
