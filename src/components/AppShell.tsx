import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
  bottomAction?: ReactNode;
  tone?: "ivory" | "lavender" | "blue";
};

export function AppShell({ children, bottomAction, tone = "ivory" }: AppShellProps) {
  return (
    <main className={`app-shell app-shell--${tone}`}>
      <section className="screen">{children}</section>
      {bottomAction ? <footer className="bottom-action">{bottomAction}</footer> : null}
    </main>
  );
}
