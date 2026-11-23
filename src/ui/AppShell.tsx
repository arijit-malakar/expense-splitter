import type { ReactNode } from "react";

interface AppShellProps {
  mobileTopBar: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
}

export function AppShell({ mobileTopBar, sidebar, children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {mobileTopBar}
      {sidebar}
      <main className="p-4 flex-1 flex flex-col md:gap-4 min-w-0">
        {children}
      </main>
    </div>
  );
}
