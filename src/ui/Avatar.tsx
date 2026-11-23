import { cx } from "../utils/helpers";

const AVATAR_PALETTE = [
  "bg-violet-500",
  "bg-sky-500",
  "bg-amber-500",
  "bg-teal-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-emerald-500",
  "bg-indigo-500",
  "bg-orange-500",
  "bg-rose-500",
] as const;

const getAvatarColor = (seed: string): string => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (31 * hash + seed.charCodeAt(i)) >>> 0;
  }
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
};

const getInitials = (name?: string): string => {
  const parts =
    name
      ?.trim()
      .split(/[\s-]+/)
      .filter(Boolean) ?? [];
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const BASE_STYLES =
  "grid place-items-center shrink-0 rounded-full leading-none font-semibold font-mono text-slate-900";

const SIZES = {
  sm: {
    none: "size-5 text-[10px] tracking-tighter",
    xs: "size-4.5 xs:size-5 text-[8px] xs:text-[10px] tracking-tighter",
    sm: "size-4.5 sm:size-5 text-[8px] sm:text-[10px] tracking-tighter",
  },
  md: {
    none: "size-7 text-xs",
    xs: "size-6 xs:size-7 text-[10px] xs:text-xs",
    sm: "size-6 sm:size-7 text-[10px] sm:text-xs",
  },
  lg: {
    none: "size-8 text-xs",
    xs: "size-7 xs:size-8 text-xs",
    sm: "size-7 sm:size-8 text-xs",
  },
} as const;

interface AvatarProps {
  name?: string;
  seed?: string;
  initials?: string;
  colorClass?: string;
  size?: keyof typeof SIZES;
  breakpoint?: "none" | "xs" | "sm";
  className?: string;
}

export function Avatar({
  name,
  seed,
  initials,
  colorClass,
  size = "md",
  breakpoint = "none",
  className = "",
}: AvatarProps) {
  const displayInitials = initials ?? getInitials(name);
  const displayColorClass =
    colorClass ?? getAvatarColor(seed ?? name ?? displayInitials);

  return (
    <span
      className={cx(
        BASE_STYLES,
        SIZES[size][breakpoint],
        displayColorClass,
        className,
      )}
    >
      {displayInitials}
    </span>
  );
}
