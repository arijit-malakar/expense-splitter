import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { RootStore } from "./types";
import { createGroupSlice } from "./slices/groupSlice";
import { createTransactionSlice } from "./slices/transactionSlice";
import { createUISlice } from "./slices/uiSlice";

export const useLedgerStore = create<RootStore>()(
  persist(
    (...a) => ({
      ...createGroupSlice(...a),
      ...createTransactionSlice(...a),
      ...createUISlice(...a),
    }),
    {
      name: "expense-ledger-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        groups: state.groups,
        activeGroupId: state.activeGroupId,
        currentUserId: state.currentUserId,
      }),
    },
  ),
);
