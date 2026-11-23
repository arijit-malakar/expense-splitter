import type { Expense, Settlement } from "../../types";
import type { AppSlice, TransactionSlice } from "../types";

export const createTransactionSlice: AppSlice<TransactionSlice> = (set) => ({
  addExpense: (groupId, expenseData) => {
    const newExpense: Expense = {
      ...expenseData,
      id: `exp-${Date.now()}`,
      date: new Date().toISOString(),
    };

    set((state) => ({
      groups: state.groups.map((g) =>
        g.id === groupId ? { ...g, expenses: [newExpense, ...g.expenses] } : g,
      ),
    }));
  },

  deleteExpense: (groupId, expenseId) => {
    set((state) => ({
      groups: state.groups.map((g) =>
        g.id === groupId
          ? { ...g, expenses: g.expenses.filter((e) => e.id !== expenseId) }
          : g,
      ),
    }));
  },

  addSettlement: (groupId, settlementData) => {
    const newSettlement: Settlement = {
      ...settlementData,
      id: `set-${Date.now()}`,
      date: new Date().toISOString(),
    };

    set((state) => ({
      groups: state.groups.map((g) =>
        g.id === groupId
          ? { ...g, settlements: [newSettlement, ...g.settlements] }
          : g,
      ),
    }));
  },

  deleteSettlement: (groupId, settlementId) => {
    set((state) => ({
      groups: state.groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              settlements: g.settlements.filter((s) => s.id !== settlementId),
            }
          : g,
      ),
    }));
  },
});
