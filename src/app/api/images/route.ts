import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";

interface RequestBody {
    images: ImageData[];
}

export async function POST(req: NextRequest) {
    let body: RequestBody;
    try {
        body = await req.json();
    } catch (error) {
        return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    if (!body.images || !Array.isArray(body.images)) {
        return NextResponse.json({ error: "Missing or invalid 'images' array" }, { status: 400 });
    }

    try {
        for (const item of body.images) {
            if (!item.imageUrl || !item.albumId || !item.userId) {
                return NextResponse.json({ error: "Missing required fields (imageUrl, albumId, userId)" }, { status: 400 });
            }
            await db.image.create({
                data: {
                    imageUrl: item.imageUrl,
                    albumId: item.albumId,
                    userId: item.userId,
                },
            });
        }
        return NextResponse.json({
            message: "Images uploaded successfully",
            images: body.images,
        }, { status: 201 });
    } catch (error) {
        console.error("Error processing images:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
