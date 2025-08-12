import { db } from "@/lib/db";
import AlbumIdPage from "./AlbumIdPage";
import { currentUser } from "@clerk/nextjs/server";

type PageProps = {
    params: Promise<{
        albumId: string;
    }>;
};

export default async function AlbumPage({ params }: PageProps) {
    const { albumId } = await params;

    const album = await db.album.findUnique({
        where: { id: albumId },
        include: {
            images: true,
        },
    });

    if (!album) {
        return <div className="p-6">Album not found.</div>;
    }

    return <AlbumIdPage album={album} />;
}
