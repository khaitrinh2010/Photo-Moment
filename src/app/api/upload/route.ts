import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import { randomUUID } from "crypto";
import path from "path";
import os from "os";
import fs from "fs/promises";

export const config = {
    api: {
        bodyParser: false,
    },
};

// Initialize GCS
const storage = new Storage({
    keyFilename: path.join(process.cwd(), "gcp-service-account.json"),
});
const bucket = storage.bucket("photo-moment"); // Replace with your bucket name

export async function POST(req: NextRequest) {
    try {
        console.log("Starting upload process at", new Date().toISOString());
        const formData = await req.formData();
        console.log("Form data received:", {
            albumId: formData.get("albumId"),
            userId: formData.get("userId"),
            images: formData.getAll("images").map((img) => img.name),
        });

        const albumId = formData.get("albumId")?.toString();
        const userId = formData.get("userId")?.toString();
        const images = formData.getAll("images") as File[];

        if (!albumId || !userId) {
            return NextResponse.json({ error: "Missing albumId or userId" }, { status: 400 });
        }
        if (!images.length || images.some((img) => !(img instanceof File))) {
            return NextResponse.json({ error: "No valid images provided" }, { status: 400 });
        }

        const uploadedUrls: string[] = [];

        for (const image of images) {
            const tempFilePath = path.join(os.tmpdir(), `${randomUUID()}_${image.name}`);
            console.log(`Processing file: ${image.name}, temp path: ${tempFilePath}`);

            const buffer = Buffer.from(await image.arrayBuffer());
            await fs.writeFile(tempFilePath, buffer);

            const destPath = `uploads/${userId}/${albumId}/${Date.now()}_${image.name}`;
            console.log(`Uploading to GCS: ${destPath}`);
            const [file] = await bucket.upload(tempFilePath, {
                destination: destPath,
                metadata: { cacheControl: "public, max-age=31536000" }, // No public: true or makePublic()
            });

            await fs.unlink(tempFilePath).catch((err) => console.error("Failed to delete temp file:", err));

            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
            uploadedUrls.push(publicUrl);
        }

        console.log("Upload successful:", uploadedUrls);
        return NextResponse.json({ urls: uploadedUrls }, { status: 200 });
    } catch (error) {
        console.error("Upload failed at", new Date().toISOString(), ":", error);
        return NextResponse.json({ error: "Upload failed", details: (error as Error).message }, { status: 500 });
    }
}
