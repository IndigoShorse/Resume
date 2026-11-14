import React from "react";
import { cn } from "../core/utils";

export interface InfoCardItem {
    label: string;
    value: React.ReactNode;
}

export interface InfoCardProps {
    title: string;
    items: InfoCardItem[];
    accentColor?: string;
    className?: string;
    isFirst?: boolean;
    isLast?: boolean;
}

export function InfoCard(
    {
        title,
        items,
        accentColor = "#FB2C36",
        className,
        isFirst = false,
        isLast = false,
    }: InfoCardProps) {
    return (
        <div
            className={cn(
                "bg-white border border-[#FFE2E2] shadow-[0_4px_15px_rgba(13,13,13,0.05)] px-6 py-6 sm:px-8 sm:py-8 w-full",
                isFirst ? "rounded-[44px_44px_0_0]" : isLast ? "rounded-[0_0_44px_44px]" : "rounded-none",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div
                    className="w-1 h-5 rounded-full shrink-0"
                    style={{backgroundColor: accentColor}}
                />
                <h2 className="text-lg font-bold text-[#323131] leading-none">
                    {title}
                </h2>
            </div>

            {/* Rows */}
            <div className="flex flex-col">
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className="h-px w-full bg-[#E5E7EB]"/>
                        <div
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-4 gap-2 sm:gap-4">
              <span className="text-[14px] sm:text-[15px] text-[#4A5565] shrink-0 sm:w-1/3">
                {item.label}
              </span>
                            <span
                                className="text-[14px] sm:text-[15px] font-medium text-[#323131] sm:text-right sm:w-2/3 leading-snug">
                {item.value}
              </span>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}


