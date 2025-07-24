import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";


export async function GET(req: NextRequest) {
    //get all images for a album
    const albumId = req.url.split("/").pop(); // Extract albumId from the URL
    if (!albumId) {
        return NextResponse.json({ error: "Missing albumId" }, { status: 400 });
    }
    try {
        const images = await db.image.findMany({
            where: { albumId },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ images }, { status: 200 });
    } catch (error) {
        console.error("Error fetching images:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
