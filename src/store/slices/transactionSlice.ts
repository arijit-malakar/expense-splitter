import type { Expense, Settlement } from "../../types";
import type { AppSlice, TransactionSlice } from "../types";

export const createTransactionSlice: AppSlice<TransactionSlice> = (set) => ({
  addExpense: (groupId, expenseData) => {
    const newExpense: Expense = {
      ...expenseData,
      id: `exp-${Date.now()}`,
      date: expenseData.date ?? new Date().toISOString(),
    };

    set((state) => ({
      groups: state.groups.map((g) =>
        g.id === groupId ? { ...g, expenses: [newExpense, ...g.expenses] } : g,
      ),
    }));
  },

  updateExpense: (groupId, expenseId, updates) => {
    set((state) => ({
      groups: state.groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              expenses: g.expenses.map((e) =>
                e.id === expenseId ? { ...e, ...updates } : e,
              ),
            }
          : g,
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
      date: settlementData.date ?? new Date().toISOString(),
    };

    set((state) => ({
      groups: state.groups.map((g) =>
        g.id === groupId
          ? { ...g, settlements: [newSettlement, ...g.settlements] }
          : g,
      ),
    }));
  },

  updateSettlement: (groupId, settlementId, updates) => {
    set((state) => ({
      groups: state.groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              settlements: g.settlements.map((s) =>
                s.id === settlementId ? { ...s, ...updates } : s,
              ),
            }
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
