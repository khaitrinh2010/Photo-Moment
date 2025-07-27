import { useModalStore } from "@/hooks/use-modal-store";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

interface CreateNewAlbumModalProps {
    onAlbumCreated?: () => void;
}

const CreateNewAlbumModal = () => {
    const { type, isOpen, onClose } = useModalStore();
    const [albumName, setAlbumName] = useState("");

    const isAlbumModal = type === "createAlbum";
    const router = useRouter()

    const handleCreate = async () => {
        if (!albumName.trim()) {
            alert("Album name cannot be empty");
            return;
        }
        const response  = await axios.post("/api/albums", { name: albumName });
        if (!response) {
            alert("Failed to create album");
            return;
        }
        setAlbumName(""); // Clear the input field
        onClose();
        router.refresh();
    };

    return (
        <Dialog open={isOpen && isAlbumModal} onOpenChange={onClose}>
            <DialogContent className="max-w-sm rounded-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Create New Album</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                    <Input
                        placeholder="Album name"
                        value={albumName}
                        onChange={(e) => setAlbumName(e.target.value)}
                    />
                    <Button onClick={handleCreate} className="w-full">
                        Create Album
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateNewAlbumModal;
