import type { AppSlice, UISlice } from "../types";

export const createUISlice: AppSlice<UISlice> = (set) => ({
  activeModal: null,
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
});
