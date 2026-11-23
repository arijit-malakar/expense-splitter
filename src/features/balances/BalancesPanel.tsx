import { BalanceSummaryCard } from "./BalanceSummaryCard";
import { MemberBalances } from "./MemberBalances";
import { SuggestedSettlements } from "./SuggestedSettlements";

export function BalancesPanel() {
  return (
    <aside
      className="contents md:block md:order-2 md:space-y-3 lg:col-span-4"
      aria-label="Balance details"
    >
      <BalanceSummaryCard />
      <SuggestedSettlements />
      <MemberBalances />
    </aside>
  );
}
