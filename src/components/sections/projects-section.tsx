"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PortfolioGallery } from "@/components/ui/portfolio-gallery";
import { projects } from "@/data/portfolio";
import { getPortfolioGalleryImages } from "@/lib/portfolio-gallery";
import type { Project } from "@/types/portfolio";

gsap.registerPlugin(ScrollTrigger);

function getProjectImages(project: Project) {
  if (project.gallery?.length) return project.gallery;
  if (project.image) {
    return [{ src: project.image, alt: `Captura del proyecto ${project.title}` }];
  }
  return [];
}


export function ProjectsSection() {
  const galleryImages = getPortfolioGalleryImages();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imageWrapRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 0.93, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        },
      );
    });
    return () => ctx.revert();
  }, [activeIndex]);

  const activeProject = projects[activeIndex];
  const images = getProjectImages(activeProject);
  const activeImage = images[imageIndex] ?? images[0];
  const selectProject = useCallback((projectIndex: number) => {
    setActiveIndex(projectIndex);
    setImageIndex(0);
  }, []);

  return (
    <section className="section-shell project-section">
      <PortfolioGallery
        title="Cuatro proyectos, cuatro contextos distintos."
        images={galleryImages}
        onImageClick={selectProject}
        className="project-section-gallery"
        archiveButton={{
          text: "Ver en GitHub",
          href: activeProject.github ?? activeProject.href,
        }}
      />

      <article
        className="project-gallery-detail project-section-detail"
        aria-live="polite"
        aria-label={`Detalle de ${activeProject.title}`}
      >
        <div className="project-gallery-meta">
          <p className="project-gallery-counter">
            {String(activeIndex + 1).padStart(2, "0")}
            <span className="project-gallery-counter-sep">/</span>
            {String(projects.length).padStart(2, "0")}
          </p>
          <p className="project-gallery-kind">
            {activeProject.category === "web" ? "Web" : "App"}
            {activeProject.badge ? ` · ${activeProject.badge}` : ""}
          </p>
        </div>

        <div className="project-gallery-stage">
          {activeImage ? (
            <div ref={imageWrapRef} className="project-gallery-main group relative aspect-[16/10] overflow-hidden">
              <Image
                key={activeImage.src}
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                priority={activeIndex === 0 && imageIndex === 0}
                className="object-cover object-top transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 80rem"
              />
              <div className="project-gallery-main-shade" aria-hidden />
            </div>
          ) : (
            <div className="project-row-fallback flex aspect-[16/10] flex-col justify-between p-8 md:p-12">
              <p className="text-sm text-[var(--muted)]">{activeProject.badge}</p>
              <div>
                <p className="text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-none tracking-tight">
                  {activeProject.title}
                </p>
                {activeProject.subtitle ? (
                  <p className="mt-4 text-[var(--muted)]">{activeProject.subtitle}</p>
                ) : null}
              </div>
            </div>
          )}

          {images.length > 1 ? (
            <div
              className="project-gallery-thumbs"
              role="tablist"
              aria-label={`Capturas de ${activeProject.title}`}
            >
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  role="tab"
                  aria-selected={index === imageIndex}
                  aria-label={image.alt}
                  onClick={() => setImageIndex(index)}
                  className={`project-gallery-thumb group ${
                    index === imageIndex ? "project-gallery-thumb--active" : ""
                  }`}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    className="object-cover object-top transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    sizes="144px"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="project-gallery-copy">
          <div className="project-gallery-copy-grid">
            <div className="min-w-0">
              <h2 className="project-gallery-title">{activeProject.title}</h2>
              {activeProject.subtitle ? (
                <p className="project-gallery-subtitle">{activeProject.subtitle}</p>
              ) : null}
              <p className="body-copy mt-6 max-w-2xl">{activeProject.description}</p>
            </div>

          </div>

          <div className="project-gallery-actions">
            <a
              href={activeProject.github ?? activeProject.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Ver en GitHub
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}
