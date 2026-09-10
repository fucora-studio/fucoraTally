import { GetData } from "./zod";
import { Assessment, ReturnData, UNSWData } from "./interface";


export async function fetchData(form: GetData): Promise<ReturnData> {
    try {
        const year = new Date().getFullYear();
        const { courseCode, location, term } = form;

        const response = await fetch(
            `https://courseoutlines.unsw.edu.au/v1/publicsitecourseoutlines/detail?year=${year}&term=Term+${term}&deliveryMode=In+Person&deliveryFormat=Standard&teachingPeriod=T${term}&deliveryLocation=${location}&courseCode=${courseCode}&activityGroupId=1`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        let data: UNSWData = await response.json();
        data = JSON.parse(JSON.stringify(data));

        if (!data.integrat_CO_Assessment) {
            throw new Error("No assessment data found for the given course.");
        }

        const res: ReturnData = {
            code: data.integrat_coursecode,
            courseName: data.integrat_coursename,
            assessment: []
        };

        const assessments: Assessment[] =
            data.integrat_CO_Assessment.map((item): Assessment => ({
                name: item.integrat_title,
                weight: parseFloat(
                    item.integrat_weight.replace("%", "")
                ),
            }));
        
        res.assessment = assessments;

        return res;
    } catch (error) {
        console.error("Failed to fetch course data:", error);

        throw new Error("Failed to fetch course data");
    }
}
