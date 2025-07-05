"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileUpload } from "../ui/file-upload";
import { fetchCompanyName, fetchCompanyInfoAI } from "@/util/routeFunctions";

const formSchema = z.object({
  jobUrl: z.string().url({ message: "Please enter a valid URL." }),
  resumeFile: z
    .any()
    .refine(
      (file) => file instanceof File || (file && file[0] instanceof File),
      {
        message: "Please upload a resume file.",
      }
    ),
});

export function ResumeForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobUrl: "",
      // resumeFile: undefined,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const { companyName } = await fetchCompanyName(values.jobUrl);
      console.log("Extracted company name:", companyName);
      const data = await fetchCompanyInfoAI(companyName, values.jobUrl);
      console.log("AI Company Info Result:", data);
    } catch (err) {
      console.error("Error in form submission:", err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border-2 p-8 rounded-xl bg-white"
      >
        <FormField
          control={form.control}
          name="jobUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.linkedin.com/jobs/view/3921000000"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please enter the URL of the job you want to build a resume for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resumeFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume</FormLabel>
              <FormControl>
                {/* <Input type="file" {...field} /> */}
                <FileUpload {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-blue-500 w-full" type="submit">
          Start Building!
        </Button>
      </form>
    </Form>
  );
}
