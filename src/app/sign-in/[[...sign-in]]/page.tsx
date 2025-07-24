"use client";
import {useAuth, useSignIn} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {FaFacebook, FaApple, FaGoogle} from "react-icons/fa";

export default function SocialSignIn() {
    const router = useRouter();
    const {isSignedIn, userId} = useAuth();
    if (isSignedIn){
        // If user is already signed in, redirect to homepage
        router.push("/homepage");
        return null;
    }
    const { signIn, isLoaded } = useSignIn();
    const signInWith = async (provider: "oauth_google" | "oauth_facebook" | "oauth_apple") => {
        if (!isLoaded) return;

        try {
            const result = await signIn.authenticateWithRedirect({
                strategy: provider,
                redirectUrl: "/sso-callback", // ⬅️ Clerk will redirect here after auth
                redirectUrlComplete: "/homepage", // ⬅️ Where user goes after successful sign in
            });
        } catch (err) {
            console.error("OAuth error:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-white to-[#fef6ff] flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
                <h1 className="text-2xl font-bold mb-6">Welcome to PhotoMoment</h1>
                <p className="text-sm text-gray-500 mb-4">Sign in with your favorite provider</p>

                <div className="space-y-3">
                    <button
                        onClick={() => signInWith("oauth_google")}
                        className="w-full flex items-center justify-center gap-2 border rounded py-2 hover:bg-gray-100"
                    >
                        <FaGoogle className="h-5 w-5" />
                        Continue with Google
                    </button>

                    <button
                        onClick={() => signInWith("oauth_facebook")}
                        className="w-full flex items-center justify-center gap-2 border rounded py-2 hover:bg-gray-100"
                    >
                        <FaFacebook className="h-5 w-5 text-blue-600" />
                        Continue with Facebook
                    </button>

                    <button
                        onClick={() => signInWith("oauth_apple")}
                        className="w-full flex items-center justify-center gap-2 border rounded py-2 hover:bg-gray-100"
                    >
                        <FaApple className="h-5 w-5 text-black" />
                        Continue with Apple
                    </button>
                </div>

                <p className="text-xs text-gray-400 mt-6">
                    By continuing, you agree to our Terms and Privacy Policy.
                </p>
            </div>
        </div>
    );
}
