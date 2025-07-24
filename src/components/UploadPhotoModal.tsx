"use client";

import { useModalStore } from "@/hooks/use-modal-store";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface ImageUploadModalProps {
    albumId: string;
}

export default function ImageUploadModal() {
    const { isOpen, type, onClose, data } = useModalStore();
    const isModalOpen = isOpen && type === "uploadPhoto";

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        if (files.length > 10) {
            setError("You can upload up to 10 images at once.");
            return;
        }

        setSelectedFiles(files);
        setPreviews(files.map((file) => URL.createObjectURL(file)));
        setError(null);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append("images", file));
        formData.append("albumId", data?.albumId);
        formData.append("userId", data?.userId);

        try {
            setLoading(true);
            const response = await axios.post("/api/upload", formData);
            let imagesObject = []
            for (const url in response.data.urls) {
                imagesObject.push({
                    imageUrl: response.data.urls[url],
                    albumId: data?.albumId,
                    userId: data?.userId,
                });
            }
            await axios.post("/api/images", { images: imagesObject });
            setSelectedFiles([]);
            setPreviews([]);
            onClose();
        } catch (err) {
            console.error(err);
            setError("Upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            previews.forEach((preview) => URL.revokeObjectURL(preview));
        };
    }, [previews]);

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Upload Images to Album</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />

                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        Select Images
                    </Button>

                    {previews.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                            {previews.map((src, idx) => (
                                <img
                                    key={idx}
                                    src={src}
                                    alt={`Preview ${idx + 1}`}
                                    className="w-full h-24 object-cover rounded border"
                                />
                            ))}
                        </div>
                    )}

                    <Button
                        disabled={loading || selectedFiles.length === 0}
                        onClick={handleUpload}
                        className="w-full"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </span>
                        ) : (
                            `Upload ${selectedFiles.length} Image${
                                selectedFiles.length > 1 ? "s" : ""
                            }`
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
