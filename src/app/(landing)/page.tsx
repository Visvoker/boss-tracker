import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="w-[300px] h-[300px] bg-white rounded-2xl shadow-2xl flex justify-center items-center animate-fade-in ring-2 ring-gray-200">
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl font-bold text-gray-800">
            Welcome BossTracker!
          </p>
          <div className="mt-5">
            <Button asChild className="">
              <Link href="/sign-up">Get started</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
