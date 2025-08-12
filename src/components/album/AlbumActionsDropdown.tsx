"use client";

import {MoreVertical, Settings} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {useModalStore} from "@/hooks/use-modal-store";
import {Album} from "@prisma/client";

interface AlbumActionsDropdownProps {
    album: Album
    albumUserId?: string;
    currentUserId?: string | undefined;
}

export default function AlbumActionsDropdown({
    album,

                                                 albumUserId,
                                                 currentUserId,
                                             }: AlbumActionsDropdownProps) {
    const isOwner = albumUserId === currentUserId;
    const {onOpen, onClose} = useModalStore();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 flex justify-center gap-2"
                    aria-label="Album options"
                >
                    <span>Album Setting</span>
                    <Settings className="h-5 w-5 text-zinc-600 dark:text-zinc-300 mt-1" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-48 rounded-md shadow-md z-50 bg-white dark:bg-zinc-900"
                align="end"
            >
                {isOwner ? (
                    <>
                        <DropdownMenuItem className="text-sm font-medium text-zinc-700 dark:text-zinc-100 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700">
                            Album Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-sm font-medium text-zinc-700 dark:text-zinc-100 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700" onClick={() => onOpen("invite", { album })}>
                            Invite People
                        </DropdownMenuItem>
                    </>
                ) : (
                    <DropdownMenuItem
                        disabled
                        className="text-sm font-medium text-zinc-500 dark:text-zinc-400 opacity-70 cursor-not-allowed"
                    >
                        View Album Info
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
