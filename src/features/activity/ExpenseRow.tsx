import { useState } from "react";
import type { Expense, ExpenseCategory } from "../../types";
import { useLedgerStore } from "../../store/useLedgerStore";
import { Avatar } from "../../ui/Avatar";
import { CountPill } from "../../ui/CountPill";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { cx } from "../../utils/helpers";

const CATEGORY_EMOJIS: Record<ExpenseCategory, string> = {
  food: "🍽️",
  transport: "🚗",
  lodging: "🏨",
  entertainment: "🎬",
  shopping: "🛍️",
  utilities: "💡",
  other: "📦",
};

interface ExpenseRowProps {
  expense: Expense;
  groupId: string;
  membersMap: Record<string, string>;
}

export function ExpenseRow({ expense, groupId, membersMap }: ExpenseRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const openConfirm = useLedgerStore((state) => state.openConfirm);
  const deleteExpense = useLedgerStore((state) => state.deleteExpense);

  const payerName = membersMap[expense.paidBy];
  const detailsId = `exp-${expense.id}-details`;

  return (
    <li>
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full flex items-center gap-2.5 xs:gap-3 justify-between p-3 pr-2 xs:p-3.5 xs:pr-2.5 sm:p-4 sm:pr-3 text-left bg-slate-100/75 dark:bg-slate-900/50 transition-colors hover:bg-slate-200/50 dark:hover:bg-slate-800/40"
        aria-expanded={isExpanded}
        aria-controls={detailsId}
      >
        {/* Left: Category, title and metadata */}
        <div className="flex items-center gap-2.5 xs:gap-3 min-w-0">
          <div className="size-8 xs:size-9 sm:size-10 rounded-xl bg-slate-200/80 dark:bg-slate-800 grid place-items-center shrink-0">
            <span>{CATEGORY_EMOJIS[expense.category]}</span>
          </div>
          <div className="min-w-0 space-y-1">
            <p className="text-sm truncate dark:text-slate-100 font-medium">
              {expense.description}
            </p>
            <div className="flex items-center gap-1.25 xs:gap-1.5 sm:gap-2 text-[10px] xs:text-xs">
              <div className="flex items-center gap-1 min-w-0">
                <Avatar
                  name={payerName}
                  seed={expense.paidBy}
                  size="sm"
                  breakpoint="xs"
                />
                <span className="truncate dark:text-slate-400">
                  {payerName}
                </span>
              </div>
              <span className="dark:text-slate-400" aria-hidden="true">
                •
              </span>
              <time
                dateTime={expense.date}
                className="dark:text-slate-400 font-mono shrink-0 tracking-tighter xs:tracking-normal"
              >
                {formatDate(expense.date)}
              </time>
              {expense.splitType !== "equal" && (
                <Badge size="sm">{expense.splitType}</Badge>
              )}
            </div>
          </div>
        </div>

        {/* Right: Amount + Chevron */}
        <div className="flex items-center gap-1.5 xs:gap-2.5 shrink-0">
          <span className="text-sm font-mono dark:text-slate-100 font-semibold">
            {formatCurrency(expense.amount)}
          </span>
          <svg
            className={cx(
              "size-5 shrink-0 text-slate-400 transition-transform duration-200",
              isExpanded && "rotate-180",
            )}
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m6 8 4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* Expanded Split Breakdown */}
      {isExpanded && (
        <div
          id={detailsId}
          className="px-3 xs:px-3.5 sm:px-4 py-3 space-y-3 bg-slate-100/50 dark:bg-slate-900/35 border-t border-slate-200/60 dark:border-slate-800/60"
        >
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>Split breakdown ({expense.splitType})</span>
            <span>{expense.splits.length} participants</span>
          </div>

          <ul className="divide-y divide-slate-200/40 dark:divide-slate-800/40">
            {expense.splits.map((split) => (
              <li
                key={split.memberId}
                className="px-1.5 py-1.25 xs:px-2 xs:py-1.5 flex items-center justify-between gap-3 text-xs transition-colors hover:bg-slate-200/45 dark:hover:bg-slate-800/45"
              >
                <div className="flex items-center gap-2">
                  <Avatar
                    name={membersMap[split.memberId]}
                    seed={split.memberId}
                    size="sm"
                    breakpoint="xs"
                  />
                  <span className="dark:text-slate-200">
                    {membersMap[split.memberId]}
                  </span>
                  {split.shareUnits !== undefined && (
                    <CountPill
                      count={split.shareUnits}
                      label="share"
                      size="sm"
                    />
                  )}
                </div>
                <span className="font-mono font-medium dark:text-slate-200">
                  {formatCurrency(split.owedAmount)}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" size="xs">
              Edit
            </Button>
            <Button
              variant="danger-subtle"
              size="xs"
              onClick={() =>
                openConfirm({
                  title: "Delete expense",
                  message: `Are you sure you want to delete "${expense.description}" (${formatCurrency(expense.amount)})? Member balances will recalculate immediately.`,
                  confirmLabel: "Delete",
                  variant: "danger",
                  onConfirm: () => deleteExpense(groupId, expense.id),
                })
              }
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </li>
  );
}
