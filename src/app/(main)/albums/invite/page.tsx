import {redirect, useRouter, useSearchParams} from "next/navigation";
import {db} from "@/lib/db";

interface AlbumInvitePageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const AlbumInvitePage =async ({ searchParams }: AlbumInvitePageProps) => {
    const inviteCode = searchParams.code as string | undefined;
    console.log("Invite code:", inviteCode);
    const album  = await  db.album.findFirst({
        where: {
            inviteCode: inviteCode || "",
        },
    });
    console.log("Album found:", album);
    return redirect(`/albums/${album.id}`); // Redirect to the album page if invite code is valid
}

export default AlbumInvitePage;
