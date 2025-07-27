"use client"

import CreateNewAlbumModal from "@/components/CreateNewAlbumModal";
import ImageUploadModal from "@/components/UploadPhotoModal";
import {useState, useEffect} from "react";
import InvitePeopleModal from "@/components/modals/invite-people";

export default function ModalProvider() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if(!isMounted) return null;
    return(
        <>
            <CreateNewAlbumModal />
            <ImageUploadModal />
            <InvitePeopleModal />
        </>
    )
}
