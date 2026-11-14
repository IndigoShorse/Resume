/**
 * Кастомный диалог подтверждения вместо нативного `window.confirm()`.
 *
 * Использование:
 *
 *     import { confirmDialog } from "../components/ui";
 *
 *     const ok = await confirmDialog({
 *       title: "Удалить аккаунт?",
 *       description: "Это действие нельзя отменить.",
 *       confirmText: "Удалить",
 *       danger: true,
 *     });
 *     if (ok) { ... }
 *
 * В корне приложения должен быть смонтирован `<ConfirmDialogHost />`.
 */
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "../core/button";
import { Portal } from "./Portal";

export interface ConfirmDialogOptions {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  /** Красная подсветка кнопки подтверждения для деструктивных действий. */
  danger?: boolean;
}

interface PendingConfirm extends ConfirmDialogOptions {
  resolve: (value: boolean) => void;
}

let openConfirmRef: ((opts: PendingConfirm) => void) | null = null;

export function confirmDialog(opts: ConfirmDialogOptions): Promise<boolean> {
  return new Promise((resolve) => {
    if (!openConfirmRef) {
      // Хост ещё не смонтирован (или fallback) — деградируем до системного confirm.
      const ok =
        typeof window !== "undefined"
          ? window.confirm(`${opts.title}${opts.description ? "\n\n" + opts.description : ""}`)
          : false;
      resolve(!!ok);
      return;
    }
    openConfirmRef({ ...opts, resolve });
  });
}

export function ConfirmDialogHost() {
  const [pending, setPending] = useState<PendingConfirm | null>(null);

  useEffect(() => {
    openConfirmRef = (opts) => setPending(opts);
    return () => {
      openConfirmRef = null;
    };
  }, []);

  // Esc → Отмена
  useEffect(() => {
    if (!pending) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        pending.resolve(false);
        setPending(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [pending]);

  return (
    /*
     * Портал в body: #root стоит в position:fixed и образует stacking context,
     * поэтому z-[200] изнутри него проигрывал модалкам, порталированным в body
     * (их z-80 сравнивается с z-0 самого #root, а не с этим оверлеем).
     */
    <Portal>
    <AnimatePresence>
      {pending && (
        <motion.div
          key="confirm-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/55 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label={pending.title}
          onClick={() => {
            pending.resolve(false);
            setPending(null);
          }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 14 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 14 }}
            transition={{ type: "spring", duration: 0.32 }}
            className="relative w-full max-w-sm overflow-hidden rounded-4xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              aria-label="Закрыть"
              variant="ghost"
              size="iconSm"
              onClick={() => {
                pending.resolve(false);
                setPending(null);
              }}
              className="absolute right-3 top-3 z-10 size-9 rounded-full bg-white/85 text-gray-600 shadow hover:bg-white"
            >
              <X className="size-5" />
            </Button>

            <div className="flex flex-col items-center px-6 pb-6 pt-8 text-center">
              <div
                className={`mb-3 flex size-16 items-center justify-center rounded-full ${
                  pending.danger ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                }`}
              >
                <AlertTriangle className="size-8" />
              </div>
              <h3 className="mb-1 text-xl font-bold text-gray-900">{pending.title}</h3>
              {pending.description && (
                <p className="mb-5 text-sm leading-relaxed text-gray-600">{pending.description}</p>
              )}

              <div className="mt-2 flex w-full flex-col gap-2.5">
                <Button
                  autoFocus
                  variant={pending.danger ? "destructive" : "brand"}
                  size="cta"
                  onClick={() => {
                    pending.resolve(true);
                    setPending(null);
                  }}
                  className="w-full"
                >
                  {pending.confirmText || "Подтвердить"}
                </Button>
                <Button
                  variant="outline"
                  size="cta"
                  onClick={() => {
                    pending.resolve(false);
                    setPending(null);
                  }}
                  className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  {pending.cancelText || "Отмена"}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </Portal>
  );
}


