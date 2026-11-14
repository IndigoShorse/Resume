/**
 * Текстовое поле формы — замена сырым <input> для text/password/email/date/time.
 * Единая рамка и фокус-кольцо; отклонения (иконки, паддинги, цвета админки)
 * передаются через className и перекрывают базу через twMerge.
 */
import type {InputHTMLAttributes} from "react";

import {cn} from "../core/utils";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    /** md — компактные поля (py-2), lg — крупные поля страниц/модалок (py-3). */
    size?: "md" | "lg";
    /** Подсветить ошибку красной рамкой. */
    error?: boolean;
}

export function Input({size = "md", error = false, className, type = "text", ...props}: InputProps) {
    return (
        <input
            type={type}
            className={cn(
                "w-full rounded-xl border border-gray-300 bg-white px-4 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50",
                size === "md" ? "py-2" : "py-3",
                error && "border-red-500",
                className,
            )}
            {...props}
        />
    );
}


