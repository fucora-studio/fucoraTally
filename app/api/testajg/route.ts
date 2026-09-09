import * as cheerio from "cheerio";
import { UNSWData } from "@/lib/interface";  
import { getData } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    // const body = await request.json();

    // const result = getData.safeParse(body);

    // if (!result.success) {
    //     return NextResponse.json(
    //         { error: result.error.issues[0].message },
    //         { status: 400 }
    //     )
    // }

    try {
        const response = await scrapeData();
        return NextResponse.json(
            response,
            { status: 200 }
        );

    } catch (error) {
        console.error("Failed to fetch UNSW data:", error);
        return NextResponse.json(
            { error: "Failed to fetch UNSW data" },
            { status: 500 }
        );
    }

}


async function fetchHTML(): Promise<string> {
    const url = "https://www.unsw.edu.au/course-outlines/course-outline#year=2026&term=Term%202&deliveryMode=In%20Person&deliveryFormat=Standard&teachingPeriod=T2&deliveryLocation=Kensington&courseCode=COMP2511&activityGroupId=1";
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch HTML from ${url}: ${response.statusText}`);
    }
    return await response.text();
}

export async function scrapeData() { 
    const html = await fetchHTML();
    const $ = cheerio.load(html);
    console.log("Scraping data");
    $(".cmp-text-table--cols-3").each((index, element) => {
        console.log("Scraping data from UNSW course outline...");
        const text = $(element).text();
        console.log(`Div ${index}: ${text}`);
    });

}




// export async function scrapeData() { 
//     const html = await fetchHTML();
//     const $ = cheerio.load(html);
    
//     console.log("Scraping data...");
    
//     // 1. Log the page title to verify fetchHTML() received a valid page
//     console.log("Page Title:", $("title").text());

//     // 2. Search for the actual <dynamic-table> tag or generic divs
//     const dynamicTables = $(".dynamic-table>tr");
//     console.log(`Found <dynamic-table> tags count: ${dynamicTables.length}`);

//     dynamicTables.each((index, element) => {
//         console.log(`Table ${index} HTML snippet:`, $(element).html());
//     });

//     // 3. Fallback: Log top-level elements to see what HTML structure arrived
//     if (dynamicTables.length === 0) {
//         console.log("No <dynamic-table> found. Available top-level elements in raw body:");
//         $("body *").slice(0, 10).each((i, el) => {
//             console.log(`- <${el.tagName}>`);
//         });
//     }

//     return { success: true };
// }

