import { BackgroundGrid } from "@/components/ui/BackgroundWrapper";
import Link from "vinext/shims/link";

export default function Home() {
  return (
    <main className="h-screen w-full justify-center items-center mx-auto flex">
      <BackgroundGrid/>
      <div className="flex justify-start flex-col w-[65vw] min-[1280px]:w-[40vw] z-5 min-[1442px]:w-[30vw]">
        <h1 className="text-2xl min-[700px]:text-5xl">Tally: Your One Stop UNSW Pre-Exam Tracker</h1>
        <Link href="/tracker" className="rounded-4xl border-none bg-blue-600 mt-5 w-[35vw] text-center p-[0.5rem] min-[1442px]:text-xl min-[700px]:p-5 min-[700px]:w-[20vw] min-[1280px]:w-[10vw]">Get Started</Link>
      </div>
    </main>
  );
}
