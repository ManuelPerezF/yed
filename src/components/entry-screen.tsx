"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { menuLinks, person } from "@/data/portfolio";
import type { SectionId } from "@/types/portfolio";

type EntryScreenProps = {
  onOpen: () => void;
  onSelectSection: (section: SectionId) => void;
};

const OPEN_LABEL = "Open";

export function EntryScreen({ onOpen, onSelectSection }: EntryScreenProps) {
  const chromeRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const openChars = openRef.current?.querySelectorAll<HTMLElement>(".entry-open-char");
      const footerLinks = footerRef.current?.querySelectorAll<HTMLElement>(".entry-footer-link");

      if (reduced) {
        gsap.set(chromeRef.current, { opacity: 1 });
        gsap.set(
          [brandRef.current, openChars, taglineRef.current, metaRef.current, footerLinks],
          { opacity: 1, y: 0 },
        );
        return;
      }

      gsap.set(chromeRef.current, { opacity: 1 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        brandRef.current,
        { opacity: 0, y: -18 },
        { opacity: 1, y: 0, duration: 0.55 },
        0.25,
      );

      if (openChars?.length) {
        tl.fromTo(
          openChars,
          { opacity: 0, y: 72 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.1 },
          0.42,
        );
      }

      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45 },
        0.95,
      )
        .fromTo(
          metaRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 },
          1.05,
        )
        .fromTo(
          footerLinks ?? [],
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.38, stagger: 0.06 },
          1.15,
        );
    }, chromeRef);

    return () => ctx.revert();
  }, []);

  const animateOut = (next: () => void) => {
    const root = chromeRef.current;
    if (!root) {
      next();
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      next();
      return;
    }

    const openChars = openRef.current?.querySelectorAll<HTMLElement>(".entry-open-char");
    const footerLinks = footerRef.current?.querySelectorAll<HTMLElement>(".entry-footer-link");

    gsap.killTweensOf(root);
    if (openChars?.length) gsap.killTweensOf(openChars);
    if (footerLinks?.length) gsap.killTweensOf(footerLinks);

    const tl = gsap.timeline({ onComplete: next });

    tl.to(openChars ?? [], {
      y: -56,
      opacity: 0,
      stagger: 0.035,
      duration: 0.34,
      ease: "power3.in",
    });

    tl.to(
      [brandRef.current, taglineRef.current, metaRef.current, footerLinks ?? []],
      {
        opacity: 0,
        y: -10,
        duration: 0.24,
        ease: "power2.in",
      },
      0.06,
    );

    tl.to(root, { opacity: 0, duration: 0.18, ease: "power2.in" }, 0.28);
  };

  const handleOpen = () => animateOut(onOpen);

  const handleShortcut = (section: SectionId) => {
    animateOut(() => onSelectSection(section));
  };

  return (
    <div ref={chromeRef} className="entry-chrome">
      <div className="entry-vignette" aria-hidden />

      <header className="entry-top-bar">
        <span ref={brandRef} className="entry-brand-static">
          manudev
        </span>
      </header>

      <div className="entry-center">
        <button
          ref={openRef}
          type="button"
          onClick={handleOpen}
          className="entry-open"
          aria-label="Abrir portafolio"
        >
          <span className="entry-open-word" aria-hidden>
            {OPEN_LABEL.split("").map((char, index) => (
              <span className="entry-open-char" key={`${char}-${index}`}>
                {char}
              </span>
            ))}
          </span>
        </button>
        <p ref={taglineRef} className="entry-tagline">
          {person.role}
        </p>
        <p ref={metaRef} className="entry-meta">
          {person.location} · {person.school.split(" · ")[0]}
        </p>
      </div>

      <footer className="entry-footer">
        <div ref={footerRef} className="entry-footer-links">
          {menuLinks.map((link) => (
            <button
              key={link.section}
              type="button"
              onClick={() => handleShortcut(link.section)}
              className="entry-footer-link"
            >
              {link.label}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
