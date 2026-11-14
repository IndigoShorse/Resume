import type {ReactNode} from "react";
import {Button} from "../core/button";

interface ButtonsBlockProps {
    onCancel: () => void;
    onConfirm: () => void;
    cancelText?: string;
    confirmText?: string;
    cancelDisabled?: boolean;
    confirmDisabled?: boolean;
    className?: string;
    /** Дополнительные действия того же блока — рендерятся под парой кнопок. */
    children?: ReactNode;
}

/** Футер формы: пара «Отмена | Сохранить» (тексты и колбэки настраиваются),
 *  отделённая линией от содержимого; children — дополнительные действия под парой. */
export function ButtonsBlock({
    onCancel,
    onConfirm,
    cancelText = "Отмена",
    confirmText = "Сохранить",
    cancelDisabled = false,
    confirmDisabled = false,
    className = "",
    children,
}: ButtonsBlockProps) {
    return (
        <div className={className}>
            <div className="flex gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="cta"
                    disabled={cancelDisabled}
                    onClick={onCancel}
                    className="flex-1"
                >
                    {cancelText}
                </Button>
                <Button
                    type="button"
                    variant="brand"
                    size="cta"
                    disabled={confirmDisabled}
                    onClick={onConfirm}
                    className="flex-1"
                >
                    {confirmText}
                </Button>
            </div>
            {children ? <div className="mt-3">{children}</div> : null}
        </div>
    );
}


