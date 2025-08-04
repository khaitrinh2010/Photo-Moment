import {db} from "@/lib/db";
import {getUserId} from "@/lib/auth";
import AlbumsPage from "@/app/(main)/albums/AlbumsPage";
export default async function Albums(){
    const uid = await getUserId();
    if (!uid) {
        return <div className="p-6">You must be logged in to view albums.</div>;
    }
    const albums = await db.album.findMany({
        where:{
            userId : uid
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            images: true
        }
    })
    return (
        <AlbumsPage albums={albums} />
    )
}
