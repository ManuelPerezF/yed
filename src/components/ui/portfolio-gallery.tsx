"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { PortfolioGalleryImage } from "@/lib/portfolio-gallery";

export type { PortfolioGalleryImage };

export type PortfolioGalleryProps = {
  title?: string;
  archiveButton?: {
    text: string;
    href: string;
  };
  images: PortfolioGalleryImage[];
  className?: string;
  maxHeight?: number;
  spacing?: string;
  onImageClick?: (projectIndex: number) => void;
  pauseOnHover?: boolean;
  marqueeRepeat?: number;
};

export function PortfolioGallery({
  title = "Proyectos",
  archiveButton,
  images,
  className = "",
  maxHeight = 120,
  spacing = "-space-x-72 md:-space-x-80",
  onImageClick,
  pauseOnHover = true,
  marqueeRepeat = 4,
}: PortfolioGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  if (images.length === 0) return null;

  return (
    <section aria-label={title} className={cn("relative", className)} id="archives">
      <div className="overflow-hidden border border-[var(--border)] bg-[oklch(0.21_0.006_290)]">
        <div className="relative z-10 px-6 pb-6 pt-12 text-center md:px-10 md:pt-14">
          <h2 className="display-title mx-auto max-w-5xl text-balance">{title}</h2>

          {archiveButton ? (
            <Link
              href={archiveButton.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group mt-8 inline-flex items-center gap-2"
            >
              <span>{archiveButton.text}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : null}
        </div>

        <div className="relative hidden h-[400px] overflow-hidden md:block md:-mb-[200px]">
          <div className={cn("flex items-end justify-center pb-8 pt-40", spacing)}>
            {images.map((image, index) => {
              const totalImages = images.length;
              const middle = Math.floor(totalImages / 2);
              const distanceFromMiddle = Math.abs(index - middle);
              const staggerOffset = maxHeight - distanceFromMiddle * 20;
              const zIndex = totalImages - index;
              const isHovered = hoveredIndex === index;
              const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
              const yOffset = isHovered ? -120 : isOtherHovered ? 0 : -staggerOffset;

              return (
                <motion.button
                  key={`${image.projectIndex}-${image.title ?? index}`}
                  type="button"
                  className="group flex-shrink-0 cursor-pointer border-0 bg-transparent p-0"
                  style={{ zIndex }}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          transform: "perspective(5000px) rotateY(-45deg) translateY(200px)",
                          opacity: 0,
                        }
                  }
                  animate={{
                    transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`,
                    opacity: 1,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.2,
                    delay: reduceMotion ? 0 : index * 0.05,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => onImageClick?.(image.projectIndex)}
                  aria-label={image.title ?? image.alt}
                >
                  <div className="project-gallery-card relative aspect-video w-64 overflow-hidden rounded-[var(--radius)] md:w-80 lg:w-96">
                    {image.src ? (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover object-left-top transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        sizes="(max-width: 1024px) 320px, 384px"
                      />
                    ) : (
                      <div className="project-row-fallback flex h-full w-full flex-col justify-between p-6 text-left">
                        <p className="text-xs text-[var(--muted)]">{image.title}</p>
                        <p className="text-2xl font-medium tracking-tight">{image.title}</p>
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="relative block pb-8 md:hidden">
          <div
            className={cn(
              "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
              "flex-row",
            )}
          >
            {Array.from({ length: marqueeRepeat }).map((_, repeatIndex) => (
              <div
                key={repeatIndex}
                className={cn(
                  "animate-marquee flex shrink-0 flex-row justify-around [gap:var(--gap)]",
                  pauseOnHover && "group-hover:[animation-play-state:paused]",
                )}
              >
                {images.map((image, index) => (
                  <button
                    key={`${repeatIndex}-${image.projectIndex}-${index}`}
                    type="button"
                    className="group flex-shrink-0 cursor-pointer border-0 bg-transparent p-0"
                    onClick={() => onImageClick?.(image.projectIndex)}
                    aria-label={image.title ?? image.alt}
                  >
                    <div className="project-gallery-card relative aspect-video w-64 overflow-hidden rounded-[var(--radius)]">
                      {image.src ? (
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover object-left-top transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                          sizes="256px"
                        />
                      ) : (
                        <div className="project-row-fallback flex h-full w-full flex-col justify-between p-5 text-left">
                          <p className="text-xs text-[var(--muted)]">App</p>
                          <p className="text-xl font-medium tracking-tight">{image.title}</p>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
