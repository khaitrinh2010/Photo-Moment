"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Album, Upload, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";
import {ActionTooltip} from "@/components/ActionTooltip"; // utility for conditional classNames

const navItems = [
    { href: "/albums", icon: Album, label: "Albums" },
    { href: "/photo-picker", icon: Upload, label: "Upload" },
    { href: "/newsfeed", icon: Newspaper, label: "Newsfeed" },
];

export default function NavigationSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed top-0 left-0 h-full w-[72px] bg-[#2c2c2e] border-r border-[#3a3a3c] flex flex-col items-center py-6 space-y-6 z-50">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);
                return (
                    <ActionTooltip label={item.label} side="right" align="start" key={item.href}>
                        <div>
                            <Link
                                href={item.href}
                                className={cn(
                                    "p-2 rounded-lg transition hover:bg-[#3a3a3c]",
                                    isActive && "bg-indigo-600 text-white"
                                )}
                            >
                                <Icon className="w-6 h-6" />
                            </Link>
                        </div>
                    </ActionTooltip>

                );
            })}
        </aside>
    );
}
