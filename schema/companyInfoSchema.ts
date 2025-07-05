import { z } from "zod";

export const companyInfoSchema = z.object({
  jobTitle: z.string(),
  companyInfo: z.string(),
  typicalSkills: z.array(z.string()),
  keyResponsibilities: z.array(z.string()),
  basicQualifications: z.array(z.string()),
  preferredQualifications: z.array(z.string()),
});
