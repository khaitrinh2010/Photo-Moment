import {auth, currentUser, clerkClient} from "@clerk/nextjs/server";

export const getUser = async () => {
    return currentUser();
}

export const getUserId = async () => {
    const {userId} = await auth();
    if (!userId) {
        return null;
    }
    return userId;
}


