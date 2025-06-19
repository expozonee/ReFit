import React from "react";
import { ResumeForm } from "../ResumeForm/ResumeForm";
import { parkinsans } from "@/fonts/Parkinsans";
import { Cover } from "../ui/cover";

export default function CTA() {
  return (
    <>
      <div className="flex items-center justify-center h-[800px] bg-gray-100 rounded-md my-3">
        <div className="w-[40%] flex flex-col justify-center">
          <h3 className={`text-lg ${parkinsans.className} text-gray-500`}>
            RESUME FITTER
          </h3>
          <h1 className="text-4xl font-bold py-3">
            Build your dream career with
            <br />
            <Cover className="text-blue-500"> AI-powered resumes</Cover>
          </h1>
          <p className={`${parkinsans.className} w-[65%]`}>
            Instantly generate tailored resumes that match your dream job. Let
            AI help you stand out and land more interviews with ease.
          </p>
        </div>
        <div className="w-[40%] flex flex-col items-center justify-center">
          <ResumeForm />
        </div>
      </div>
    </>
  );
}
