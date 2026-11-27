import { useGroupNav, useThemeState } from "../../store/selectors";
import { Logo } from "../../ui/Logo";
import { ThemeSwitcher } from "../../ui/ThemeSwitcher";
import { getMemberNetBalance } from "../../utils/calculations";
import { GroupListItem } from "./GroupListItem";

export function SidebarNav() {
  const { groups, activeGroupId, setActiveGroupId, currentUserId } =
    useGroupNav();
  const { theme, setTheme } = useThemeState();

  return (
    <aside
      className="hidden md:flex flex-col justify-between w-full md:h-screen md:sticky md:top-0 md:w-64 md:self-start xl:w-72 border-b md:border-b-0 md:border-r bg-blue-200/15 border-slate-200 dark:border-slate-800/80 dark:bg-[#070c1e]"
      aria-label="Group navigation"
    >
      <div className="space-y-8 p-4">
        <header className="flex items-center gap-3">
          <Logo />
          <span className="font-semibold text-xl text-slate-800 dark:text-slate-100 tracking-tight">
            Expense Splitter
          </span>
        </header>

        <nav
          className="flex flex-col gap-2"
          aria-labelledby="groups-nav-heading"
        >
          <h2
            className="uppercase text-sm text-slate-600 dark:text-slate-400"
            id="groups-nav-heading"
          >
            Groups
          </h2>
          <ul className="space-y-2 -mx-2">
            {groups.map((group) => (
              <GroupListItem
                key={group.id}
                id={group.id}
                name={group.name}
                isActive={group.id === activeGroupId}
                userBalance={getMemberNetBalance(group, currentUserId)}
                onSelect={setActiveGroupId}
              />
            ))}
          </ul>
        </nav>
      </div>

      <footer className="py-2 px-4 space-y-2 border-t border-slate-200 dark:border-slate-800/80">
        <button className="w-full py-2 px-3 flex items-center gap-2 rounded-lg text-slate-600 transition-colors hover:bg-white/50 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/60 dark:active:bg-slate-800">
          <svg
            className="size-4.5 stroke-[2.5]"
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
          <span className="text-sm">New group</span>
        </button>

        {/* Theme switcher */}
        <div className="flex items-center justify-between px-2">
          <span className="text-xs text-slate-600 dark:text-slate-400">
            Theme
          </span>
          <ThemeSwitcher theme={theme} onChange={setTheme} />
        </div>
      </footer>
    </aside>
  );
}
