import { NextResponse } from "vinext/shims/server";
import { GetData } from "./zod";
import { Assessment, UNSWData } from "./interface";


export async function fetchData(form: GetData) {
    try {
        const year = new Date().getFullYear();
        const { courseCode, location, term } = form;

        const response = await fetch(
            `https://courseoutlines.unsw.edu.au/v1/publicsitecourseoutlines/detail?year=${year}&term=Term+${term}&deliveryMode=In+Person&deliveryFormat=Standard&teachingPeriod=T${term}&deliveryLocation=${location}&courseCode=${courseCode}&activityGroupId=1`
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch course data" },
                { status: response.status }
            );
        }

        const data: UNSWData = await response.json();

        if (!data.integrat_CO_Assessment) {
            return NextResponse.json(
                { error: "Assessment data not found" },
                { status: 404 }
            );
        }

        const assessments: Assessment[] =
            data.integrat_CO_Assessment.map((item): Assessment => ({
                name: item.integrat_title,
                weight: parseFloat(
                    item.integrat_weight.replace("%", "")
                ),
            }));

        return NextResponse.json(assessments, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch course data:", error);

        return NextResponse.json(
            { error: "Failed to fetch course data" },
            { status: 500 }
        );
    }
}
