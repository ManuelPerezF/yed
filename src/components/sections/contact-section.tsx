"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import { person } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set([headlineRef.current, bodyRef.current, linksRef.current], { opacity: 1, x: 0, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(headlineRef.current, { opacity: 0, x: -28 }, { opacity: 1, x: 0, duration: 0.7 })
        .fromTo(bodyRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
        .fromTo(
          linksRef.current?.querySelectorAll(".contact-link") ?? [],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 },
          "-=0.25",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-shell">
      <div>
        <h1 ref={headlineRef} className="contact-headline">
          Hablemos.
        </h1>

        <p ref={bodyRef} className="body-copy mt-8 max-w-lg text-lg">
          Hackathons, proyectos académicos o ideas de producto.
        </p>

        <div ref={linksRef} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a href={`mailto:${person.email}`} className="contact-link contact-link--primary">
            <Icon icon="mdi:email-outline" className="contact-link-icon" aria-hidden="true" />
            <span>{person.email}</span>
          </a>
          <a
            href={person.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <Icon icon="mdi:github" className="contact-link-icon" aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <Icon icon="mdi:linkedin" className="contact-link-icon" aria-hidden="true" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}
