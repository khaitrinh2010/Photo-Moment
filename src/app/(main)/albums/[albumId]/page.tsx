import {db} from "@/lib/db";
import AlbumIdPage from "./AlbumIdPage"; // <-- your client component
import { currentUser } from "@clerk/nextjs/server";

export default async function AlbumPage({ params }: { params: { albumId: string } }) {
    const album = await db.album.findUnique({
        where: { id: params.albumId },
        include: {
            images: true,
        },
    });

    if (!album) {
        return <div className="p-6">Album not found.</div>;
    }

    return (
        <AlbumIdPage
            album={album}
        />
    );
}
