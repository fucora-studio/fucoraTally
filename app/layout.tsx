import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tally: UNSW Pre Exam Marks Tracker",
  description: "Keep your pre exam marks neat with Tally by Fucora",
  keywords: ["Fucora", "UNSW", "Student Tools", "Pre Exams Mark Tracker", "Tally", "UNSW Course Outline"],
  openGraph: {
    url: 'https://tally.fucora.app',
    siteName: 'Tally: UNSW Pre Exam Marks Tracker',
    locale: 'en_AU',
    type: 'website',
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      
      <body className="bg-[#0f172a] text-[#f8fafc] min-h-screen">
        {children}
      </body>
    </html>
  );
}