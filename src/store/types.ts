import type { StateCreator } from "zustand";
import type { Expense, Group, Member, Settlement } from "../types";
import type { ConfirmDialogProps } from "../ui/ConfirmDialog";

export type ModalState =
  | { type: "add-expense"; expenseId?: string }
  | {
      type: "settle-up";
      settlementId?: string;
      prefill?: {
        payerId: string;
        receiverId: string;
        amount: number;
      };
    }
  | { type: "new-group" }
  | { type: "settings" }
  | { type: "group-switcher" };

export type ConfirmDialogState = Omit<ConfirmDialogProps, "isOpen" | "onClose">;

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
  addExpense: (
    groupId: string,
    expense: Omit<Expense, "id" | "date"> & { date?: string },
  ) => void;
  updateExpense: (
    groupId: string,
    expenseId: string,
    updates: Omit<Expense, "id">,
  ) => void;
  deleteExpense: (groupId: string, expenseId: string) => void;
  addSettlement: (
    groupId: string,
    settlement: Omit<Settlement, "id" | "date"> & { date?: string },
  ) => void;
  updateSettlement: (
    groupId: string,
    settlementId: string,
    updates: Omit<Settlement, "id">,
  ) => void;
  deleteSettlement: (groupId: string, settlementId: string) => void;
}

export interface UISlice {
  activeModal: ModalState | null;
  confirmDialog: ConfirmDialogState | null;
  openModal: (modal: ModalState) => void;
  closeModal: () => void;
  openConfirm: (dialog: ConfirmDialogState) => void;
  closeConfirm: () => void;
}

export type RootStore = GroupSlice & TransactionSlice & UISlice;

export type AppSlice<T> = StateCreator<RootStore, [], [], T>;
