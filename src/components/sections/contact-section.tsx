"use client";

import type { SectionId } from "@/types/portfolio";
import { person, sectionLabels } from "@/data/portfolio";

type ContactSectionProps = {
  onNavigate: (section: SectionId) => void;
};

export function ContactSection({ onNavigate }: ContactSectionProps) {
  return (
    <section className="section-shell">
      <div>
        <p className="text-sm text-[var(--muted)] mb-8 tracking-widest uppercase">
          Disponible para colaboración
        </p>
        <h1 className="contact-headline">Hablemos.</h1>
        <p className="body-copy mt-8 max-w-md text-lg">
          Hackathons, proyectos académicos o ideas de producto.
        </p>

        <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center">
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

      <p className="mt-16 text-sm text-[var(--muted)]">{person.location}</p>
    </section>
  );
}
