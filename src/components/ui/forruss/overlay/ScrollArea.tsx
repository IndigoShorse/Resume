import type {MutableRefObject, ReactNode} from "react";
import {OverlayScrollbarsComponent} from "overlayscrollbars-react";

interface ScrollAreaProps {
    children: ReactNode;
    className?: string;
    /** blue — тема суперлайков (sky/indigo), по умолчанию брендовый градиент red→amber. */
    variant?: "brand" | "blue";
    /** Ссылка на скроллящийся элемент (viewport) — для программного scrollTo/scrollTop. */
    viewportRef?: MutableRefObject<HTMLElement | null>;
    /** hidden — обрезать контент по горизонтали (замена overflow-x-hidden). */
    overflowX?: "hidden";
}

/**
 * Кастомный JS-скроллбар (OverlayScrollbars): градиентный ползунок на прозрачном
 * треке, без стрелок, одинаковый во всех браузерах. Замена контейнерам с
 * overflow-y-auto/.modal-scroll: сам контейнер задаёт размеры (flex-1/min-h-0/h-full),
 * контент скроллится внутри.
 */
export function ScrollArea({children, className, variant = "brand", viewportRef, overflowX}: ScrollAreaProps) {
    return (
        <OverlayScrollbarsComponent
            defer
            className={className}
            options={{
                overflow: {x: overflowX === "hidden" ? "hidden" : "scroll"},
                scrollbars: {
                    theme: variant === "blue" ? "os-theme-brand-blue" : "os-theme-brand",
                    autoHide: "leave",
                    autoHideDelay: 600,
                },
            }}
            events={{
                initialized: (instance) => {
                    if (viewportRef) viewportRef.current = instance.elements().viewport;
                },
                destroyed: () => {
                    if (viewportRef) viewportRef.current = null;
                },
            }}
        >
            {children}
        </OverlayScrollbarsComponent>
    );
}


