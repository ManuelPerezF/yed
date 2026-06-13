"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { person } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDListElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set(
        [nameRef.current, roleRef.current, bioRef.current, metaRef.current, imageWrapRef.current],
        { opacity: 1, x: 0, y: 0 },
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(nameRef.current, { opacity: 0, x: -28 }, { opacity: 1, x: 0, duration: 0.7 })
        .fromTo(roleRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45 }, "-=0.38")
        .fromTo(bioRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.3")
        .fromTo(metaRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45 }, "-=0.28");

      gsap.fromTo(
        imageWrapRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        },
      );

      gsap.to(imageWrapRef.current, {
        y: -14,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-section section-wrapper">
      <div className="about-inner">
        <div className="about-text">
          <h1 ref={nameRef} className="about-name">
            {person.shortName}
          </h1>
          <p ref={roleRef} className="about-role">
            ITC · Tecnológico de Monterrey · 6.º semestre
          </p>
          <p ref={bioRef} className="about-bio">
            {person.bio}
          </p>
          <dl ref={metaRef} className="about-meta">
            <div>
              <dt>Ubicación</dt>
              <dd>{person.location}</dd>
            </div>
            <div>
              <dt>Contacto</dt>
              <dd>
                <a href={`mailto:${person.email}`} className="about-email-link">
                  {person.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div ref={imageWrapRef} className="about-image-col" aria-hidden>
          <div className="about-glow" />
          <Image
            src="/yo.png"
            alt="Manuel Pérez"
            width={420}
            height={420}
            className="about-photo"
            priority
          />
        </div>
      </div>
    </section>
  );
}
