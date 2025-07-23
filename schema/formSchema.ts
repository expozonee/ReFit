import z from "zod";
import { isPDF } from "@/util/isPDF";

export const formSchema = z.object({
  jobUrl: z.string().url({ message: "Please enter a valid URL." }),
  resumeFile: z.any().refine(
    (file) => {
      if (!file) return false;
      // Support both single file and array (react-hook-form may pass array)
      if (file instanceof File) return isPDF(file);
      if (Array.isArray(file) && file[0] instanceof File) return isPDF(file[0]);
      return false;
    },
    {
      message: "Please upload a PDF resume file.",
    }
  ),
});
