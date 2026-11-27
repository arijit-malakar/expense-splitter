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

export const useGroupNav = () =>
  useLedgerStore(
    useShallow((state) => ({
      groups: state.groups,
      activeGroupId: state.activeGroupId,
      currentUserId: state.currentUserId,
      setActiveGroupId: state.setActiveGroupId,
    })),
  );

export const useThemeState = () =>
  useLedgerStore(
    useShallow((state) => ({
      theme: state.theme,
      setTheme: state.setTheme,
    })),
  );

export const useModalActions = () =>
  useLedgerStore(
    useShallow((state) => ({
      openModal: state.openModal,
      closeModal: state.closeModal,
    })),
  );
