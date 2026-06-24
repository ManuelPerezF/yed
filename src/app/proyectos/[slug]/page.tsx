import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { CaseStudyGallery } from "@/components/case-study-gallery";
import { CaseStudyNav } from "@/components/case-study-nav";
import { projects } from "@/data/portfolio";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Proyecto no encontrado" };
  return {
    title: `${project.title} — Caso de estudio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <>
        <CaseStudyNav />
        <main className="section-shell pt-24">
          <p className="body-copy">Proyecto no encontrado.</p>
          <Link href="/" className="btn-ghost mt-6 inline-flex">
            ← Volver al inicio
          </Link>
        </main>
      </>
    );
  }

  const total = projects.length;
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = projects[(currentIndex - 1 + total) % total];
  const nextProject = projects[(currentIndex + 1) % total];
  const images = project.gallery?.length
    ? project.gallery
    : project.image
      ? [{ src: project.image, alt: `Captura del proyecto ${project.title}` }]
      : [];
  const meta = [
    { label: "Rol", value: project.role },
    { label: "Duración", value: project.duration },
    { label: "Equipo", value: project.team },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));

  const stack = project.stack.split(" · ");

  return (
    <>
      <CaseStudyNav />
      <main className="section-shell pt-24">
      <header className="flex flex-col gap-5">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] px-3.5 py-1.5 text-xs tracking-wide text-[var(--muted)] uppercase">
          Caso {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          {project.badge ? (
            <>
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]" aria-hidden />
              {project.badge}
            </>
          ) : null}
        </span>

        <h1 className="display-title display-title--gradient text-balance">{project.title}</h1>

        {project.subtitle ? (
          <p className="text-lg text-[var(--muted)]">{project.subtitle}</p>
        ) : null}
      </header>

      <CaseStudyGallery images={images} />

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
        <p className="body-copy max-w-none">{project.description}</p>

        <dl className="grid grid-cols-2 gap-5 border-t border-[var(--border)] pt-6 sm:grid-cols-3 md:grid-cols-1 md:border-t-0 md:border-l md:pt-0 md:pl-8">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="text-xs tracking-wide text-[var(--muted)] uppercase">
                {item.label}
              </dt>
              <dd className="mt-1.5 text-sm">{item.value}</dd>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <dt className="text-xs tracking-wide text-[var(--muted)] uppercase">Stack</dt>
            <dd className="case-stack-row">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="skill-tag px-3 py-1.5 text-sm border border-[var(--border)] text-[oklch(0.94_0.004_290/0.82)]"
                >
                  {tech}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      <div className="project-gallery-actions">
        <a
          href={project.github ?? project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary group inline-flex items-center gap-2"
        >
          Ver en GitHub
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      <section className="case-section">
        <p className="case-lead">{project.problem}</p>
      </section>

      <section className="case-section case-section--divided">
        <h2 className="case-heading">Resultado</h2>
        <ul className="case-result-list">
          {project.outcome.map((item, index) => (
            <li key={item}>
              <span className="case-result-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 grid grid-cols-1 gap-4 border-t border-[var(--border)] pt-12 sm:grid-cols-2">
        <Link
          href={`/proyectos/${prevProject.slug}`}
          className="group flex items-center gap-4 border border-[var(--border)] p-5 transition-colors hover:border-[var(--accent)]"
        >
          <ArrowLeft className="h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-hover:-translate-x-0.5" />
          <div className="min-w-0">
            <p className="text-xs text-[var(--muted)] uppercase tracking-wide">
              Caso anterior
            </p>
            <p className="mt-1 truncate text-base font-medium">{prevProject.title}</p>
          </div>
        </Link>

        <Link
          href={`/proyectos/${nextProject.slug}`}
          className="group flex items-center justify-between gap-4 border border-[var(--border)] p-5 transition-colors hover:border-[var(--accent)]"
        >
          <div className="min-w-0">
            <p className="text-xs text-[var(--muted)] uppercase tracking-wide">
              Siguiente caso
            </p>
            <p className="mt-1 truncate text-base font-medium">{nextProject.title}</p>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      </main>
    </>
  );
}
