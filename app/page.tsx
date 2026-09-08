import { BackgroundGrid } from "@/components/ui/BackgroundWrapper";
import Link from "vinext/shims/link";

export default function Home() {
  return (
    <main className="h-screen w-full justify-center items-center mx-auto flex">
      <BackgroundGrid/>
      <div className="flex justify-start flex-col w-[40vw] z-5">
        <h1 className="text-5xl">Tally: Your One Stop UNSW Pre-Exam Tracker</h1>
        <Link href="/tracker" className="rounded-4xl border-none bg-blue-600 mt-5 p-5 w-[10vw] text-center">Get Started</Link>
      </div>
    </main>
  );
}
