import { getBalanceTone, type BalanceTone } from "./formatters";
import { cx } from "./helpers";

const BALANCE_TEXT_CLASSES: Record<BalanceTone, string> = {
  positive: "text-emerald-600 dark:text-emerald-400",
  negative: "text-rose-600 dark:text-rose-400",
  neutral: "text-slate-400 dark:text-slate-500",
};

const BALANCE_BG_CLASSES: Record<BalanceTone, string> = {
  positive: "bg-emerald-200/40 dark:bg-emerald-500/10",
  negative: "bg-rose-200/40 dark:bg-rose-500/10",
  neutral: "bg-slate-200/50 dark:bg-slate-500/10",
};

export const getBalanceTextClass = (amount: number): string =>
  BALANCE_TEXT_CLASSES[getBalanceTone(amount)];

export const getBalanceBadgeClass = (amount: number): string => {
  const tone = getBalanceTone(amount);
  return cx(BALANCE_BG_CLASSES[tone], BALANCE_TEXT_CLASSES[tone]);
};
