"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { projects } from "@/data/portfolio";

export function ProjectsSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      setSelected(api.selectedScrollSnap());
    };
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  return (
    <section className="section-shell project-section" id="proyectos">
      <div className="project-carousel-header">
        <div className="max-w-2xl">
          <h1 className="display-title text-balance">Proyectos seleccionados</h1>
          <p className="body-copy mt-6">
            Cosas que he hecho intentando dejar mi huella en el universo.
          </p>
        </div>

        <div className="carousel-nav">
          <button
            type="button"
            className="carousel-nav-btn"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Proyecto anterior"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="carousel-nav-btn"
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Proyecto siguiente"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Carousel setApi={setApi} opts={{ align: "start", loop: false, dragFree: true }}>
        <CarouselContent className="-ml-4">
          {projects.map((project) => {
            const previewImage = project.image ?? project.gallery?.[0]?.src;

            return (
              <CarouselItem
                key={project.slug}
                className="basis-[78%] pl-4 sm:basis-[48%] lg:basis-[28%]"
              >
                <Link
                  href={`/proyectos/${project.slug}`}
                  className="project-card group"
                  aria-label={`Ver caso de estudio: ${project.title}`}
                >
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      alt={`Captura de ${project.title}`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 78vw, (max-width: 1024px) 48vw, 28vw"
                    />
                  ) : null}
                  <div className="project-card-shade" aria-hidden />
                  <div className="project-card-body">
                    <span className="project-card-kind">
                      {project.category === "web" ? "Web" : "App"}
                      {project.badge ? ` · ${project.badge}` : ""}
                    </span>
                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-desc">{project.subtitle ?? project.description}</p>
                    <span className="project-card-cta">
                      Ver caso completo
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      <div className="carousel-dots">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            className="carousel-dot-btn"
            aria-label={`Ir al proyecto ${index + 1}: ${project.title}`}
            aria-current={selected === index}
            onClick={() => scrollTo(index)}
          >
            <span className="carousel-dot" />
          </button>
        ))}
      </div>
    </section>
  );
}
