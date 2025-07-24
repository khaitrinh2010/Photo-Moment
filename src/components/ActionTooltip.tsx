"use client"

import {
    Tooltip, TooltipContent, TooltipProvider, TooltipTrigger
} from "@/components/ui/tooltip";

interface ActionTooltipsProps {
    label: string,
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
}

export const ActionTooltip = ({label, children, side = "right", align = "center"}: ActionTooltipsProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent side={side} align={align} className="text-xs px-2 py-1 rounded-md">
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

