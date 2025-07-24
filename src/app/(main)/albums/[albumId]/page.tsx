"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

const AlbumIdPage = () => {
    const { albumId } = useParams(); // fetch albumId from URL
    const [images, setImages] = useState([]);

    const fetchImages = async () => {
        try {
            const response = await axios.get(`/api/images/${albumId}`);
            setImages(response.data.images || []);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    useEffect(() => {
        if (albumId) fetchImages();
    }, [albumId]);

    return (
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
    );
};

export default AlbumIdPage;
