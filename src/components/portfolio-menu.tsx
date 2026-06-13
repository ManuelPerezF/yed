"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { footerLinks, menuLinks, person } from "@/data/portfolio";
import type { SectionId } from "@/types/portfolio";

type PortfolioMenuProps = {
  open: boolean;
  activeSection: SectionId | null;
  onSelectSection: (section: SectionId) => void;
};

export function PortfolioMenu({
  open,
  activeSection,
  onSelectSection,
}: PortfolioMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const linksEl = linksRef.current;
    const footerEl = footerRef.current;
    if (!overlay) return;

    gsap.killTweensOf(overlay);

    if (open) {
      overlay.style.visibility = "visible";
      overlay.style.pointerEvents = "auto";

      const tl = gsap.timeline();

      tl.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.32, ease: "power2.out" },
        0,
      );

      if (linksEl) {
        const links = linksEl.querySelectorAll<HTMLElement>(".menu-panel-link");
        tl.fromTo(
          [...links],
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.55,
            ease: "power3.out",
          },
          0.1,
        );
      }

      if (footerEl) {
        tl.fromTo(
          footerEl,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          0.45,
        );
      }
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          overlay.style.visibility = "hidden";
          overlay.style.pointerEvents = "none";
        },
      });
    }
  }, [open]);

  const handleSelectSection = (section: SectionId) => {
    if (section === activeSection) {
      onSelectSection(section);
      return;
    }

    const linksEl = linksRef.current;
    if (linksEl) {
      const links = linksEl.querySelectorAll<HTMLElement>(".menu-panel-link");
      gsap.to([...links], {
        opacity: 0,
        y: -12,
        duration: 0.16,
        ease: "power2.in",
        stagger: 0.02,
      });
    }
    setTimeout(() => onSelectSection(section), 180);
  };

  return (
    <div
      ref={overlayRef}
      id="portfolio-menu"
      className="menu-overlay fixed inset-0 z-70 overflow-y-auto bg-[var(--background)]"
      style={{ opacity: 0, visibility: "hidden", pointerEvents: "none" }}
      aria-hidden={!open}
    >
      <div className="flex min-h-dvh flex-col px-7 pb-10 pt-24 md:px-8 md:pt-28">
        <div ref={linksRef} className="menu-links">
          {menuLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleSelectSection(link.section)}
              className={`menu-panel-link group text-left ${
                activeSection === link.section ? "menu-panel-link--active" : ""
              }`}
              aria-current={activeSection === link.section ? "page" : undefined}
            >
              <span>{link.label}</span>
              <span className="menu-panel-arrow">→</span>
            </button>
          ))}
        </div>

        <div ref={footerRef} className="menu-footer mt-auto">
          <a href={`mailto:${person.email}`} className="menu-contact-cta">
            {person.email}
            <span aria-hidden> →</span>
          </a>

          <div className="menu-footer-links mt-8">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
