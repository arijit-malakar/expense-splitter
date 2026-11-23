import { useShallow } from "zustand/shallow";
import { useLedgerStore } from "./useLedgerStore";

export const useActiveGroup = () =>
  useLedgerStore((state) =>
    state.groups.find((g) => g.id === state.activeGroupId),
  );

export const useActiveGroupMeta = () =>
  useLedgerStore(
    useShallow((state) => {
      const group = state.groups.find((g) => g.id === state.activeGroupId);
      if (!group) return null;

      const totalSpent = group.expenses.reduce((sum, e) => sum + e.amount, 0);

      return {
        id: group.id,
        name: group.name,
        description: group.description,
        totalSpent,
        expenseCount: group.expenses.length,
        members: group.members,
      };
    }),
  );
