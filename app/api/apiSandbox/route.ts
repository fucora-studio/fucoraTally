import { NextResponse } from "next/server";
// import { getData } from "@/lib/zod";

interface ReturnData {
    name: string;
    assesment: Assessment[];
}

interface Assessment {
  name: string;
  weight: string;
}

interface RequestBody {
  courseCode?: string;
  term?: string;
  location?: string;
}

// app/api/getData/route.ts
export async function POST(request: Request) {
  const targetUrl =
    "https://courseoutlines.unsw.edu.au/v1/publicsitecourseoutlines/detail" +
    "?year=2026" +
    "&term=Term+2" +
    "&deliveryMode=In+Person" +
    "&deliveryFormat=Standard" +
    "&teachingPeriod=T2" +
    "&deliveryLocation=Kensington" +
    "&courseCode=COMP2511" +
    "&activityGroupId=1";

  const res = await fetch(targetUrl, {
    method: "GET",
    headers: {
      "Accept": "text/html",
    },
  });

  console.log("Status:", res.status);

  const text:any = await res.text();

  console.log("Body:", JSON.parse(text).integrat_CO_Assessment);

  return Response.json({
    data: JSON.parse(text).integrat_CO_Assessment,
  });
}