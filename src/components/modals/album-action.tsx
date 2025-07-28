"use client";

import { useModalStore } from "@/hooks/use-modal-store";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

const AlbumActionsModal = () => {
    const { type, isOpen, data, onClose, onOpen } = useModalStore();
    const isActionsModal = type === "albumActions";
    const { albumId } = useParams();

    const handleRename = () => {
        onOpen("renameAlbum", { album: data.album });
    };

    const handleDelete = () => {
        onOpen("deleteAlbum", { album: data.album });
    };

    return (
        <Dialog open={isOpen && isActionsModal} onOpenChange={onClose}>
            <DialogContent className="max-w-sm rounded-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Album Actions</DialogTitle>
                </DialogHeader>

                <div className="space-y-3 mt-4">
                    <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={handleRename}
                    >
                        Rename Album
                    </Button>
                    <Button
                        variant="destructive"
                        className="w-full justify-start"
                        onClick={handleDelete}
                    >
                        Delete Album
                    </Button>
                </div>

                <DialogFooter className="pt-4">
                    <Button variant="ghost" onClick={onClose} className="w-full">
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AlbumActionsModal;
