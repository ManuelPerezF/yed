"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { EntryScreen } from "@/components/entry-screen";
import { PortfolioMenu } from "@/components/portfolio-menu";
import { PortfolioShell } from "@/components/portfolio-shell";
import { TopNavBar } from "@/components/top-nav-bar";
import { PortfolioBackground } from "@/components/ui/portfolio-background";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import type { SectionId } from "@/types/portfolio";

const hashSectionMap: Record<string, SectionId> = {
  proyectos: "projects",
  skills: "skills",
  contacto: "contact",
  "sobre-mi": "about",
};

function getSectionFromHash(hash: string): SectionId | null {
  const id = hash.replace(/^#/, "");
  return hashSectionMap[id] ?? null;
}

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [hasEntered, setHasEntered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [displaySection, setDisplaySection] = useState<SectionId | null>(null);
  const displaySectionRef = useRef<SectionId | null>(null);

  const showLanding = !hasEntered;
  const showSection = hasEntered && !menuOpen && displaySection !== null;

  const animateIn = () => {
    const el = contentRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
    );
  };

  const goToSection = (section: SectionId) => {
    setHasEntered(true);
    setMenuOpen(false);

    const el = contentRef.current;
    const current = displaySectionRef.current;

    if (current === section && el) {
      window.scrollTo(0, 0);
      return;
    }

    if (current === null || !el) {
      displaySectionRef.current = section;
      setDisplaySection(section);
      window.scrollTo(0, 0);
      requestAnimationFrame(animateIn);
      return;
    }

    gsap.killTweensOf(el);
    gsap.to(el, {
      opacity: 0,
      y: -14,
      duration: 0.26,
      ease: "power2.in",
      onComplete: () => {
        displaySectionRef.current = section;
        setDisplaySection(section);
        window.scrollTo(0, 0);
        requestAnimationFrame(() => requestAnimationFrame(animateIn));
      },
    });
  };

  const openMenu = () => {
    setHasEntered(true);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    if (displaySection === null) {
      goToLanding();
      return;
    }
    setMenuOpen(false);
  };

  const goToLanding = () => {
    const el = contentRef.current;
    const finish = () => {
      displaySectionRef.current = null;
      setDisplaySection(null);
      setMenuOpen(false);
      setHasEntered(false);
      window.scrollTo(0, 0);
    };

    if (el && displaySectionRef.current !== null) {
      gsap.killTweensOf(el);
      gsap.to(el, {
        opacity: 0,
        y: -14,
        duration: 0.24,
        ease: "power2.in",
        onComplete: finish,
      });
    } else {
      finish();
    }
  };

  const handleBrandClick = () => {
    if (menuOpen || displaySection === null) {
      goToLanding();
      return;
    }
    openMenu();
  };

  const handleMenuClick = () => {
    if (menuOpen) {
      closeMenu();
      return;
    }
    openMenu();
  };

  useEffect(() => {
    const lockScroll = showLanding || menuOpen;
    document.body.style.overflow = lockScroll ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLanding, menuOpen]);

  useEffect(() => {
    const openFromHash = () => {
      const section = getSectionFromHash(window.location.hash);
      if (!section) return;

      displaySectionRef.current = section;
      setDisplaySection(section);
      setHasEntered(true);
      setMenuOpen(false);
      window.scrollTo(0, 0);
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const renderSection = () => {
    switch (displaySection) {
      case "projects":
        return <ProjectsSection />;
      case "skills":
        return <SkillsSection />;
      case "about":
        return <AboutSection />;
      case "contact":
        return <ContactSection onNavigate={goToSection} />;
      default:
        return null;
    }
  };

  return (
    <main ref={root} className="w-full max-w-full overflow-x-hidden bg-background text-foreground">
      <PortfolioBackground intensity={showLanding ? "entry" : "ambient"} />

      {showLanding ? (
        <div className="fixed inset-0 z-100 overflow-hidden">
          <EntryScreen onOpen={openMenu} onSelectSection={goToSection} />
        </div>
      ) : null}

      {hasEntered ? (
        <>
          <div className="site-nav-shell fixed inset-x-0 top-0 z-90">
            <TopNavBar
              menuOpen={menuOpen}
              activeSection={displaySection}
              onBrandClick={handleBrandClick}
              onMenuClick={handleMenuClick}
              onSectionChange={goToSection}
            />
          </div>

          <PortfolioMenu
            open={menuOpen}
            activeSection={displaySection}
            onSelectSection={goToSection}
          />
        </>
      ) : null}

      {showSection ? (
        <PortfolioShell>
          <div ref={contentRef} className="section-wrapper">
            {renderSection()}
          </div>
        </PortfolioShell>
      ) : null}
    </main>
  );
}
