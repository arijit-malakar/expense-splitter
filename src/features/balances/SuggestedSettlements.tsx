import { useActiveGroup } from "../../store/selectors";
import { useLedgerStore } from "../../store/useLedgerStore";
import { Avatar } from "../../ui/Avatar";
import { Button } from "../../ui/Button";
import { simplifyDebts } from "../../utils/calculations";
import { formatCurrency } from "../../utils/formatters";

export function SuggestedSettlements() {
  const activeGroup = useActiveGroup();
  const currentUserId = useLedgerStore((state) => state.currentUserId);

  if (!activeGroup) return null;

  const transactions = simplifyDebts(activeGroup);

  const userTransactions = transactions.filter(
    (tx) => tx.payerId === currentUserId || tx.receiverId === currentUserId,
  );
  const otherTransactions = transactions.filter(
    (tx) => tx.payerId !== currentUserId && tx.receiverId !== currentUserId,
  );

  return (
    <section
      className="order-3 space-y-4 md:space-y-0 md:rounded-2xl md:bg-slate-100/75 md:dark:bg-slate-900/50 md:border md:border-slate-200 md:shadow-sm md:dark:shadow-none md:dark:border-slate-800/80 md:divide-y md:divide-slate-200 md:dark:divide-slate-800/60"
      aria-labelledby="suggested-settlements-heading"
    >
      {/* Heading */}
      <header className="px-1 pt-2 md:px-4 md:py-3 space-y-1 md:space-y-0">
        <h2
          className="text-xl md:text-sm font-semibold"
          id="suggested-settlements-heading"
        >
          Suggested settlements
        </h2>
        <p className="text-xs dark:text-slate-400">
          A minimal set of payments to square everyone up.
        </p>
      </header>

      {/* Card (below md) */}
      <div className="rounded-2xl bg-slate-100/75 dark:bg-slate-900/75 border border-slate-200 shadow-sm dark:shadow-none dark:border-slate-800/80 divide-y divide-slate-200 dark:divide-slate-800/60 md:contents">
        {transactions.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400">
            All settled up! No payments needed.
          </div>
        ) : (
          <>
            {/* Settlement owed */}
            {userTransactions.map((tx) => {
              const isOwed = tx.receiverId === currentUserId;
              const otherPartyId = isOwed ? tx.payerId : tx.receiverId;
              const otherPartyName = isOwed ? tx.payerName : tx.receiverName;

              return (
                <div
                  key={`${tx.payerId}-${tx.receiverId}`}
                  className="px-4 py-3 flex items-center gap-3"
                >
                  <div className="shrink-0 self-start">
                    <Avatar
                      name={otherPartyName}
                      seed={otherPartyId}
                      size="lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1 lg:space-y-2.5">
                    <p className="text-sm">
                      {isOwed
                        ? `${otherPartyName} owes you`
                        : `You owe ${otherPartyName}`}
                    </p>
                    <div
                      className={`flex items-center justify-between gap-3 text-xs font-semibold ${isOwed ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                    >
                      <div className="space-x-1.5">
                        <span aria-hidden="true">{isOwed ? "↙" : "↗"}</span>
                        <span className="font-mono">
                          {isOwed ? "+" : "-"}
                          {formatCurrency(tx.amount)}
                        </span>
                      </div>
                      <Button
                        variant="secondary"
                        size="xs"
                        aria-label={`Record payment ${isOwed ? "from" : "to"} ${otherPartyName}`}
                      >
                        <svg
                          className="size-4.5"
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
                        Record
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Others' settlements */}
            {otherTransactions.length > 0 &&
              otherTransactions.map((tx, index) => (
                <div
                  key={`${tx.payerId}-${tx.receiverId}`}
                  className="px-4 py-3 flex flex-col gap-2"
                >
                  {index === 0 && (
                    <h3 className="uppercase text-xs font-medium dark:text-slate-400">
                      Others in this group
                    </h3>
                  )}
                  <div className="flex items-center gap-2 text-xs dark:text-slate-400">
                    <Avatar name={tx.payerName} seed={tx.payerId} />
                    <span className="min-w-0 truncate">{tx.payerName}</span>

                    <span
                      className="text-sm font-medium shrink-0"
                      aria-hidden="true"
                    >
                      →
                    </span>
                    <span className="sr-only">owes</span>

                    <Avatar name={tx.receiverName} seed={tx.receiverId} />
                    <span className="min-w-0 truncate">{tx.receiverName}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold font-mono">
                      {formatCurrency(tx.amount)}
                    </span>
                    <Button
                      variant="outline"
                      size="xs"
                      aria-label={`Settle debt from ${tx.payerName} to ${tx.receiverName}`}
                    >
                      Settle
                    </Button>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </section>
  );
}
