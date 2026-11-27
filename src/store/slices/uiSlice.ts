import type { Theme } from "../../ui/ThemeSwitcher";
import type { AppSlice, UISlice } from "../types";

const THEME_STORAGE_KEY = "theme";
const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";

const isValidTheme = (value: string | null): value is Theme =>
  value === "light" || value === "dark" || value === "system";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "system";
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return isValidTheme(saved) ? saved : "system";
};

const setDarkClass = (isDark: boolean) => {
  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(`
        *, *::before, *::after {
            transition: none !important;
        }
    `),
  );
  document.head.appendChild(css);

  document.documentElement.classList.toggle("dark", isDark);

  void window.getComputedStyle(document.body).opacity;

  requestAnimationFrame(() => {
    document.head.removeChild(css);
  });
};

const darkMediaQuery =
  typeof window !== "undefined" ? window.matchMedia(DARK_MEDIA_QUERY) : null;

const applyTheme = (theme: Theme) => {
  const isDark =
    theme === "dark" ||
    (theme === "system" && (darkMediaQuery?.matches ?? false));
  setDarkClass(isDark);
};

export const createUISlice: AppSlice<UISlice> = (set, get) => {
  darkMediaQuery?.addEventListener("change", () => {
    if (get().theme === "system") {
      applyTheme("system");
    }
  });

  return {
    activeModal: null,
    confirmDialog: null,
    theme: getInitialTheme(),
    openModal: (modal) => set({ activeModal: modal }),
    closeModal: () => set({ activeModal: null }),
    openConfirm: (dialog) => set({ confirmDialog: dialog }),
    closeConfirm: () => set({ confirmDialog: null }),
    setTheme: (theme) => {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      applyTheme(theme);
      set({ theme });
    },
  };
};
