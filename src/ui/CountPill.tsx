import { cx } from "../utils/helpers";

const BASE_STYLES =
  "rounded-full font-medium font-mono bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 ring-1 ring-inset ring-slate-900/10 dark:ring-white/10";

const SIZES = {
  md: "px-1.5 py-px sm:px-2 sm:py-0.5 text-[10px] sm:text-xs",
  sm: "px-1.5 py-px text-[10px] leading-tight",
};

interface CountPillProps {
  count: number;
  label: string;
  size?: keyof typeof SIZES;
}

export function CountPill({ count, label, size = "md" }: CountPillProps) {
  if (count === 0) return null;

  const formattedLabel = count === 1 ? label : `${label}s`;
  return (
    <span className={cx(BASE_STYLES, SIZES[size])}>
      {count} {formattedLabel}
    </span>
  );
}
