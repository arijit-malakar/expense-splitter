import type { StateCreator } from "zustand";
import type { Expense, Group, Member, Settlement } from "../types";

export type ModalType =
  | "add-expense"
  | "settle-up"
  | "new-group"
  | "settings"
  | null;

export interface GroupSlice {
  groups: Group[];
  activeGroupId: string | null;
  currentUserId: string;
  setActiveGroupId: (id: string) => void;
  setCurrentUserId: (id: string) => void;
  addGroup: (group: {
    name: string;
    description?: string;
    members: Member[];
  }) => void;
  deleteGroup: (groupId: string) => void;
}

export interface TransactionSlice {
  addExpense: (groupId: string, expense: Omit<Expense, "id" | "date">) => void;
  deleteExpense: (groupId: string, expenseId: string) => void;
  addSettlement: (
    groupId: string,
    settlement: Omit<Settlement, "id" | "date">,
  ) => void;
  deleteSettlement: (groupId: string, settlementId: string) => void;
}

export interface UISlice {
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}

export type RootStore = GroupSlice & TransactionSlice & UISlice;

export type AppSlice<T> = StateCreator<RootStore, [], [], T>;
