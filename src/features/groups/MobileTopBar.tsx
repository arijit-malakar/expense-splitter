import { useLedgerStore } from "../../store/useLedgerStore";
import { Button } from "../../ui/Button";
import { Logo } from "../../ui/Logo";

export function MobileTopBar() {
  const groups = useLedgerStore((state) => state.groups);
  const activeGroupId = useLedgerStore((state) => state.activeGroupId);

  const activeGroup =
    groups.find((group) => group.id === activeGroupId) || groups[0];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between md:hidden h-14 w-full px-3 backdrop-blur-md border-b border-slate-200 bg-white/90 dark:border-slate-800/80 dark:bg-[#070c1e]/90">
      <Logo />

      <button
        type="button"
        aria-haspopup="dialog"
        className="flex items-center gap-2 rounded-full py-1.5 pl-3.5 pr-2.5 text-sm font-medium shadow-sm transition border border-slate-200 bg-slate-100/80 hover:bg-slate-200/60 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:bg-slate-800 active:scale-98"
      >
        <span className="min-w-0 max-w-31.5 truncate text-slate-800 dark:text-slate-200">
          {activeGroup.name}
        </span>
        <span className="rounded-full px-2 py-1 font-mono text-[11px] font-semibold bg-emerald-200/40 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          +$216.47
        </span>
        <svg
          className="size-4 shrink-0 text-slate-400"
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
      </button>

      <Button
        variant="primary"
        size="icon-sm"
        shape="pill"
        aria-label="Add expense"
      >
        <svg
          className="size-4.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </Button>
    </header>
  );
}
