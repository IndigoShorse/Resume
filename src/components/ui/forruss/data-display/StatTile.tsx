import type {LucideIcon} from "lucide-react";
import type {ReactNode} from "react";

import {cn} from "../core/utils";

/** Палитры плитки: насыщенно-красная, нейтрально-янтарная и голубая (суперлайки). */
const TILE_VARIANTS = {
    red: {tile: "bg-gradient-to-br from-red-100 to-amber-50", icon: "text-red-500"},
    amber: {tile: "bg-gradient-to-br from-red-50 to-amber-50", icon: "text-amber-500"},
    sky: {tile: "bg-gradient-to-br from-sky-50 to-indigo-50", icon: "text-sky-500"},
} as const;

interface StatTileProps {
    icon: LucideIcon;
    value: ReactNode;
    /** Подпись под числом (например, «Лайки»); без неё плитка компактнее. */
    label?: string;
    variant?: keyof typeof TILE_VARIANTS;
    /** Переопределить цвет иконки, если он не совпадает с цветом варианта. */
    iconClassName?: string;
    className?: string;
}

/** Квадратная плитка статистики профиля: иконка, число, опциональная подпись. */
export function StatTile({icon: Icon, value, label, variant = "amber", iconClassName, className}: StatTileProps) {
    const colors = TILE_VARIANTS[variant];
    return (
        <div
            className={cn(
                "flex flex-1 aspect-square flex-col items-center justify-center rounded-2xl p-2 text-center",
                colors.tile,
                className,
            )}
        >
            <Icon className={cn("mx-auto mb-1 size-5", colors.icon, iconClassName)}/>
            <div className="text-lg font-bold text-gray-800">{value}</div>
            {label ? <div className="text-xs text-gray-600">{label}</div> : null}
        </div>
    );
}


