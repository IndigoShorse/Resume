import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva, type VariantProps} from "class-variance-authority";
import {X, type LucideIcon} from "lucide-react";

import {cn} from "./utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                brand:
                    "bg-gradient-to-r from-red-500 to-amber-500 text-white hover:shadow-lg active:scale-95 border border-red-300/40",
                analysis:
                    "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold hover:from-purple-600 hover:via-pink-600 hover:to-red-600 shadow-lg hover:shadow-xl active:scale-95",
                outline:
                    "border bg-white text-[#323131] hover:bg-gray-50 dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost:
                    "hover:bg-accent dark:hover:bg-accent/50",
                link: "text-primary underline-offset-4 hover:underline",
                destructive:
                    "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                overlay:
                    "bg-transparent text-white hover:bg-white/10",
                menu:
                    "justify-between whitespace-normal text-left bg-gray-50 font-medium text-gray-700 hover:bg-gray-100 [&_svg]:text-gray-400",
            },
            size: {
                sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                lg: "h-10 px-6 has-[>svg]:px-4",
                cta: "h-auto px-6 py-2",
                ctaLg: "h-auto px-6 py-4 text-lg",
                icon: "h-11 aspect-square p-0",
                iconSm: "h-9 aspect-square p-0",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

function Button(
    {
        className,
        variant,
        size,
        asChild = false,
        type = "button",
        ...props
    }: React.ComponentProps<"button"> &
        VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            type={asChild ? undefined : type}
            className={cn(buttonVariants({variant, size}), className)}
            {...props}
        />
    );
}

type ModalCloseButtonProps = Omit<
    React.ComponentProps<typeof Button>,
    "variant" | "size" | "children"
> & {
    label?: string;
};

function ModalCloseButton(
    {
        className,
        label = "Закрыть",
        ...props
    }: ModalCloseButtonProps) {
    return (
        <Button
            type="button"
            variant="overlay"
            size="iconSm"
            aria-label={label}
            className={cn("absolute top-3 right-3 z-10 sm:top-4 sm:right-4", className)}
            {...props}
        >
            <X className="size-5"/>
        </Button>
    );
}

type NavIconButtonProps = Omit<
    React.ComponentProps<typeof Button>,
    "variant" | "size" | "children"
> & {
    icon: LucideIcon;
    label: string;
    badge?: React.ReactNode;
};

function NavIconButton(
    {
        icon: Icon,
        label,
        badge,
        className,
        ...props
    }: NavIconButtonProps) {
    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={label}
            className={cn(
                "relative sm:h-13 text-gray-600 hover:bg-gray-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400",
                className,
            )}
            {...props}
        >
            <Icon className="size-6 sm:size-7"/>
            {badge}
        </Button>
    );
}

export {Button, ModalCloseButton, NavIconButton, buttonVariants};


