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
        <main className="case-study section-shell">
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
  const stack = project.stack.split(" · ");

  return (
    <>
      <CaseStudyNav />
      <main className="case-study section-shell">
        <header className="case-study-header">
          <span className="case-eyebrow">
            Caso {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            {project.badge ? (
              <>
                <span className="case-eyebrow-dot" aria-hidden />
                {project.badge}
              </>
            ) : null}
          </span>

          <h1 className="display-title text-balance">{project.title}</h1>

          {project.subtitle ? (
            <p className="case-subtitle">{project.subtitle}</p>
          ) : null}

          <p className="body-copy mt-4 max-w-none">{project.description}</p>
        </header>

        <CaseStudyGallery images={images} />

        <div className="case-study-meta">
          <div className="case-study-meta-stack">
            <p className="case-meta-label">Stack</p>
            <ul className="case-stack">
              {stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>

          <a
            href={project.github ?? project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="case-study-github group"
          >
            Ver en GitHub
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="case-study-body">
          <section className="case-block">
            <h2 className="case-heading">Problema</h2>
            <p className="case-copy">{project.problem}</p>
          </section>

          <section className="case-block">
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
        </div>

        <nav className="case-study-nav-links" aria-label="Otros casos de estudio">
          <Link href={`/proyectos/${prevProject.slug}`} className="case-study-nav-link group">
            <ArrowLeft className="h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-hover:-translate-x-0.5" />
            <span className="min-w-0">
              <span className="case-study-nav-label">Caso anterior</span>
              <span className="case-study-nav-title">{prevProject.title}</span>
            </span>
          </Link>

          <Link
            href={`/proyectos/${nextProject.slug}`}
            className="case-study-nav-link case-study-nav-link--next group"
          >
            <span className="min-w-0">
              <span className="case-study-nav-label">Siguiente caso</span>
              <span className="case-study-nav-title">{nextProject.title}</span>
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </nav>
      </main>
    </>
  );
}
