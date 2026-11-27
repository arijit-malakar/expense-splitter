export type Theme = "light" | "dark" | "system";

interface ThemeSwitcherProps {
  theme: Theme;
  onChange: (theme: Theme) => void;
}

export function ThemeSwitcher({ theme, onChange }: ThemeSwitcherProps) {
  return (
    <div
      role="radiogroup"
      className="grid grid-cols-3 p-1 rounded-full bg-slate-200/50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80"
      aria-label="Theme selector"
    >
      <button
        type="button"
        role="radio"
        aria-label="System theme"
        aria-checked={theme === "system"}
        onClick={() => onChange("system")}
        className={`rounded-full p-1.5 transition-colors ${theme === "system" ? "text-slate-900 bg-white dark:text-slate-100 dark:bg-blue-500/20" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"}`}
      >
        <svg
          className="size-4.5"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="3.5"
            y="4.5"
            width="17"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="M9 20h6m-3-3.5V20"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <button
        type="button"
        role="radio"
        aria-label="Light theme"
        aria-checked={theme === "light"}
        onClick={() => onChange("light")}
        className={`rounded-full p-1.5 transition-colors ${theme === "light" ? "text-slate-900 bg-white" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"}`}
      >
        <svg
          className="size-4.5"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="3.5"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {/* Selected button */}
      <button
        type="button"
        role="radio"
        aria-label="Dark theme"
        aria-checked={theme === "dark"}
        onClick={() => onChange("dark")}
        className={`rounded-full p-1.5 transition-colors ${theme === "dark" ? "dark:text-slate-100 dark:bg-blue-500/20" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"}`}
      >
        <svg
          className="size-4.5"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M19.5 15.2A8 8 0 0 1 8.8 4.5 8 8 0 1 0 19.5 15.2Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
