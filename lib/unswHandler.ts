import { NextResponse } from "next/server";

interface Assessment {
    name: string,
    weight: number
}

export async function GET(request: Request) {
    const searchParams = new URLSearchParams(new URL(request.url).searchParams);
    let course = searchParams.get('course');
    const term = searchParams.get('term');

    //check the data if the params is available
    if (!course || !term) {
        return NextResponse.json({ error: "Missing Parameter" }, { status: 401 });
    }

    course = course.toUpperCase();
    const year: number = new Date().getFullYear();
    const fetchResponse = await fetch(`https://courseoutlines.unsw.edu.au/v1/publicsitecourseoutlines/detail?year=${year}&term=Term+${term}&deliveryMode=In+Person&deliveryFormat=Standard&teachingPeriod=T${term}&deliveryLocation=Kensington&courseCode=${course}&activityGroupId=1`);
    const data: any = await fetchResponse.json();

    // check if the fetch is good or not
    if (!fetchResponse.ok || !data) {
        return NextResponse.json({ error: "failed to fetch data" }, { status: 500 });
    }

    const rawAssessment = data.integrat_CO_Assessment;

    const respArr: Assessment[] = rawAssessment.map((item: any) => ({
        name: item.integrat_title,
        weight: Math.round(parseFloat(item.integrat_weight.replace("%", "")) * 100),
    }));

    // return the data that have been compiled
    return NextResponse.json(respArr, { status: 200 });
}