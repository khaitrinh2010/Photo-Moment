import {db} from "@/lib/db";
import {NextRequest} from "next/server";
import {getUser, getUserId} from "@/lib/auth";

export async function POST(req: NextRequest){
    const userId = await getUserId()
    if (!userId) {
        return new Response("Unauthorized", {status: 401});
    }
    const {name} = await req.json();
    const alreadyExists = await db.album.findFirst({
        where: {
            name,
            userId
        }
    })
    if (alreadyExists) {
        return new Response("Album already exists", {status: 409});
    }
    console.log("Creating new album for user", userId);
    const newAlbum = await db.album.create({
        data: {
            name,
            userId
        }
    })
    return Response.json({
        album: newAlbum
    });
}

export async function GET(){
    const userId = await getUserId()
    if (!userId) {
        return new Response("Unauthorized", {status: 401});
    }
    console.log("user id is", userId);
    const albums = await db.album.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return Response.json({
        albums
    });
}
