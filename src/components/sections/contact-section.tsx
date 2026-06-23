"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SectionId } from "@/types/portfolio";
import { person, sectionLabels } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

type ContactSectionProps = {
  onNavigate: (section: SectionId) => void;
};

export function ContactSection({ onNavigate }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctaButtons = ctaWrapRef.current?.querySelectorAll<HTMLElement>("a");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set(
        [
          eyebrowRef.current,
          headlineRef.current,
          bodyRef.current,
          ctaButtons ?? [],
          navRef.current,
          locationRef.current,
        ],
        { opacity: 1, x: 0, y: 0 },
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(eyebrowRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 })
        .fromTo(
          headlineRef.current,
          { opacity: 0, x: -28 },
          { opacity: 1, x: 0, duration: 0.7 },
          "-=0.15",
        )
        .fromTo(bodyRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
        .fromTo(
          ctaButtons ?? [],
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
          "-=0.25",
        )
        .fromTo(navRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.1")
        .fromTo(locationRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-shell">
      <div>
        <p
          ref={eyebrowRef}
          className="text-sm text-[var(--muted)] mb-8 tracking-widest uppercase"
        >
          Disponible para colaboración
        </p>
        <h1 ref={headlineRef} className="contact-headline">
          Hablemos.
        </h1>
        <p ref={bodyRef} className="body-copy mt-8 max-w-md text-lg">
          Hackathons, proyectos académicos o ideas de producto.
        </p>

        <div ref={ctaWrapRef} className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a href={`mailto:${person.email}`} className="btn-primary">
            {person.email}
          </a>
          <a
            href={person.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            GitHub
          </a>
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <nav
        ref={navRef}
        className="mt-24 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--border)] pt-10"
        aria-label="Otras secciones"
      >
        {(["projects", "skills", "about"] as SectionId[]).map((section) => (
          <button
            key={section}
            type="button"
            onClick={() => onNavigate(section)}
            className="text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            {sectionLabels[section]} →
          </button>
        ))}
      </nav>

      <p ref={locationRef} className="mt-16 text-sm text-[var(--muted)]">
        {person.location}
      </p>
    </section>
  );
}
