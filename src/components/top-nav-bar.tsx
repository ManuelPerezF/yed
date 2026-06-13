"use client";

import { menuLinks, sectionLabels } from "@/data/portfolio";
import type { SectionId } from "@/types/portfolio";

type TopNavBarProps = {
  menuOpen: boolean;
  activeSection: SectionId | null;
  onBrandClick: () => void;
  onMenuClick: () => void;
  onSectionChange: (section: SectionId) => void;
  brandLabel?: string;
};

export function TopNavBar({
  menuOpen,
  activeSection,
  onBrandClick,
  onMenuClick,
  onSectionChange,
  brandLabel = "manudev",
}: TopNavBarProps) {
  const inSection = activeSection !== null && !menuOpen;

  return (
    <header className="site-nav">
      <button
        type="button"
        onClick={onBrandClick}
        className="site-nav-brand"
        aria-label={inSection ? "Abrir menú de navegación" : "Volver al inicio"}
      >
        {brandLabel}
      </button>

      {inSection ? (
        <nav className="site-nav-sections" aria-label="Secciones del portafolio">
          {menuLinks.map((link) => (
            <button
              key={link.section}
              type="button"
              onClick={() => onSectionChange(link.section)}
              className={`site-nav-section ${
                activeSection === link.section ? "site-nav-section--active" : ""
              }`}
              aria-current={activeSection === link.section ? "page" : undefined}
            >
              {sectionLabels[link.section]}
            </button>
          ))}
        </nav>
      ) : null}

      <button
        type="button"
        onClick={onMenuClick}
        className="site-nav-menu"
        aria-expanded={menuOpen}
        aria-controls="portfolio-menu"
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {menuOpen ? "Cerrar" : "Menu"}
      </button>
    </header>
  );
}
