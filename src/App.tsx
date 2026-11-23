import { useLedgerStore } from "./store/useLedgerStore";
import { AppShell } from "./ui/AppShell";
import { GroupHeader } from "./features/groups/GroupHeader";
import { SidebarNav } from "./features/groups/SidebarNav";
import { MobileTopBar } from "./features/groups/MobileTopBar";
import { ActivityFeed } from "./features/activity/ActivityFeed";
import { BalancesPanel } from "./features/balances/BalancesPanel";

export default function App() {
  const hasGroups = useLedgerStore((state) => state.groups.length > 0);

  if (!hasGroups) {
    return <p>No groups to display!</p>;
  }

  return (
    <AppShell mobileTopBar={<MobileTopBar />} sidebar={<SidebarNav />}>
      <GroupHeader />
      <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-6 md:gap-4">
        <ActivityFeed />
        <BalancesPanel />
      </div>
    </AppShell>
  );
}
