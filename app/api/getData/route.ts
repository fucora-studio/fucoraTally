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

    console.log(body);

    return NextResponse.json({
        success: true,
        received: body,
    });
}