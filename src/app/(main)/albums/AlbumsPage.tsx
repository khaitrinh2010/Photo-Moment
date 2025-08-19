"use client";

import { useModalStore } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { Plus, Folder, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import type { Prisma } from "@prisma/client";

type Album = Prisma.AlbumGetPayload<{}>;

interface AlbumsPageProps {
    albums: Album[];
}

export default function AlbumsPage({ albums }: AlbumsPageProps) {
    const { onOpen } = useModalStore();
    const router = useRouter();

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-white dark:text-white">Your Albums</h1>
                <Button
                    onClick={() => onOpen("createAlbum")}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow px-4 py-2"
                >
                    <Plus className="w-4 h-4" />
                    Create New Album
                </Button>
            </div>

            {/* Albums Grid or Empty State */}
            {albums.length === 0 ? (
                <div className="text-neutral-500 text-center mt-20">
                    You don't have any albums yet. Click "Create New Album" to get started!
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {albums.map((album) => (
                        <div
                            key={album.id}
                            className="group relative bg-neutral-100 dark:bg-neutral-900
                rounded-xl border border-neutral-200 dark:border-neutral-700
                p-3 shadow-sm hover:shadow-md hover:scale-[1.02]
                transition-transform cursor-pointer w-full max-w-[180px]"
                        >
                            {/* Top Row: Icon + Dropdown */}
                            <div className="flex justify-between items-start">
                                <Folder
                                    className="w-6 h-6 text-indigo-500"
                                    onClick={() => router.push(`/albums/${album.id}`)}
                                />

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-white">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuItem
                                            onClick={() => onOpen("uploadPhoto", { albumId: album.id, userId: album.userId })}
                                        >
                                            Add Image to Album
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Album Title */}
                            <div className="text-sm font-medium text-gray-800 dark:text-white mt-2 truncate">
                                {album.name || "Untitled Album"}
                            </div>

                            {/* Date */}
                            <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">
                                Created at: {new Date(album.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
