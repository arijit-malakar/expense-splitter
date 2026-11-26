import { useState } from "react";
import type { Settlement } from "../../types";
import { useLedgerStore } from "../../store/useLedgerStore";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { cx } from "../../utils/helpers";

interface SettlementRowProps {
  settlement: Settlement;
  groupId: string;
  membersMap: Record<string, string>;
}

export function SettlementRow({
  settlement,
  groupId,
  membersMap,
}: SettlementRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const openConfirm = useLedgerStore((state) => state.openConfirm);
  const deleteSettlement = useLedgerStore((state) => state.deleteSettlement);

  const payerName = membersMap[settlement.payerId];
  const receiverName = membersMap[settlement.receiverId];
  const detailsId = `set-${settlement.id}-details`;

  return (
    <li>
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full flex items-center gap-2.5 xs:gap-3 justify-between p-3 pr-2 xs:p-3.5 xs:pr-2.5 sm:p-4 sm:pr-3 text-left bg-emerald-100/30 dark:bg-emerald-950/30 transition-colors hover:bg-emerald-100/50 dark:hover:bg-emerald-950/45"
        aria-expanded={isExpanded}
        aria-controls={detailsId}
      >
        {/* Left: Category, title and metadata */}
        <div className="flex items-center gap-2.5 xs:gap-3 min-w-0">
          <div className="size-8 xs:size-9 sm:size-10 rounded-xl bg-emerald-200/40 dark:bg-emerald-500/10 grid place-items-center shrink-0">
            <span>🤝</span>
          </div>
          <div className="min-w-0 space-y-1">
            <p className="text-sm truncate dark:text-slate-400">
              <strong className="dark:text-slate-100 font-semibold">
                {payerName}
              </strong>
              {" paid "}
              <strong className="dark:text-slate-100 font-semibold">
                {receiverName}
              </strong>
            </p>
            <div className="flex items-center gap-1.25 xs:gap-1.5 sm:gap-2 text-[10px] xs:text-xs">
              <Badge variant="emerald" className="mt-px xs:mt-0.5 sm:mt-0">
                Settlement
              </Badge>
              <span className="dark:text-slate-400" aria-hidden="true">
                •
              </span>
              <time
                dateTime={settlement.date}
                className="dark:text-slate-400 font-mono shrink-0 tracking-tighter xs:tracking-normal"
              >
                {formatDate(settlement.date)}
              </time>
            </div>
          </div>
        </div>

        {/* Right: Amount + Chevron */}
        <div className="flex items-center gap-1.5 xs:gap-3 shrink-0">
          <span className="text-sm font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            {formatCurrency(settlement.amount)}
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

      {/* Expanded settlement breakdown */}
      {isExpanded && (
        <div
          id={detailsId}
          className="px-4 py-3 space-y-2.5 bg-emerald-100/20 dark:bg-emerald-950/20 border-t border-slate-200/60 dark:border-slate-800/60"
        >
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Recorded direct payment to clear outstanding balance between{" "}
            <strong>{payerName}</strong> and <strong>{receiverName}</strong>.
          </p>

          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="xs">
              Edit
            </Button>
            <Button
              variant="danger-subtle"
              size="xs"
              onClick={() =>
                openConfirm({
                  title: "Delete settlement",
                  message: `Are you sure you want to delete the payment of ${formatCurrency(settlement.amount)} from ${payerName} to ${receiverName}?`,
                  confirmLabel: "Delete",
                  variant: "danger",
                  onConfirm: () => deleteSettlement(groupId, settlement.id),
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
