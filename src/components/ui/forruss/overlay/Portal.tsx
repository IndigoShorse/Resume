import type {ReactNode} from "react";
import {createPortal} from "react-dom";

/**
 * Рендер поверх всей страницы, в конец body.
 *
 * Нужен оверлеям, которые живут внутри модалки: скролл-контейнер ScrollArea
 * (OverlayScrollbars) задаёт своему viewport `position: relative; z-index: 0`,
 * то есть создаёт контекст наложения. Любой `fixed inset-0 z-[100]` внутри него
 * остаётся на уровне самого контейнера, и соседние элементы модалки (аватар,
 * кнопки QR/назад, крестик закрытия с z-10/z-20) рисуются поверх затенения.
 * Портал выносит оверлей из этого контекста, и z-index снова работает как ожидается.
 */
export function Portal({children}: {children: ReactNode}) {
    if (typeof document === "undefined") return null;
    return createPortal(children, document.body);
}


