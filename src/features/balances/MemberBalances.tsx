import { useActiveGroup } from "../../store/selectors";
import { Avatar } from "../../ui/Avatar";
import { getGroupNetBalances } from "../../utils/calculations";
import { getBalanceTextClass } from "../../utils/balanceStyles";
import {
  formatSignedBalance,
  getBalanceTone,
  type BalanceTone,
} from "../../utils/formatters";
import { cx } from "../../utils/helpers";

const INDICATOR_CONFIG: Record<
  BalanceTone,
  { arrow?: string; srText: string }
> = {
  positive: {
    arrow: "↙",
    srText: "is owed",
  },
  negative: {
    arrow: "↗",
    srText: "owes",
  },
  neutral: {
    srText: "settled",
  },
};

export function MemberBalances() {
  const activeGroup = useActiveGroup();

  if (!activeGroup) return null;

  const balances = getGroupNetBalances(activeGroup);

  return (
    <section
      className="order-4 space-y-4 md:space-y-0 md:rounded-2xl md:px-4 md:py-3 md:bg-slate-100/75 md:dark:bg-slate-900/50 md:border md:divide-y md:divide-slate-200 md:border-slate-200 md:shadow-sm md:dark:shadow-none md:dark:border-slate-800/80 md:dark:divide-slate-800/60"
      aria-labelledby="member-balances-heading"
    >
      <h2
        className="text-xl md:text-sm font-semibold px-1 pt-2 md:pt-0 md:px-0 md:pb-2.5"
        id="member-balances-heading"
      >
        Member balances
      </h2>
      <ul className="md:pt-2 grid grid-cols-2 md:grid-cols-1 gap-2.5">
        {activeGroup.members.map((member) => {
          const balance = balances[member.id];
          const { arrow, srText } = INDICATOR_CONFIG[getBalanceTone(balance)];
          return (
            <li
              key={member.id}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between max-md:rounded-[14px] max-md:p-3.5 max-md:bg-slate-100/75 max-md:dark:bg-slate-900/50 max-md:border max-md:border-slate-200 max-md:shadow-xs max-md:dark:shadow-none max-md:dark:border-slate-800/80"
            >
              {/* Left: Avatar + Name */}
              <div className="flex gap-2.5 items-center">
                <Avatar name={member.name} seed={member.id} />
                <span className="min-w-0 text-xs font-medium dark:text-slate-100 md:dark:text-slate-400">
                  {member.name}
                </span>
              </div>

              {/* Right: Arrow + Signed balance */}
              <div
                className={cx(
                  "text-xs space-x-2 font-semibold",
                  getBalanceTextClass(balance),
                )}
              >
                {arrow && <span aria-hidden="true">{arrow}</span>}
                <span className="sr-only">{srText}</span>
                <span className="font-mono">
                  {formatSignedBalance(balance)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
