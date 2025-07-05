// import type { CompanyProfile } from "./agent";

// /**
//  * Scrapes the internet for company-specific resume info using Playwright.
//  * Searches Google, LinkedIn, and Glassdoor for company and job-specific info.
//  * @param companyName The name of the company to research.
//  * @param jobTitle (Optional) The specific job title to look for.
//  * @returns CompanyProfile with typical skills and description, plus job-specific info if found.
//  */
// export async function scrapeCompanyInfo(
//   companyName: string,
//   jobTitle?: string
// ): Promise<CompanyProfile & { jobSpecificInfo?: string }> {
//   let typicalSkills: string[] = [];
//   let companyDescription = "";
//   let jobSpecificInfo = "";
//   const allSnippets: string[] = [];

//   // Helper: Extract skills from text
//   function extractSkills(text: string): string[] {
//     const skillKeywords = [
//       "communication",
//       "teamwork",
//       "problem-solving",
//       "adaptability",
//       "leadership",
//       "creativity",
//       "work ethic",
//       "time management",
//       "attention to detail",
//       "collaboration",
//       "initiative",
//       "critical thinking",
//       "flexibility",
//       "organization",
//       "empathy",
//     ];
//     return skillKeywords.filter((skill) =>
//       new RegExp(`\\b${skill}\\b`, "i").test(text)
//     );
//   }

//   // Helper: Check if page is a bot/consent/login page
//   // async function isBlocked(page: import("playwright").Page) {
//   //   const content = await page.content();
//   //   return /consent|login|captcha|enable javascript|cloudflare|function\s*\(|window\.|<script|<style/i.test(
//   //     content
//   //   );
//   // }

//   try {
//     // --- Google Search ---
//     // try {
//     //   let query = `about ${companyName} company`;
//     //   if (jobTitle) {
//     //     query += ` ${jobTitle} resume skills`;
//     //   } else {
//     //     query += " resume skills";
//     //   }
//     //   const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
//     //     query
//     //   )}`;
//     //   await page.goto(searchUrl, { waitUntil: "domcontentloaded" });
//     //   if (await isBlocked(page)) {
//     //     allSnippets.push("[Google] Blocked by bot protection or consent page.");
//     //   } else {
//     //     try {
//     //       const agreeBtn = await page.$('button:has-text("I agree")');
//     //       if (agreeBtn) await agreeBtn.click();
//     //     } catch {}
//     //     // Use more targeted selectors for Google
//     //     const googleSnippets = await page.$$eval(
//     //       ".VwiC3b, .kno-rdesc span",
//     //       (els) =>
//     //         els
//     //           .map((e) => e.textContent?.replace(/\s+/g, " ").trim() || "")
//     //           .filter((t) => t && t.length > 30)
//     //     );
//     //     allSnippets.push(
//     //       ...googleSnippets.filter(
//     //         (t) =>
//     //           t &&
//     //           !/function\s*\(|window\.|<script|<style|consent|login|captcha|cloudflare|enable javascript/i.test(
//     //             t
//     //           )
//     //       )
//     //     );
//     //   }
//     // } catch {}

//     // --- LinkedIn Search ---
//     try {
//       let linkedinQuery = `${companyName}`;
//       if (jobTitle) linkedinQuery += ` ${jobTitle}`;
//       const linkedinUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(
//         linkedinQuery
//       )}`;
//       await page.goto(linkedinUrl, { waitUntil: "domcontentloaded" });
//       if (await isBlocked(page)) {
//         allSnippets.push("[LinkedIn] Blocked by bot protection or login page.");
//       } else {
//         const linkedinSnippets = await page.$$eval(
//           ".base-search-card__title, .base-search-card__subtitle, .job-search-card__snippet",
//           (els) =>
//             els
//               .map((e) => e.textContent?.replace(/\s+/g, " ").trim() || "")
//               .filter((t) => t && t.length > 10)
//         );
//         allSnippets.push(
//           ...linkedinSnippets.filter(
//             (t) =>
//               t &&
//               !/function\s*\(|window\.|<script|<style|consent|login|captcha|cloudflare|enable javascript/i.test(
//                 t
//               )
//           )
//         );
//       }
//     } catch {}

//     // --- Glassdoor Search ---
//     try {
//       let glassdoorQuery = `${companyName}`;
//       if (jobTitle) glassdoorQuery += ` ${jobTitle}`;
//       const glassdoorUrl = `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${encodeURIComponent(
//         glassdoorQuery
//       )}`;
//       await page.goto(glassdoorUrl, { waitUntil: "domcontentloaded" });
//       if (await isBlocked(page)) {
//         allSnippets.push(
//           "[Glassdoor] Blocked by bot protection or login page."
//         );
//       } else {
//         const glassdoorSnippets = await page.$$eval(
//           ".job-search-key-1rd3saf.eigr9kq1, .job-search-key-1xrturh.eigr9kq1",
//           (els) =>
//             els
//               .map((e) => e.textContent?.replace(/\s+/g, " ").trim() || "")
//               .filter((t) => t && t.length > 10)
//         );
//         allSnippets.push(
//           ...glassdoorSnippets.filter(
//             (t) =>
//               t &&
//               !/function\s*\(|window\.|<script|<style|consent|login|captcha|cloudflare|enable javascript/i.test(
//                 t
//               )
//           )
//         );
//       }
//     } catch {}

//     // --- Aggregate and extract info ---
//     const allText = allSnippets.join(" ");
//     typicalSkills = extractSkills(allText);
//     if (allSnippets.length > 0) {
//       companyDescription = allSnippets[0];
//     }
//     if (jobTitle) {
//       const jobRegex = new RegExp(jobTitle, "i");
//       const jobSnippet = allSnippets.find((s) => jobRegex.test(s));
//       if (jobSnippet) jobSpecificInfo = jobSnippet;
//     }
//   } catch {
//     companyDescription = "Could not fetch company info due to an error.";
//   } finally {
//     await browser.close();
//   }

//   return {
//     name: companyName,
//     typicalSkills,
//     companyDescription,
//     jobSpecificInfo: jobSpecificInfo || undefined,
//   };
// }
