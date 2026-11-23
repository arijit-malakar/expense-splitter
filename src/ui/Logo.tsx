export function Logo() {
  return (
    <div className="size-8.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 grid place-items-center shadow-xs" role="img" aria-label="Expense Splitter logo">
      <svg
        className="size-4.5 stroke-2 fill-current stroke-current"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Source root node */}
        <circle cx="5" cy="12" r="2" />

        {/* Upper smooth branch and recipient node */}
        <path d="M7 12c3.5 0 5 -5.5 8.5 -5.5" className="fill-none" />
        <circle cx="18" cy="6.5" r="2" />

        {/* Lower smooth branch and recipient node */}
        <path d="M7 12c3.5 0 5 5.5 8.5 5.5" className="fill-none" />
        <circle cx="18" cy="17.5" r="2" />
      </svg>
    </div>
  );
};
