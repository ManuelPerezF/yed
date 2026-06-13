"use client";

import { cn } from "@/lib/utils";
import { Aurora } from "./aurora";

type PortfolioBackgroundProps = {
  /** Entry = cinematic landing. Ambient = subtle interior. */
  intensity?: "entry" | "ambient";
  className?: string;
};

const ENTRY_COLORS: [string, string, string] = ["#3b0764", "#8b5cf6", "#1e3a8a"];
const AMBIENT_COLORS: [string, string, string] = ["#1e0a4d", "#5b21b6", "#0f1f4a"];

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
      <Aurora
        colorStops={isEntry ? ENTRY_COLORS : AMBIENT_COLORS}
        amplitude={isEntry ? 1.3 : 0.7}
        blend={isEntry ? 0.5 : 0.38}
        speed={isEntry ? 1.0 : 0.6}
      />
      <div className="portfolio-bg__vignette" />
      <div className="ambient-grain" />
    </div>
  );
}
