"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillContexts } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function SkillsSection() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const rows = listRef.current?.querySelectorAll<HTMLElement>(".skill-context-row");
    if (!rows?.length) return;
    const ctx = gsap.context(() => {
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -28 },
          {
            opacity: 1,
            x: 0,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 88%" },
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section-shell">
      <div className="max-w-3xl">
        <h1 className="display-title">Stack en proyectos reales.</h1>
        <p className="body-copy mt-6">
          Sin porcentajes autoevaluados. Cada herramienta aparece donde la usé.
        </p>
      </div>

      <ol ref={listRef} className="mt-16 space-y-0">
        {skillContexts.map((block, index) => (
          <li
            key={block.project}
            className="skill-context-row grid gap-6 border-t border-[var(--border)] py-10 md:grid-cols-[minmax(0,0.38fr)_minmax(0,1fr)] md:gap-12"
          >
            <div>
              <p className="text-sm text-[var(--muted)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 text-2xl font-medium tracking-tight md:text-3xl">
                {block.project}
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{block.context}</p>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2 md:mt-0 md:content-start">
              {block.tools.map((tool) => (
                <li
                  key={tool}
                  className="skill-tag px-3 py-1.5 text-sm border border-[var(--border)] text-[oklch(0.94_0.008_280/0.82)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--foreground)]"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
