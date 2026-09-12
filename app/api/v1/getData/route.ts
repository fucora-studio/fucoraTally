import { fetchData } from "@/lib/unswHandler";
import { getData } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    const result = getData.safeParse(body);

    if (!result.success) {
        return NextResponse.json(
            { error: result.error.issues[0].message },
            { status: 400 }
        )
    }

    try {
        const response = await fetchData(result.data);
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