import {AnimatePresence, motion, useIsPresent} from "motion/react";
import {createContext, Fragment, type CSSProperties, type ReactNode, useContext, useEffect, useRef} from "react";

import {ModalCloseButton} from "../core/button";
import {Portal} from "./Portal";
import {ScrollArea} from "./ScrollArea";

const ASPECT_W = 9;
const ASPECT_H = 16;
const FRAME_IDEAL_WIDTH_PX = 400;
/** Доп. классы рамки по умолчанию — модалка дописывает свои поверх базовых. */
const DEFAULT_CLASS_NAME = "";
const BORDER_RADIUS = "4xl";
/**
 * Скругления рамки перечислены целиком, а не собираются из кусков: Tailwind ищет
 * имена классов по исходникам как текст, и `sm:rounded-${x}` в сборку не попадёт —
 * у модалки просто пропали бы скругления на десктопе.
 */
const BORDER_RADIUS_CLASSES: Record<string, {bottomSheet: string; topSheet: string; centered: string}> = {
    "2xl": {
        bottomSheet: "rounded-t-2xl sm:rounded-t-2xl",
        topSheet: "rounded-b-2xl sm:rounded-b-2xl",
        centered: "rounded-2xl sm:rounded-2xl",
    },
    "3xl": {
        bottomSheet: "rounded-t-3xl sm:rounded-t-3xl",
        topSheet: "rounded-b-3xl sm:rounded-b-3xl",
        centered: "rounded-3xl sm:rounded-3xl",
    },
    "4xl": {
        bottomSheet: "rounded-t-4xl sm:rounded-t-4xl",
        topSheet: "rounded-b-4xl sm:rounded-b-4xl",
        centered: "rounded-4xl sm:rounded-4xl",
    },
};

const SharedModalBackdropContext = createContext(false);
const ModalLayerContext = createContext<{zIndex?: number; interactive: boolean}>({
    interactive: true,
});

type ModalPosition = "default" | "center" | "top" | "bottom" | "topRight";

interface ModalShellProps {
    children: ReactNode;
    onClose?: () => void;
    position?: ModalPosition;
    disableBackdropClose?: boolean;
    hideCloseButton?: boolean;
    /** Доп. классы крестика закрытия — например text-red-500 для модалок с белым фоном без шапки. */
    closeButtonClassName?: string;
    fitContent?: boolean;
    width?: number;
    className?: string;
    ariaLabel?: string;
    borderRadius?: string;
}

interface ModalHostProps {
    isOpen: boolean;
    children: ReactNode;
}

export function ModalHost({isOpen, children}: ModalHostProps) {
    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="modal-backdrop"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.18}}
                        className="pointer-events-none fixed inset-0 z-[79] bg-black/50 backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>
            <SharedModalBackdropContext.Provider value>
                {children}
            </SharedModalBackdropContext.Provider>
        </>
    );
}

export function ModalLayerProvider({
    zIndex,
    interactive = true,
    children,
}: {
    zIndex?: number;
    interactive?: boolean;
    children: ReactNode;
}) {
    return (
        <ModalLayerContext.Provider value={{zIndex, interactive}}>
            {children}
        </ModalLayerContext.Provider>
    );
}

export function ModalShell({
    onClose,
    position = "center",
    disableBackdropClose = false,
    hideCloseButton = false,
    closeButtonClassName = "",
    fitContent = false,
    width = FRAME_IDEAL_WIDTH_PX,
    className = DEFAULT_CLASS_NAME,
    borderRadius = BORDER_RADIUS,
    children,
    ariaLabel,
}: ModalShellProps) {
    const pressStartedOnBackdropRef = useRef(false);
    const hasSharedBackdrop = useContext(SharedModalBackdropContext);
    const modalLayer = useContext(ModalLayerContext);
    // Модалка в процессе выхода не должна ловить клики. Подстраховка от «призраков»:
    // если AnimatePresence по какой-то причине не удалит узел, экран всё равно
    // останется рабочим, а не заблокируется прозрачной подложкой на весь вьюпорт.
    const isPresent = useIsPresent();
    const radiusClasses = BORDER_RADIUS_CLASSES[borderRadius] ?? BORDER_RADIUS_CLASSES[BORDER_RADIUS];
    const resolvedPosition = position === "default" ? "center" : position;
    const isBottom = resolvedPosition === "bottom";
    const isTop = resolvedPosition === "top";
    const isTopRight = resolvedPosition === "topRight";

    useEffect(() => {
        if (!onClose) return;
        const handler = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const frameStyle: CSSProperties = fitContent
        ? {
            width: `min(${width}px, calc(100vw - 1.5rem))`,
            maxHeight: "calc(100dvh - 1.5rem)",
            height: "fit-content",
        }
        : isBottom
            ? {
                width: `min(${width}px, 100vw)`,
                height: "82dvh",
                maxHeight: "82dvh",
            }
            : isTop
                ? {
                    width: `min(${width}px, calc(100vw - 1.5rem))`,
                    height: "min(42rem, calc(100dvh - 5.25rem))",
                    maxHeight: "calc(100dvh - 5.25rem)",
                }
                : {
                    width: isTopRight
                        ? `min(${width}px, calc(100vw - 1.5rem), calc((100dvh - 5.25rem) * ${ASPECT_W} / ${ASPECT_H}))`
                        : `min(${width}px, calc(100vw - 1.5rem), calc((100dvh - 1.5rem) * ${ASPECT_W} / ${ASPECT_H}))`,
                    aspectRatio: `${ASPECT_W} / ${ASPECT_H}`,
                    maxHeight: isTopRight ? "calc(100dvh - 5.25rem)" : "calc(100dvh - 1.5rem)",
                };

    const initial = isBottom
        ? {y: "100%"}
        : isTop || isTopRight
            ? {y: "calc(-100% - 4.5rem)", opacity: 0}
            : {scale: 0.92, opacity: 0, y: 12};
    const animate = isBottom
        ? {y: 0}
        : isTop || isTopRight
            ? {y: 0, opacity: 1}
            : {scale: 1, opacity: 1, y: 0};
    const exit = initial;

    return (
        /*
         * Портал в body обязателен, а не «для красоты»: страницы рендерят часть модалок
         * сами (события, компоновка суперлайка, мэтч после свайпа), а они лежат внутри
         * <main class="relative z-10"> — это контекст наложения. Без портала такая модалка
         * с z-96 всё равно оказывалась ПОД модалками общего стека (z-80+), потому что
         * сравнивались не они, а z-10 у main. Портал поднимает все модалки на один
         * уровень, и z-index снова означает то, что написано.
         */
        <Portal>
        <div
            className={[
                "fixed inset-0 z-[80] flex touch-manipulation overflow-hidden",
                modalLayer.interactive && isPresent ? "pointer-events-auto" : "pointer-events-none",
                hasSharedBackdrop ? "" : "bg-black/50 backdrop-blur-sm",
                isBottom
                    ? "items-end justify-center"
                    : isTop || isTopRight
                        ? "items-start justify-center"
                        : "items-center justify-center",
            ].join(" ")}
            onPointerDown={(event) => {
                pressStartedOnBackdropRef.current = event.target === event.currentTarget;
            }}
            onClick={(event) => {
                const startedOnBackdrop = pressStartedOnBackdropRef.current;
                pressStartedOnBackdropRef.current = false;
                if (!startedOnBackdrop || event.target !== event.currentTarget) return;
                if (!disableBackdropClose && onClose) onClose();
            }}
            aria-modal="true"
            role="dialog"
            aria-label={ariaLabel}
            style={{
                paddingTop: isTop || isTopRight
                    ? "calc(env(safe-area-inset-top))"
                    : "max(env(safe-area-inset-top), 0.75rem)",
                paddingBottom: isBottom ? 0 : "max(env(safe-area-inset-bottom), 0.75rem)",
                paddingLeft: isBottom ? 0 : "max(env(safe-area-inset-left), 0.75rem)",
                paddingRight: isBottom ? 0 : "max(env(safe-area-inset-right), 0.75rem)",
                zIndex: modalLayer.zIndex,
            }}
        >
            <motion.div
                initial={initial}
                animate={animate}
                exit={exit}
                transition={{type: "spring", duration: 0.45}}
                className={[
                    "relative flex flex-col overflow-hidden bg-white shadow-2xl",
                    isBottom
                        ? radiusClasses.bottomSheet
                        : isTop
                            ? radiusClasses.topSheet
                            : radiusClasses.centered,
                    className,
                ].join(" ")}
                style={frameStyle}
                onClick={(event) => event.stopPropagation()}
            >
                {!hideCloseButton && onClose && (
                    <ModalCloseButton onClick={onClose} className={["z-20 size-9", closeButtonClassName].join(" ")}/>
                )}
                {/*
                 * Граница presence-контекста для содержимого модалки.
                 *
                 * Стек модалок закрывается через AnimatePresence в AppLayout, и любой
                 * motion-компонент внутри модалки регистрируется в том же presence.
                 * Если такой компонент смонтировать и размонтировать внутри открытой
                 * модалки (например, карточка предпоказа анкеты), внешний AnimatePresence
                 * остаётся ждать потомка, которого уже нет: выход не завершается, узел
                 * навсегда остаётся в DOM и невидимой подложкой перехватывает клики.
                 * Здесь такие компоненты регистрируются в локальном presence, а наружу
                 * «выходит» только сама рамка модалки — один стабильный motion-элемент.
                 */}
                <AnimatePresence>
                    <Fragment key="modal-content">{children}</Fragment>
                </AnimatePresence>
            </motion.div>
        </div>
        </Portal>
    );
}

export function ModalHeader({
    children,
    className = "",
    variant = "gradient",
}: {
    children: ReactNode;
    className?: string;
    variant?: "gradient" | "plain";
}) {
    const base =
        variant === "gradient"
            ? "bg-gradient-to-br from-red-500 to-amber-500 text-white"
            : "bg-white text-gray-900 border-b border-gray-100";
    return (
        <div className={`flex-shrink-0 px-5 sm:px-6 py-4 sm:py-5 ${base} ${className}`}>
            {children}
        </div>
    );
}

export function ModalBody({
    children,
    className = "",
    noPadding = false,
}: {
    children: ReactNode;
    className?: string;
    noPadding?: boolean;
}) {
    return (
        <ScrollArea className={["flex-1 min-h-0", className].join(" ")}>
            <div className={noPadding ? "" : "px-5 sm:px-6 py-4 sm:py-5"}>
                {children}
            </div>
        </ScrollArea>
    );
}

export function ModalFooter({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={[
                "flex-shrink-0 px-5 sm:px-6 py-3 sm:py-4 border-t border-gray-100 bg-white",
                className,
            ].join(" ")}
        >
            {children}
        </div>
    );
}


