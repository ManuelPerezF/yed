"use client";

import { cn } from "@/lib/utils";
import AnimatedGradientBackground from "./animated-gradient-background";

type PortfolioBackgroundProps = {
  /** Entry = cinematic landing. Ambient = subtle interior. */
  intensity?: "entry" | "ambient";
  className?: string;
};

const ENTRY_GRADIENT = ["#0A0A0A", "#7c3aed", "#c026d3", "#f59e0b"];
const ENTRY_STOPS = [30, 55, 75, 100];

const AMBIENT_GRADIENT = ["#0A0A0A", "#5b21b6", "#9d174d", "#b45309"];
const AMBIENT_STOPS = [25, 50, 75, 100];

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
          isEntry ? "portfolio-bg__aurora--entry" : "portfolio-bg__aurora--ambient",
        )}
      >
        <AnimatedGradientBackground
          startingGap={isEntry ? 90 : 115}
          Breathing
          gradientColors={isEntry ? ENTRY_GRADIENT : AMBIENT_GRADIENT}
          gradientStops={isEntry ? ENTRY_STOPS : AMBIENT_STOPS}
          animationSpeed={isEntry ? 0.025 : 0.015}
          breathingRange={isEntry ? 8 : 5}
          topOffset={isEntry ? 0 : 0}
        />
      </div>
      <div
        className={cn("portfolio-bg__vignette", !isEntry && "portfolio-bg__vignette--ambient")}
      />
      <div className="ambient-grain" />
    </div>
  );
}
