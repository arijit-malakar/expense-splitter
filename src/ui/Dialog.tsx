import { useEffect, useId, useRef, type ReactNode } from "react";
import { cx } from "../utils/helpers";
import { Button } from "./Button";

const MODAL_SIZES = {
  sm: "md:max-w-sm",
  md: "md:max-w-lg",
  lg: "md:max-w-2xl",
} as const;

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: keyof typeof MODAL_SIZES;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  size = "md",
  footer,
  children,
  className,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pressedDialogRef = useRef(false);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onPointerDown={(e) => {
        pressedDialogRef.current = e.target === dialogRef.current;
      }}
      onClick={(e) => {
        if (pressedDialogRef.current && e.target === dialogRef.current) {
          onClose();
        }
        pressedDialogRef.current = false;
      }}
      className="fixed inset-0 m-0 p-0 w-full h-full max-w-none max-h-none border-0 bg-transparent open:flex items-end justify-center md:items-center md:p-4 backdrop:bg-slate-950/60 backdrop:backdrop-blur-xs motion-safe:backdrop:transition-opacity backdrop:duration-150 open:backdrop:opacity-100 starting:open:backdrop:opacity-0"
    >
      {isOpen && (
        <div
          className={cx(
            "flex flex-col w-full overflow-hidden bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800/80 shadow-xl dark:shadow-none",
            "max-h-[90dvh] rounded-t-2xl md:max-h-[85vh] md:rounded-2xl",
            MODAL_SIZES[size],
            "motion-safe:transition-[opacity,translate,scale] duration-200 ease-out opacity-100 translate-y-0 starting:opacity-0 starting:translate-y-6 md:starting:translate-y-0 md:starting:scale-95",
            className,
          )}
        >
          {/* Sticky header */}
          <header className="shrink-0 px-5 pt-3 pb-3.5">
            {/* Grab bar - Mobile only */}
            <div
              className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-700 md:hidden"
              aria-hidden="true"
            />
            <div
              className={`flex ${description ? "items-start" : "items-center"} justify-between gap-3`}
            >
              <div className="min-w-0 space-y-0.5">
                <h2 id={titleId} className="text-base font-semibold">
                  {title}
                </h2>
                {description && (
                  <p
                    id={descId}
                    className="text-xs text-slate-500 dark:text-slate-400"
                  >
                    {description}
                  </p>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onClose}
                aria-label="Close dialog"
              >
                <svg
                  className="size-4.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </Button>
            </div>
          </header>

          {/* Scrollable body */}
          <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4">
            {children}
          </div>

          {/* Optional sticky footer */}
          {footer && (
            <footer className="shrink-0 flex items-center justify-end gap-2 px-5 py-3.5">
              {footer}
            </footer>
          )}
        </div>
      )}
    </dialog>
  );
}
