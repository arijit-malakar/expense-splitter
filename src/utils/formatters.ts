export type BalanceTone = "positive" | "negative" | "neutral";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatCurrency = (amount: number): string =>
  usdFormatter.format(Math.abs(amount));

export const formatSignedBalance = (amount: number): string =>
  amount > 0
    ? `+${formatCurrency(amount)}`
    : amount < 0
      ? `-${formatCurrency(amount)}`
      : formatCurrency(amount);

export const getBalanceTone = (amount: number): BalanceTone =>
  amount > 0 ? "positive" : amount < 0 ? "negative" : "neutral";

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
