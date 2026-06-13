"use client";

import { cn } from "@/lib/utils";

type PortfolioBackgroundProps = {
  /** Entry = cinematic landing. Ambient = subtle interior. */
  intensity?: "entry" | "ambient";
  className?: string;
};

export function PortfolioBackground({
  intensity = "ambient",
  className,
}: PortfolioBackgroundProps) {
  return (
    <div
      className={cn(
        "portfolio-bg pointer-events-none",
        intensity === "entry" && "portfolio-bg--entry",
        className,
      )}
      aria-hidden
    >
      <div className="portfolio-bg__base" />
      <div className="portfolio-bg__blob portfolio-bg__blob--1" />
      <div className="portfolio-bg__blob portfolio-bg__blob--2" />
      <div className="portfolio-bg__blob portfolio-bg__blob--3" />
      {intensity === "entry" ? <div className="portfolio-bg__spotlight" /> : null}
      <div className="portfolio-bg__sheen" />
      <div className="portfolio-bg__vignette" />
      <div className="ambient-grain" />
    </div>
  );
}
