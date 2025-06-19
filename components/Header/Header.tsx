import Link from "next/link";
import { caprasimo } from "@/fonts/Caprasimo";

export default function Header() {
  return (
    <header className="flex w-full min-h-24 py-4 px-6">
      <div className="flex items-center justify-between w-full max-w-[1500px] mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <span
            className={`text-5xl font-semibold text-blue-600 ${caprasimo.className}`}
          >
            ReFit
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-gray-600 font-semibold">
            Login
          </Link>
          <Link
            href="/signup"
            className="font-semibold bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
