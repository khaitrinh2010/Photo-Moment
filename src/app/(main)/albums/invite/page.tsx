import { redirect } from "next/navigation";
import { db } from "@/lib/db";

interface AlbumInvitePageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const AlbumInvitePage = async ({ searchParams }: AlbumInvitePageProps) => {
    const resolvedSearchParams = await searchParams;
    const inviteCode = resolvedSearchParams.code as string | undefined;

    console.log("Invite code:", inviteCode);

    const album = await db.album.findFirst({
        where: {
            inviteCode: inviteCode || "",
        },
    });

    console.log("Album found:", album);

    return redirect(`/albums/${album?.id ?? ""}`);
};

export default AlbumInvitePage;
