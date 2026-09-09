import * as cheerio from "cheerio";

const url = "https://www.unsw.edu.au/course-outlines/course-outline#year=2026&term=Term%202&deliveryMode=In%20Person&deliveryFormat=Standard&teachingPeriod=T2&deliveryLocation=Kensington&courseCode=COMP2511&activityGroupId=1";

async function fetchHTML(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch HTML from ${url}: ${response.statusText}`);
    }
    return await response.text();
}

export async function scrapeData(url: string) { 
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);
    $("dynamic-table").each((index, element) => {
        const text = $(element).text();
        console.log(`Div ${index}: ${text}`);
    });
    // Your scraping logic here
}