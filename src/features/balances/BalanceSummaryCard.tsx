import { useActiveGroup } from "../../store/selectors";
import { useLedgerStore } from "../../store/useLedgerStore";
import { Button } from "../../ui/Button";
import { getUserBalanceSummary } from "../../utils/calculations";
import { cx } from "../../utils/helpers";
import {
  getBalanceBadgeClass,
  getBalanceTextClass,
} from "../../utils/balanceStyles";
import {
  formatCurrency,
  getBalanceTone,
  type BalanceTone,
} from "../../utils/formatters";

const TONE_CONFIG: Record<
  BalanceTone,
  {
    title: string;
    caption: string;
    icon: string;
    borderClass: string;
  }
> = {
  positive: {
    title: "You are owed",
    caption: "others owe you across this group",
    icon: "↙",
    borderClass: "border-emerald-600/20 dark:border-emerald-500/25",
  },
  negative: {
    title: "You owe",
    caption: "you owe others across this group",
    icon: "↗",
    borderClass: "border-rose-600/20 dark:border-rose-500/25",
  },
  neutral: {
    title: "Settled up",
    caption: "no balance outstanding in this group",
    icon: "✓",
    borderClass: "border-slate-200 dark:border-slate-800/80",
  },
};

export function BalanceSummaryCard() {
  const activeGroup = useActiveGroup();
  const currentUserId = useLedgerStore((state) => state.currentUserId);

  if (!activeGroup) return null;

  const { netBalance, totalPaid, totalShare } = getUserBalanceSummary(
    activeGroup,
    currentUserId,
  );
  const config = TONE_CONFIG[getBalanceTone(netBalance)];

  return (
    <section className="order-1 max-md:space-y-6">
      <div
        className={cx(
          "p-5 lg:p-6 rounded-2xl bg-slate-100/75 dark:bg-slate-900/50 border shadow-sm dark:shadow-none divide-y divide-slate-200 dark:divide-slate-800/60",
          config.borderClass,
        )}
      >
        {/* Balance */}
        <div className="flex gap-4 pb-4">
          <span
            className={cx(
              "size-10 shrink-0 grid place-items-center rounded-xl text-xl",
              getBalanceBadgeClass(netBalance),
            )}
            aria-hidden="true"
          >
            {config.icon}
          </span>

          <div className="flex flex-col gap-1">
            <span className="text-sm dark:text-slate-400 font-semibold">
              {config.title}
            </span>
            <p
              className={cx(
                "text-2xl font-bold font-mono",
                getBalanceTextClass(netBalance),
              )}
            >
              {formatCurrency(netBalance)}
            </p>
            <span className="text-xs dark:text-slate-400">
              {config.caption}
            </span>
          </div>
        </div>

        {/* User stats */}
        <dl className="grid grid-cols-2 pt-4 text-xs">
          <div className="flex flex-col gap-1.5">
            <dt className="dark:text-slate-400">You paid</dt>
            <dd className="dark:text-slate-100 font-semibold font-mono">
              {formatCurrency(totalPaid)}
            </dd>
          </div>
          <div className="flex flex-col gap-1.5 pl-5 lg:pl-6">
            <dt className="dark:text-slate-400">Your share</dt>
            <dd className="dark:text-slate-100 font-semibold font-mono">
              {formatCurrency(totalShare)}
            </dd>
          </div>
        </dl>
      </div>

      {/* Settle up + Filter CTAs (< md) */}
      <div className="flex items-center sm:justify-between md:hidden gap-2.5 w-full">
        <Button variant="primary" size="lg" className="flex-1 sm:flex-initial">
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m8.5 12.5 2 2a1.4 1.4 0 0 0 2 0l4.4-4.4M3.5 8.5l3 3 3.7-3.7a2 2 0 0 1 2.8 0l1 1m6.5-.3-3-3-2 2M7 16l1 1m2-1 1 1m2-1 1 1"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Settle up
        </Button>

        <Button
          variant="secondary"
          size="icon-lg"
          aria-label="Filter transactions"
        >
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 7h9m4 0h3M4 17h3m4 0h9M13 4v6M7 14v6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </Button>
      </div>
    </section>
  );
}
