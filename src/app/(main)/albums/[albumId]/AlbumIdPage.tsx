"use client";

import {useUser} from "@clerk/nextjs";
import {Album, Image} from "@prisma/client";
import AlbumActionsDropdown from "@/components/album/AlbumActionsDropdown";
import {Button} from "@/components/ui/button";
import {useModalStore} from "@/hooks/use-modal-store";

//const userId = await getUser().id
interface AlbumIdPageProps {
    album: Album & {images: Image[]}
}
const AlbumIdPage = ({album} : AlbumIdPageProps) => {
    const {user} = useUser()
    const userId : string | undefined = user?.id?.trim()
    const images = album.images || [];
    console.log("AlbumIdPage images:", images);
    const {type, data, onOpen, onClose} = useModalStore();

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold">Your Album</h1>
                <Button
                    className="bg-emerald-500 hover:bg-emerald-600 text-white"
                    onClick={() => onOpen("uploadPhoto", { albumId: album.id, userId: userId })} // Open upload modal
                >
                    Upload New Photos
                </Button>
            </div>
            <AlbumActionsDropdown album={album} albumUserId={album.userId} currentUserId={userId}/>
            <div className="p-6">
                {images.length === 0 ? (
                    <p className="text-neutral-400 text-center mt-10">No images in this album.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {images.map((img) => (
                            <div
                                key={img.id}
                                className="bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
                            >
                                <img
                                    src={img.imageUrl}
                                    alt="Album Image"
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-2 text-xs text-neutral-500 dark:text-neutral-300">
                                    Uploaded on {new Date(img.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlbumIdPage;
