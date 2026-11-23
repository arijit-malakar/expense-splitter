import { useActiveGroupMeta } from "../../store/selectors";
import { Avatar } from "../../ui/Avatar";
import { Button } from "../../ui/Button";
import { formatCurrency } from "../../utils/formatters";

export function GroupHeader() {
  const activeGroupMeta = useActiveGroupMeta();

  if (!activeGroupMeta) return null;

  return (
    <header className="space-y-4 pb-6 px-1 md:px-0 md:border-b border-slate-200 dark:border-slate-800/80">
      <div className="flex justify-between pt-2">
        {/* Group title and desc */}
        <div className="space-y-1">
          <h1 className="text-[28px] font-bold">{activeGroupMeta.name}</h1>
          {activeGroupMeta.description && (
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-400">
              {activeGroupMeta.description}
            </p>
          )}
        </div>
        {/* CTA */}
        <div className="flex shrink-0 items-start gap-1.5">
          <div className="hidden md:flex gap-1.5 h-8.5">
            <Button variant="secondary" size="sm">
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
              Settle up
            </Button>
            <Button variant="primary" size="sm">
              <svg
                className="size-4.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add expense
            </Button>
          </div>
          <Button
            variant="secondary"
            size="icon-sm"
            aria-label="Group settings"
          >
            <svg
              className="size-4.5"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9.6 4.2 10.2 2h3.6l.6 2.2 1.7 1 2.2-.6 1.8 3.1-1.6 1.6v2l1.6 1.6-1.8 3.1-2.2-.6-1.7 1-.6 2.2h-3.6l-.6-2.2-1.7-1-2.2.6-1.8-3.1 1.6-1.6v-2L3.9 7.7l1.8-3.1 2.2.6 1.7-1Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="10.3"
                r="2.5"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </Button>
        </div>
      </div>
      {/* Group metadata */}
      <ul
        className="flex flex-wrap items-center gap-x-4 gap-y-3 md:gap-6 md:justify-start text-xs sm:text-sm text-slate-800 dark:text-slate-400"
        aria-label="Group summary"
      >
        <li className="flex gap-1.5 items-center">
          <span aria-hidden="true">💵</span>
          <span className="flex gap-1 items-baseline leading-none">
            <span className="font-mono font-semibold dark:text-slate-100">
              {formatCurrency(activeGroupMeta.totalSpent)}
            </span>
            <span>total spent</span>
          </span>
        </li>

        <li>{activeGroupMeta.expenseCount} expenses</li>

        <li className="flex gap-1.5 items-center">
          <div
            className="flex -space-x-2 *:ring-1 sm:*:ring-2 *:ring-white *:dark:ring-[#070c1e]"
            aria-hidden="true"
          >
            {activeGroupMeta.members.map((member) => (
              <Avatar
                key={member.id}
                name={member.name}
                seed={member.id}
                breakpoint="sm"
              />
            ))}
          </div>
          <span>{activeGroupMeta.members.length} members</span>
        </li>
      </ul>
    </header>
  );
}
