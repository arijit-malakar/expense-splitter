import { cx } from "../utils/helpers";

const BASE_STYLES = "text-[10px] xs:text-xs rounded-sm font-mono";

const VARIANTS = {
  neutral:
    "bg-slate-300/50 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  emerald:
    "bg-emerald-300/40 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400",
};

const SIZES = {
  md: "px-1.5 py-px sm:px-2 sm:py-0.5",
  sm: "px-1 py-px sm:px-1.5 sm:py-0.5 leading-tight",
};

interface BadgeProps {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "neutral",
  size = "md",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={cx(BASE_STYLES, VARIANTS[variant], SIZES[size], className)}
    >
      {children}
    </span>
  );
}
