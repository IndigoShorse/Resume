/**
 * Кастомный выпадающий список — замена нативного <select>.
 *
 * Нативный попап <select> не стилизуется, поэтому список рисуем сами:
 * кнопка-триггер + абсолютный выпадающий список в ScrollArea
 * (как у других выпадающих подсказок). Стрелка стоит с тем же отступом
 * справа, что и горизонтальный паддинг содержимого триггера.
 */
import {Check, ChevronDown} from "lucide-react";
import type {KeyboardEvent} from "react";
import {useEffect, useId, useRef, useState} from "react";
import {cn} from "../core/utils";
import {ScrollArea} from "../overlay/ScrollArea";

export interface SelectOption {
    value: string;
    label: string;
    /** Пункт виден в списке, но недоступен для выбора. */
    disabled?: boolean;
}

type SelectSize = "md" | "sm" | "xs";

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    /** Строка означает пункт, у которого значение и подпись совпадают. */
    options: ReadonlyArray<string | SelectOption>;
    /** Текст в закрытом поле, пока значение не выбрано. */
    placeholder?: string;
    disabled?: boolean;
    /** id триггера для связки с label. */
    id?: string;
    /** Классы корневого контейнера — прежде всего ширина (по умолчанию во всю). */
    className?: string;
    /** Точечные правки кнопки-триггера (скругление, цвет рамки в админке). */
    triggerClassName?: string;
    /** md — поля профиля (px-4), sm — фильтры (px-3), xs — админка (px-2). */
    size?: SelectSize;
}

/** Отступ стрелки справа равен горизонтальному паддингу контента триггера. */
const sizeStyles: Record<SelectSize, { trigger: string; chevron: string; option: string }> = {
    md: {trigger: "rounded-xl px-4 py-2 pr-10", chevron: "right-4", option: "px-4 py-2"},
    sm: {trigger: "rounded-xl px-3 py-2 pr-8 text-sm", chevron: "right-3", option: "px-3 py-2 text-sm"},
    xs: {trigger: "rounded-lg px-2 py-1.5 pr-7 text-sm", chevron: "right-2", option: "px-2 py-1.5 text-sm"},
};

export function Select({
    value,
    onChange,
    options,
    placeholder = "Не указано",
    disabled = false,
    id,
    className = "",
    triggerClassName = "",
    size = "md",
}: SelectProps) {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const listId = useId();
    const s = sizeStyles[size];

    const items: SelectOption[] = options.map((o) => (typeof o === "string" ? {value: o, label: o} : o));
    const selectedIndex = items.findIndex((o) => o.value === value);
    const selected = selectedIndex >= 0 ? items[selectedIndex] : undefined;
    /** Значение есть, но пункта под него нет (старые сохранённые данные) — показываем как есть. */
    const displayLabel = selected?.label ?? (value || "");

    useEffect(() => {
        if (!open) return;
        const onDocClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [open]);

    const openList = () => {
        const first = items.findIndex((o) => !o.disabled);
        setActive(selectedIndex >= 0 ? selectedIndex : first);
        setOpen(true);
    };

    const commit = (index: number) => {
        const item = items[index];
        if (!item || item.disabled) return;
        onChange(item.value);
        setOpen(false);
    };

    const move = (delta: number) => {
        if (!items.length) return;
        let next = active;
        do {
            next = (next + delta + items.length) % items.length;
        } while (items[next]?.disabled && next !== active);
        setActive(next);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        switch (e.key) {
            case "ArrowDown":
            case "ArrowUp":
                e.preventDefault();
                if (!open) openList();
                else move(e.key === "ArrowDown" ? 1 : -1);
                break;
            case "Enter":
            case " ":
                e.preventDefault();
                if (open) commit(active);
                else openList();
                break;
            case "Home":
            case "End":
                if (open) {
                    e.preventDefault();
                    const idx = e.key === "Home"
                        ? items.findIndex((o) => !o.disabled)
                        : items.length - 1 - [...items].reverse().findIndex((o) => !o.disabled);
                    setActive(idx);
                }
                break;
            case "Escape":
                setOpen(false);
                break;
            case "Tab":
                setOpen(false);
                break;
        }
    };

    return (
        <div ref={containerRef} className={cn("relative w-full", className)}>
            <button
                type="button"
                id={id}
                role="combobox"
                aria-expanded={open}
                aria-controls={listId}
                aria-activedescendant={open ? `${listId}-${active}` : undefined}
                disabled={disabled}
                onClick={() => (open ? setOpen(false) : openList())}
                onKeyDown={handleKeyDown}
                className={cn(
                    "relative w-full border border-gray-300 bg-white text-left",
                    "focus:outline-none focus:ring-2 focus:ring-red-500",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    s.trigger,
                    triggerClassName
                )}
            >
                <span className={cn("block truncate", !displayLabel && "text-gray-400")}>
                    {displayLabel || placeholder}
                </span>
                <ChevronDown
                    className={cn(
                        "pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-gray-400 transition-transform",
                        open && "rotate-180",
                        s.chevron
                    )}
                />
            </button>

            {open && items.length > 0 && (
                /* Обёртка держит позиционирование: CSS OverlayScrollbars ставит хосту
                   position:relative и перебивал бы absolute — список толкал бы контент. */
                <div className="absolute left-0 right-0 z-30 mt-1">
                <ScrollArea className="max-h-56 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                    <ul role="listbox" id={listId}>
                        {items.map((item, i) => (
                            <li
                                key={`${item.value}-${i}`}
                                id={`${listId}-${i}`}
                                role="option"
                                aria-selected={i === selectedIndex}
                                aria-disabled={item.disabled || undefined}
                                ref={(el) => {
                                    if (i === active) el?.scrollIntoView({block: "nearest"});
                                }}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    commit(i);
                                }}
                                onMouseEnter={() => !item.disabled && setActive(i)}
                                className={cn(
                                    "flex cursor-pointer items-center justify-between gap-2 text-gray-700",
                                    s.option,
                                    i === active && "bg-gray-50",
                                    i === selectedIndex && "font-medium text-red-600",
                                    item.disabled && "cursor-not-allowed text-gray-400"
                                )}
                            >
                                <span className="truncate">{item.label}</span>
                                {i === selectedIndex && <Check className="size-4 shrink-0 text-red-500"/>}
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
                </div>
            )}
        </div>
    );
}


