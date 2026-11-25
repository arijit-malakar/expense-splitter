import type { AppSlice, UISlice } from "../types";

export const createUISlice: AppSlice<UISlice> = (set) => ({
  activeModal: null,
  confirmDialog: null,
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
  openConfirm: (dialog) => set({ confirmDialog: dialog }),
  closeConfirm: () => set({ confirmDialog: null }),
});
