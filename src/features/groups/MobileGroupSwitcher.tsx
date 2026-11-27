import { useEffect } from "react";
import {
  useGroupNav,
  useModalActions,
  useThemeState,
} from "../../store/selectors";
import { useLedgerStore } from "../../store/useLedgerStore";
import { GroupListItem } from "./GroupListItem";
import { Dialog } from "../../ui/Dialog";
import { Button } from "../../ui/Button";
import { ThemeSwitcher } from "../../ui/ThemeSwitcher";
import { getMemberNetBalance } from "../../utils/calculations";

export function MobileGroupSwitcher() {
  const { groups, activeGroupId, setActiveGroupId, currentUserId } =
    useGroupNav();
  const { theme, setTheme } = useThemeState();
  const { closeModal } = useModalActions();
  const isOpen = useLedgerStore(
    (state) => state.activeModal?.type === "group-switcher",
  );

  useEffect(() => {
    if (!isOpen) return;

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    if (mediaQuery.matches) {
      closeModal();
      return;
    }

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        closeModal();
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [isOpen, closeModal]);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={closeModal}
      title="Groups"
      description="Switch active group or adjust theme"
      footer={
        <div className="w-full space-y-2.5">
          <Button variant="secondary" className="w-full">
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
            New group
          </Button>

          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Theme
            </span>
            <ThemeSwitcher theme={theme} onChange={setTheme} />
          </div>
        </div>
      }
    >
      <nav aria-label="Groups">
        <ul className="space-y-2 -mx-2">
          {groups.map((group) => (
            <GroupListItem
              key={group.id}
              id={group.id}
              name={group.name}
              isActive={group.id === activeGroupId}
              userBalance={getMemberNetBalance(group, currentUserId)}
              onSelect={(id) => {
                setActiveGroupId(id);
                closeModal();
              }}
            />
          ))}
        </ul>
      </nav>
    </Dialog>
  );
}
