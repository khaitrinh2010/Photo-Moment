
import Image from "next/image";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import HomePage from "@/app/(main)/homepage/page";
import HomePageClient from "@/components/HomePageClient";
import {useAuth} from "@clerk/nextjs";

export default function Home() {
  const {isSignedIn, userId} = auth();
    if (!isSignedIn) {
        return redirect("/sign-in");
    }
    return redirect("/homepage");
}
