import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";

export function ProjectsSection() {
  return (
    <section className="section-shell project-section" id="proyectos">
      <div className="project-list-header max-w-2xl">
        <h1 className="display-title text-balance">Proyectos seleccionados</h1>
        <p className="body-copy mt-6">
          Cosas que he hecho intentando dejar mi huella en el universo.
        </p>
      </div>

      <ul className="project-list">
        {projects.map((project) => {
          const coverImage = project.cover ?? project.image ?? project.gallery?.[0]?.src;
          const isLogoCover = Boolean(project.cover);

          return (
            <li key={project.slug}>
              <Link
                href={`/proyectos/${project.slug}`}
                className="project-card group"
                aria-label={`Ver caso de estudio: ${project.title}`}
              >
                {coverImage ? (
                  <div
                    className={
                      isLogoCover ? "project-card-cover project-card-cover--logo" : "project-card-cover"
                    }
                  >
                    <Image
                      src={coverImage}
                      alt={`Portada de ${project.title}`}
                      fill
                      className={
                        isLogoCover
                          ? "project-card-cover-img project-card-cover-img--logo"
                          : "project-card-cover-img"
                      }
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : null}
                <div className="project-card-body">
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.description}</p>
                  <span className="project-card-cta">
                    Ver proyecto
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
