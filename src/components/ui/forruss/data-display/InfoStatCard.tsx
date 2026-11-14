import type {ReactNode} from "react";

import {cn} from "../core/utils";

interface InfoStatCardProps {
    label: string;
    value: ReactNode;
    valueClassName?: string;
    className?: string;
}

export function InfoStatCard({label, value, valueClassName, className}: InfoStatCardProps) {
    return (
        <div
            className={cn(
                "flex min-h-[5.25rem] flex-col items-center justify-center rounded-[14px] bg-gradient-to-br from-[#FEF2F2] to-[#FFFBEB] px-2 py-4 text-center",
                className,
            )}
        >
            <div className={cn("max-w-full truncate text-sm font-bold text-slate-900", valueClassName)}>{value}</div>
            <div className="mt-2 text-xs font-medium text-gray-600">{label}</div>
        </div>
    );
}


