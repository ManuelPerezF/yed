"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import { stackCategories } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function SkillsSection() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = listRef.current?.querySelectorAll<HTMLElement>(".stack-row");
    if (!rows?.length) return;
    const ctx = gsap.context(() => {
      rows.forEach((row) => {
        const items = row.querySelectorAll<HTMLElement>(".stack-item");
        gsap.fromTo(
          row,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 88%" },
          },
        );
        gsap.fromTo(
          items,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 85%" },
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section-shell">
      <div className="max-w-3xl">
        <h1 className="display-title">Stack.</h1>
        <p className="body-copy mt-6">
          Herramientas que uso por área: frontend, backend, base de datos y devops.
        </p>
      </div>

      <div ref={listRef} className="mt-16">
        {stackCategories.map((group, index) => (
          <div
            key={group.label}
            className="stack-row grid gap-4 border-t border-[var(--border)] py-8 md:grid-cols-[minmax(0,0.32fr)_minmax(0,1fr)] md:gap-10 md:py-10"
          >
            <div className="flex items-baseline gap-3 md:flex-col md:items-start md:gap-1">
              <span className="text-sm tabular-nums text-[var(--muted)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="text-xl font-medium tracking-tight md:text-2xl">{group.label}</h2>
            </div>

            <ul className="flex flex-wrap items-center gap-x-7 gap-y-4">
              {group.tools.map((tool) => (
                <li
                  key={tool.name}
                  className="stack-item flex items-center gap-2 text-sm text-[oklch(0.94_0.004_290/0.82)] transition-colors duration-300 hover:text-[var(--foreground)]"
                >
                  <Icon icon={tool.icon} className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {tool.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
