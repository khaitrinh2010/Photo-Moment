"use client";
import { useState } from "react";
import { Upload } from "lucide-react";

export default function PhotoPickerWeb() {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPhotoUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1c1c1e] via-[#2c2c2e] to-[#1c1c1e] flex items-center justify-center px-6 py-8 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-600 rounded-full blur-[120px] opacity-20 z-0" />
            <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-pink-500 rounded-full blur-[120px] opacity-10 z-0" />

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-10 bg-[#2c2c2e]/60 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-[#3a3a3c]">
                {/* Left: Image Preview */}
                <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-md bg-[#2c2c2e]">
                    {photoUrl ? (
                        <img
                            src={photoUrl}
                            alt="Preview"
                            className="w-full h-[70vh] object-cover transition-all"
                        />
                    ) : (
                        <div className="w-full h-[70vh] flex items-center justify-center text-[#aaa] text-lg font-medium">
                            No image selected
                        </div>
                    )}
                </div>

                {/* Right: Controls */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-8">
                    {/* Capture button (future use) */}
                    <button className="w-20 h-20 bg-[#B388FF] hover:bg-[#a06af8] rounded-full flex items-center justify-center text-white text-3xl shadow-lg transition">
                        ⬤
                    </button>

                    {/* Upload from Gallery */}
                    <label className="flex flex-col items-center cursor-pointer gap-2">
                        <Upload size={30} className="text-purple-300" />
                        <span className="text-base text-purple-200 font-medium">Upload from Gallery</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}
