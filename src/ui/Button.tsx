import { cx } from "../utils/helpers";

const BASE_STYLES =
  "inline-flex items-center justify-center font-medium select-none transition duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:shrink-0";

const VARIANTS = {
  primary:
    "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 motion-safe:active:scale-98 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:active:bg-slate-200 shadow-xs dark:shadow-none",
  secondary:
    "bg-white text-slate-700 border border-slate-200/90 shadow-xs hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 motion-safe:active:scale-98 dark:bg-slate-800/80 dark:text-slate-200 dark:border-transparent dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/20 dark:hover:bg-slate-700/80 dark:hover:text-white dark:hover:ring-white/35 dark:active:bg-slate-800",
  outline:
    "text-slate-700 border border-slate-300/80 hover:bg-slate-200/60 hover:text-slate-900 active:bg-slate-200 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800/80 dark:hover:text-slate-200 dark:active:bg-slate-800",
  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200 dark:active:bg-slate-800",
  danger:
    "bg-rose-600 text-white shadow-xs hover:bg-rose-700 active:bg-rose-800 dark:bg-rose-500 dark:hover:bg-rose-400 dark:shadow-none",
  "danger-subtle":
    "bg-rose-50 text-rose-600 border border-rose-300/70 hover:bg-rose-100 hover:text-rose-700 active:bg-rose-200/80 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30 dark:hover:bg-rose-500/20 dark:hover:text-rose-300 dark:active:bg-rose-500/30",
} as const;

const SIZES = {
  xs: "py-1 px-2.5 text-xs gap-1",
  sm: "py-1.5 px-3 text-xs gap-1.5",
  md: "py-2 px-3.5 text-sm gap-2",
  lg: "py-2.5 px-5 text-sm gap-2",
  "icon-sm": "size-8.5",
  "icon-lg": "size-10",
} as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  shape?: "rounded" | "pill";
}

export function Button({
  variant = "primary",
  size = "md",
  shape = "rounded",
  type = "button",
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  const shapeClass =
    shape === "pill"
      ? "rounded-full"
      : size === "lg" || size === "icon-lg"
        ? "rounded-xl"
        : "rounded-lg";

  return (
    <button
      type={type}
      disabled={disabled}
      className={cx(
        BASE_STYLES,
        VARIANTS[variant],
        SIZES[size],
        shapeClass,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
