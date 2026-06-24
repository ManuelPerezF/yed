"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import type { ProjectImage } from "@/types/portfolio";

type CaseStudyGalleryProps = {
  images: ProjectImage[];
};

export function CaseStudyGallery({ images }: CaseStudyGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  if (images.length === 0) return null;

  return (
    <div className="mt-10">
      <Carousel setApi={setApi} opts={{ align: "start", loop: images.length > 1 }}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={image.src}>
              <div className="case-carousel-slide">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  className="object-cover object-top"
                  sizes="100vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {images.length > 1 ? (
          <>
            <span className="case-carousel-counter">
              {String(selected + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              className="case-carousel-arrow case-carousel-arrow--prev"
              onClick={() => api?.scrollPrev()}
              aria-label="Imagen anterior"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="case-carousel-arrow case-carousel-arrow--next"
              onClick={() => api?.scrollNext()}
              aria-label="Siguiente imagen"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </>
        ) : null}
      </Carousel>

      {images.length > 1 ? (
        <div className="case-thumbs" role="tablist" aria-label="Capturas del proyecto">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              role="tab"
              aria-selected={index === selected}
              aria-label={image.alt}
              onClick={() => scrollTo(index)}
              className={`case-thumb ${index === selected ? "case-thumb--active" : ""}`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                className="object-cover object-top"
                sizes="112px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
