"use client";

import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { ChevronRight, RefreshCcw, Camera } from "lucide-react";

const HomePage = () => {
    const router = useRouter();

    return (
        <main className="relative min-h-screen bg-gradient-to-b from-[#1c1c1e] via-[#2a2a2d] to-[#1c1c1e] text-white px-6 py-6 overflow-hidden">
            {/* Glow background blur */}
            <div className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] rounded-full bg-purple-500 blur-3xl opacity-20 z-0" />
            <div className="absolute bottom-[-100px] right-[-150px] w-[400px] h-[400px] rounded-full bg-indigo-400 blur-2xl opacity-10 z-0" />
            {/* Main content */}
            <div className="space-y-6 max-w-xl mx-auto relative z-10">
                {/* Upload a Moment */}
                <button
                    onClick={() => router.push("/photo-picker")}
                    className="w-full bg-purple-600 hover:bg-purple-700 transition rounded-2xl px-6 py-5 flex items-center gap-4 shadow"
                >
                    <Camera size={24} className="text-white" />
                    <div className="text-left text-white">
                        <h2 className="text-lg font-semibold">Upload a Moment</h2>
                        <p className="text-sm text-purple-100">
                            Share photos instantly with friends
                        </p>
                    </div>
                </button>

                {/* My Album */}
                <button
                    onClick={() => router.push("/albums")}
                    className="w-full text-left"
                >
                    <div className="bg-[#2c2c2e] rounded-2xl p-6 hover:bg-[#3a3a3c] transition">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold text-purple-200">My Album</h2>
                            <ChevronRight size={20} color="#B388FF" />
                        </div>
                        <p className="text-sm text-gray-300">
                            Browse and manage your uploaded photos
                        </p>
                    </div>
                </button>

                {/* Newsfeed */}
                <button
                    onClick={() => router.push("/newsfeed")}
                    className="w-full text-left"
                >
                    <div className="bg-[#2c2c2e] rounded-2xl p-6 hover:bg-[#3a3a3c] transition">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold text-purple-200">Newsfeed</h2>
                            <RefreshCcw size={20} color="#B388FF" />
                        </div>
                        <p className="text-sm text-gray-300">
                            See new moments shared by your friends
                        </p>
                    </div>
                </button>
            </div>
        </main>
    );
};

export default HomePage;
