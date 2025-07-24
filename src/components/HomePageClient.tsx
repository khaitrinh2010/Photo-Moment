// src/components/HomeClient.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HomePage from "@/app/(main)/homepage/page";

export default function HomePageClient({ userId }: { userId: string | null }) {
    const router = useRouter();
    console.log("User ID:", userId);

    useEffect(() => {
        if (!userId) {
            router.push("/sign-in");
        }
    }, [userId, router]);

    if (!userId) return null;
    router.push("/homepage");
}
