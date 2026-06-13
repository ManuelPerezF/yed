import type { Project, SectionId, SkillContext } from "@/types/portfolio";

export const person = {
  name: "Manuel Antonio Pérez Fonseca",
  shortName: "Manuel Pérez",
  role: "Estudiante de Ciencias Computacionales y Tecnología",
  school: "Tecnológico de Monterrey · 6.º semestre",
  bio: "Construí Proa en HackMTY 2025 con IA y Supabase, un sistema clínico con FastAPI para Clínica Nova, y Kent, app de finanzas en Electron. Me interesan productos full-stack con restricciones reales.",
  location: "Monterrey, México",
  email: "perezfonsecamanuel22@gmail.com",
  github: "https://github.com/ManuelPerezF",
  linkedin: "https://linkedin.com/in/manuelperezfons",
};

export const webProjects: Project[] = [
  {
    title: "AEBNL Platform",
    subtitle: "Plataforma para asociación civil",
    category: "web",
    stack: "React 19 · Vite · TypeScript · Node.js · Express · Oracle DB",
    description:
      "Sistema integral para la Asociación de Espina Bífida de Nuevo León. Sitio público, preregistro de beneficiarios y dashboard operativo con gestión de citas, inventario, donaciones y reportes analíticos.",
    image: "/projects/aebnl/landing.png",
    gallery: [
      { src: "/projects/aebnl/landing.png", alt: "Landing pública de AEBNL" },
      { src: "/projects/aebnl/inicio.png", alt: "Dashboard principal" },
      { src: "/projects/aebnl/beneficiarios.png", alt: "Gestión de beneficiarios" },
      { src: "/projects/aebnl/citas.png", alt: "Módulo de citas" },
      { src: "/projects/aebnl/servicios.png", alt: "Módulo de servicios" },
      { src: "/projects/aebnl/inventario.png", alt: "Módulo de inventario" },
      { src: "/projects/aebnl/donaciones.png", alt: "Módulo de donaciones" },
      { src: "/projects/aebnl/reportes.png", alt: "Reportes analíticos" },
      { src: "/projects/aebnl/login.png", alt: "Pantalla de acceso" },
    ],
    href: "https://github.com/atenasarita/reto-aebnl",
    github: "https://github.com/atenasarita/reto-aebnl",
    badge: "Proyecto universitario",
  },
  {
    title: "Proa",
    subtitle: "Asesor financiero digital",
    category: "web",
    stack: "Next.js 14 · TypeScript · Supabase · Google Gemini · MCP",
    description:
      "Plataforma financiera con IA para HackMTY 2025 (Banorte Open Innovation). Dashboard interactivo y asistente conversacional con Gemini.",
    image: "/projects/proa/landing.jpg",
    gallery: [
      {
        src: "/projects/proa/landing.jpg",
        alt: "Landing de Proa, asesor financiero con IA",
      },
      {
        src: "/projects/proa/dashboard.jpg",
        alt: "Dashboard principal de Proa",
      },
      {
        src: "/projects/proa/login.jpg",
        alt: "Pantalla de acceso de Proa",
      },
    ],
    href: "https://github.com/ManuelPerezF/banorte-open-innovation",
    github: "https://github.com/ManuelPerezF/banorte-open-innovation",
    badge: "HackMTY 2025",
  },
];

export const appProjects: Project[] = [
  {
    title: "Ambulance System Manager",
    subtitle: "Solución clínica full-stack",
    category: "app",
    stack: "FastAPI · Python · SwiftUI · Microsoft SQL Server",
    description:
      "Sistema con Clínica Nova para gestionar ambulancias y citas programadas. Control operativo y eficiencia en traslados.",
    image: "/projects/ambulance/asm1.png",
    gallery: [
      {
        src: "/projects/ambulance/asm1.png",
        alt: "Vista principal del Ambulance System Manager",
      },
      {
        src: "/projects/ambulance/asm2.png",
        alt: "Panel operativo del Ambulance System Manager",
      },
    ],
    href: "https://github.com/ManuelPerezF/appNovaCord",
    github: "https://github.com/ManuelPerezF/appNovaCord",
    badge: "Proyecto académico",
  },
  {
    title: "Kent",
    subtitle: "Finanzas personales en escritorio",
    category: "app",
    stack: "React · TypeScript · Electron · Express · Prisma · SQLite",
    description:
      "App de finanzas con cliente Electron y API Express. Ingresos, gastos, cuentas, suscripciones y reportes con gráficas.",
    href: "https://github.com/ManuelPerezF/kent",
    github: "https://github.com/ManuelPerezF/kent",
    badge: "Proyecto personal",
  },
];

export const projects = [...webProjects, ...appProjects];

export const skillContexts: SkillContext[] = [
  {
    project: "AEBNL Platform",
    context: "Asociación civil · sistema operativo web",
    tools: ["React 19", "Vite", "TypeScript", "Node.js", "Express", "Oracle DB", "JWT", "Cloudinary"],
  },
  {
    project: "Proa",
    context: "HackMTY 2025 · plataforma web con IA",
    tools: ["Next.js 14", "TypeScript", "Supabase", "Google Gemini", "MCP"],
  },
  {
    project: "Ambulance System Manager",
    context: "Clínica Nova · operaciones clínicas",
    tools: ["FastAPI", "Python", "SwiftUI", "Microsoft SQL Server"],
  },
  {
    project: "Kent",
    context: "Escritorio · finanzas personales",
    tools: ["React", "Electron", "Express", "Prisma", "SQLite"],
  },
];

export const menuLinks: { label: string; section: SectionId }[] = [
  { label: "Proyectos", section: "projects" },
  { label: "Skills", section: "skills" },
  { label: "Contacto", section: "contact" },
  { label: "Sobre mí", section: "about" },
];

export const sectionLabels: Record<SectionId, string> = {
  projects: "Proyectos",
  skills: "Skills",
  about: "Sobre mí",
  contact: "Contacto",
};

export const footerLinks = [
  { label: "github", href: person.github },
  { label: "linkedin", href: person.linkedin },
  { label: "email", href: `mailto:${person.email}` },
];

