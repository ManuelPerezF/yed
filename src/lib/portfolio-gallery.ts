import type { Project } from "@/types/portfolio";
import { projects } from "@/data/portfolio";

export type PortfolioGalleryImage = {
  src?: string;
  alt: string;
  title?: string;
  projectIndex: number;
};

export function getPortfolioGalleryImages(
  source: Project[] = projects,
): PortfolioGalleryImage[] {
  return source.map((project, projectIndex) => {
    const primary = project.image ?? project.gallery?.[0]?.src;
    const alt =
      project.gallery?.[0]?.alt ??
      (primary ? `Captura del proyecto ${project.title}` : project.title);

    return {
      src: primary,
      alt,
      title: project.title,
      projectIndex,
    };
  });
}
