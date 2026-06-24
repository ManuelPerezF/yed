import Link from "next/link";

export function CaseStudyNav() {
  return (
    <div className="site-nav-shell fixed inset-x-0 top-0 z-90">
      <header className="site-nav">
        <Link href="/" className="site-nav-brand">
          manudev
        </Link>
        <span />
        <Link href="/#proyectos" className="site-nav-menu">
          Proyectos
        </Link>
      </header>
    </div>
  );
}
