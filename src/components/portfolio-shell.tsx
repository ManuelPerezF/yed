"use client";

import { TopNavBar } from "@/components/top-nav-bar";

type PortfolioShellProps = {
  children: React.ReactNode;
};

export function PortfolioShell({ children }: PortfolioShellProps) {
  return (
    <div className="relative min-h-dvh">
      <div className="portfolio-shell-content">{children}</div>
    </div>
  );
}
