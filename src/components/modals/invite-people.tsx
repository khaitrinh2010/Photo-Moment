"use client";

import { useModalStore } from "@/hooks/use-modal-store";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import {useOrigin} from "@/hooks/use-origin";

const InvitePeopleModal = () => {
    const { type, isOpen,  data, onClose } = useModalStore();
    const isInviteModal = type === "invite";
    const { albumId } = useParams();
    const router = useRouter();
    const origin = useOrigin()
    const inviteCode = data?.album?.inviteCode;
    console.log("origin: ", origin)
    const [inviteLink, setInviteLink] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (origin && inviteCode) {
            setInviteLink(`${origin}/albums/invite?code=${inviteCode}`);
        }
    }, [origin, inviteCode]);


    const handleGenerateNew = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`/api/albums/${albumId}/invite-link`);
            setInviteLink(res.data.inviteLink);
            router.refresh(); // optional: revalidate on server
        } catch {
            console.error("Failed to generate invite link");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        if (!inviteLink) return;
        await navigator.clipboard.writeText(inviteLink);
    };


    return (
        <Dialog open={isOpen && isInviteModal} onOpenChange={onClose}>
            <DialogContent className="max-w-sm rounded-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Invite People</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    {inviteLink ? (
                        <div className="flex gap-2">
                            <Input value={inviteLink} className="text-sm" />
                            <Button variant="secondary" onClick={handleCopy}>
                                Copy
                            </Button>
                        </div>
                    ) : (
                        <p className="text-sm text-neutral-500">
                            No invite link yet. Click the button below to generate one.
                        </p>
                    )}
                </div>

                <DialogFooter className="pt-4">
                    <Button onClick={handleGenerateNew} disabled={loading} className="w-full">
                        {loading ? "Generating..." : "Generate New Link"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default InvitePeopleModal;
