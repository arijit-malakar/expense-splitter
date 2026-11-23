import { useActiveGroup } from "../../store/selectors";
import type { Expense, Settlement } from "../../types";
import { Button } from "../../ui/Button";
import { CountPill } from "../../ui/CountPill";
import { ExpenseRow } from "./ExpenseRow";
import { SettlementRow } from "./SettlementRow";

type ActivityItem =
  | ({ type: "expense" } & Expense)
  | ({ type: "settlement" } & Settlement);

const getActivityTimeline = (
  expenses: Expense[],
  settlements: Settlement[],
): ActivityItem[] => {
  const items = [
    ...expenses.map((e) => ({ ...e, type: "expense" as const })),
    ...settlements.map((s) => ({ ...s, type: "settlement" as const })),
  ];
  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

export function ActivityFeed() {
  const activeGroup = useActiveGroup();

  if (!activeGroup) return null;

  const membersMap: Record<string, string> = Object.fromEntries(
    activeGroup.members.map((m) => [m.id, m.name]),
  );

  const timeline = getActivityTimeline(
    activeGroup.expenses,
    activeGroup.settlements,
  );

  return (
    <section
      className="space-y-2.5 order-2 md:order-1 lg:col-span-8 min-w-0"
      aria-labelledby="activity-heading"
    >
      {/* Filters */}
      <div className="hidden md:block">
        <Button variant="ghost" size="sm">
          Filters
        </Button>
      </div>

      {/* Activity: heading and info */}
      <div className="flex justify-between pt-2 md:pt-0">
        <h2 className="text-xl font-semibold" id="activity-heading">
          Activity
        </h2>
        <div className="flex items-center gap-2">
          <CountPill count={activeGroup.expenses.length} label="expense" />
          <CountPill
            count={activeGroup.settlements.length}
            label="settlement"
          />
        </div>
      </div>

      {/* Activity list */}
      {timeline.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No activity yet! Add an expense to get started.
          </p>
        </div>
      ) : (
        <ol
          className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs dark:shadow-none dark:border-slate-800/80 divide-y divide-slate-200 dark:divide-slate-800/60"
          aria-label="Activity timeline"
        >
          {timeline.map((item) =>
            item.type === "expense" ? (
              <ExpenseRow
                key={item.id}
                expense={item}
                groupId={activeGroup.id}
                membersMap={membersMap}
              />
            ) : (
              <SettlementRow
                key={item.id}
                settlement={item}
                groupId={activeGroup.id}
                membersMap={membersMap}
              />
            ),
          )}
        </ol>
      )}
    </section>
  );
}
