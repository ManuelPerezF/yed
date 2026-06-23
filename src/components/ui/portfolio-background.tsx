"use client";

import { cn } from "@/lib/utils";
import { Aurora } from "./aurora";

type PortfolioBackgroundProps = {
  /** Entry = cinematic landing. Ambient = subtle interior. */
  intensity?: "entry" | "ambient";
  className?: string;
};

const ENTRY_COLORS: [string, string, string] = ["#7c3aed", "#c026d3", "#f59e0b"];
const AMBIENT_COLORS: [string, string, string] = ["#5b21b6", "#9d174d", "#b45309"];

export function PortfolioBackground({
  intensity = "ambient",
  className,
}: PortfolioBackgroundProps) {
  const isEntry = intensity === "entry";

  return (
    <div
      className={cn("portfolio-bg pointer-events-none", className)}
      aria-hidden
    >
      <div
        className={cn(
          "portfolio-bg__aurora",
          isEntry && "portfolio-bg__aurora--entry",
        )}
      >
        <Aurora
          colorStops={isEntry ? ENTRY_COLORS : AMBIENT_COLORS}
          amplitude={isEntry ? 1.8 : 1.0}
          blend={isEntry ? 0.22 : 0.18}
          speed={isEntry ? 1.8 : 1.0}
        />
      </div>
      <div className="portfolio-bg__vignette" />
      <div className="ambient-grain" />
    </div>
  );
}
