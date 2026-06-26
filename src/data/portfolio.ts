import type { Project, SectionId, StackCategory } from "@/types/portfolio";

export const person = {
  name: "Manuel Antonio Pérez Fonseca",
  shortName: "Manuel Pérez",
  role: "Estudiante de Ciencias Computacionales y Tecnología",
  school: "Tecnológico de Monterrey · 6.º semestre",
  bio: "Estudio 6.º semestre de ITC en el Tecnológico de Monterrey. Me apasiona construir software que resuelva problemas reales. A lo largo de mi carrera he desarrollado proyectos académicos y personales con impacto concreto. Siempre busco nuevas oportunidades para seguir aprendiendo, mejorar mis habilidades técnicas y crecer como desarrollador.",
  location: "Monterrey, México",
  email: "perezfonsecamanuel22@gmail.com",
  github: "https://github.com/ManuelPerezF",
  linkedin: "https://linkedin.com/in/manuelperezfons",
};

export const webProjects: Project[] = [
  {
    slug: "aebnl-platform",
    title: "AEBNL Platform",
    subtitle: "Plataforma para asociación civil",
    category: "web",
    stack: "React 19 · Vite · TypeScript · Node.js · Express · Oracle DB",
    stackBadges: ["React", "Express", "OracleDB", "Vite"],
    description:
      "Sistema integral para la Asociación de Espina Bífida de Nuevo León. Sitio público, preregistro de beneficiarios y dashboard operativo con gestión de citas, inventario, donaciones y reportes analíticos.",
    role: "Full-stack",
    team: "Equipo académico",
    problem:
      "La asociación gestionaba preregistro de beneficiarios, citas, inventario y donaciones en hojas de cálculo y papel. No había sitio público ni forma centralizada de dar seguimiento a los procesos operativos.",
    approach: [
      "Diseñamos un sitio público con preregistro de beneficiarios y autenticación JWT para el panel interno.",
      "Construimos un dashboard operativo con módulos separados para citas, servicios, inventario y donaciones.",
      "Integramos Cloudinary para el manejo de evidencias e imágenes, y Oracle DB como motor de datos.",
      "Agregamos reportes analíticos para que el equipo administrativo pudiera dar seguimiento a su operación.",
    ],
    outcome: [
      "Centralizamos en un solo sistema procesos que antes vivían dispersos en hojas de cálculo.",
      "El panel administrativo cubre el ciclo completo: preregistro, citas, inventario y donaciones.",
      "Reportes analíticos disponibles para apoyar decisiones del equipo de la asociación.",
    ],
    learnings: [
      "Levantar requerimientos con stakeholders no técnicos y traducirlos a módulos concretos.",
      "Trabajar con Oracle DB en un stack que normalmente usa Postgres/MySQL.",
      "Dividir un sistema grande en módulos independientes sin perder cohesión de producto.",
    ],
    cover: "/projects/covers/aebnl.png",
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
    badge: "Proyecto académico",
  },
  {
    slug: "proa",
    title: "Proa",
    subtitle: "Asesor financiero digital",
    category: "web",
    stack: "Next.js 14 · TypeScript · Supabase · Google Gemini · MCP",
    stackBadges: ["React", "Next", "Supabase", "MCP"],
    description:
      "Plataforma financiera con IA para HackMTY 2025 (Banorte Open Innovation). Dashboard interactivo y asistente conversacional con Gemini.",
    role: "Full-stack",
    duration: "36 horas",
    team: "4 personas",
    problem:
      "Las PYMES mexicanas no tienen acceso a asesoría financiera personalizada de bajo costo. Los reportes bancarios tradicionales son reactivos y poco accionables.",
    approach: [
      "Diseñamos un dashboard conversacional que combina datos transaccionales con un asistente basado en Google Gemini.",
      "Integramos MCP (Model Context Protocol) para dar al LLM acceso estructurado a la información del negocio.",
      "Construimos vistas específicas para flujo de caja, proyección y recomendaciones automatizadas.",
    ],
    outcome: [
      "Demo funcional terminada en 36h con datos sintéticos realistas.",
      "Seleccionado entre los proyectos presentados en el reto Banorte Open Innovation.",
      "Arquitectura lo suficientemente limpia para continuar el desarrollo post-hackathon.",
    ],
    learnings: [
      "Diseñar prompts y tool-calling en el contexto de productos, no juguetes.",
      "Priorizar lo imprescindible cuando el tiempo es el principal constraint.",
      "Comunicación técnica rápida en un equipo que no se conocía previamente.",
    ],
    cover: "/projects/covers/banorte.png",
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
    slug: "ambulance-system-manager",
    title: "Ambulance System Manager",
    subtitle: "Solución clínica full-stack",
    category: "app",
    stack: "FastAPI · Python · SwiftUI · Microsoft SQL Server",
    stackBadges: ["SwiftUI", "MSQLServer", "FastAPI", "Python"],
    description:
      "Sistema con Clínica Nova para gestionar ambulancias y citas programadas. Control operativo y eficiencia en traslados.",
    role: "Full-stack · SwiftUI",
    duration: "4 meses",
    team: "5 personas",
    problem:
      "Clínica Nova asignaba ambulancias manualmente en papel, generando conflictos de horario, viajes vacíos y retrasos que impactaban directamente al paciente.",
    approach: [
      "Modelo de datos normalizado en SQL Server cubriendo pacientes, citas, unidades y choferes.",
      "API en FastAPI con reglas de negocio para evitar doble-reserva y calcular asignación óptima.",
      "Interfaz iOS en SwiftUI para operadores, priorizando tareas de alta frecuencia.",
    ],
    outcome: [
      "Reducción del tiempo de asignación manual de minutos a segundos en demo.",
      "Entregado como proyecto evaluado con cliente real (stakeholders de la clínica).",
      "Documentación técnica y de negocio completas para continuidad del proyecto.",
    ],
    learnings: [
      "Trabajar con restricciones de negocio reales y stakeholders no técnicos.",
      "Separar responsabilidades entre API, modelo y cliente cuando el equipo es grande.",
      "Balancear tiempo de diseño vs iteración cuando el cliente aún está definiendo alcance.",
    ],
    cover: "/projects/covers/nova.png",
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
    slug: "kent",
    title: "Kent",
    subtitle: "Finanzas personales en escritorio",
    category: "app",
    stack: "React · TypeScript · Electron · Express · Prisma · SQLite",
    stackBadges: ["React", "SQLite", "Prisma", "Electron"],
    description:
      "App de finanzas con cliente Electron y API Express. Ingresos, gastos, cuentas, suscripciones y reportes con gráficas.",
    role: "Full-stack",
    team: "Individual",
    problem:
      "Llevar el control de ingresos, gastos, cuentas y suscripciones repartido entre apps genéricas no daba visibilidad real de hacia dónde iba el dinero mes a mes.",
    approach: [
      "Cliente de escritorio en Electron + React para una experiencia rápida y offline-first.",
      "API en Express con Prisma sobre SQLite para persistencia local sin depender de un servidor externo.",
      "Módulos dedicados para cuentas, movimientos, categorías y suscripciones recurrentes.",
      "Vistas de reportes con gráficas para visualizar tendencias de gasto e ingreso.",
    ],
    outcome: [
      "App funcional de uso diario, con flujo completo desde login hasta reportes.",
      "Modelo de datos relacional limpio gracias a Prisma, fácil de extender con nuevos módulos.",
      "Base para seguir agregando funcionalidad (presupuestos, metas) sin rehacer la arquitectura.",
    ],
    learnings: [
      "Diseñar un esquema de datos relacional desde cero pensando en reportes futuros.",
      "Empaquetar y distribuir una app Electron con un backend propio embebido.",
      "Mantener consistencia de UI/UX en un proyecto personal sin presión de deadline externo.",
    ],
    image: "/projects/kent/resumen.jpg",
    gallery: [
      { src: "/projects/kent/login.jpg", alt: "Pantalla de acceso de Kent" },
      { src: "/projects/kent/resumen.jpg", alt: "Resumen financiero de Kent" },
      { src: "/projects/kent/movimientos.jpg", alt: "Movimientos en Kent" },
      { src: "/projects/kent/categorias.jpg", alt: "Categorías en Kent" },
      { src: "/projects/kent/cuentas.jpg", alt: "Cuentas en Kent" },
      { src: "/projects/kent/suscripciones.jpg", alt: "Suscripciones en Kent" },
      { src: "/projects/kent/reportes.jpg", alt: "Reportes en Kent" },
    ],
    href: "https://github.com/ManuelPerezF/kent",
    github: "https://github.com/ManuelPerezF/kent",
    badge: "Proyecto personal",
  },
];

export const projects = [...webProjects, ...appProjects];

export const stackCategories: StackCategory[] = [
  {
    label: "Frontend",
    tools: [
      { name: "React", icon: "logos:react" },
      { name: "Next.js", icon: "logos:nextjs-icon" },
      { name: "Vite", icon: "logos:vitejs" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
      { name: "SwiftUI", icon: "logos:swift" },
    ],
  },
  {
    label: "Backend",
    tools: [
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "Express", icon: "simple-icons:express" },
      { name: "FastAPI", icon: "logos:fastapi-icon" },
      { name: "Prisma", icon: "simple-icons:prisma" },
    ],
  },
  {
    label: "Base de datos",
    tools: [
      { name: "Oracle DB", icon: "logos:oracle" },
      { name: "Microsoft SQL Server", icon: "simple-icons:microsoftsqlserver" },
      { name: "SQLite", icon: "logos:sqlite" },
      { name: "Supabase", icon: "logos:supabase-icon" },
      { name: "MongoDB", icon: "logos:mongodb-icon" },
    ],
  },
  {
    label: "DevOps / Tools",
    tools: [
      { name: "Git", icon: "logos:git-icon" },
      { name: "Docker", icon: "logos:docker-icon" },
      { name: "Postman", icon: "logos:postman-icon" },
      { name: "Figma", icon: "logos:figma" },
    ],
  },
];

export const menuLinks: { label: string; section: SectionId }[] = [
  { label: "Proyectos", section: "projects" },
  { label: "Stack", section: "skills" },
  { label: "Contacto", section: "contact" },
  { label: "Sobre mí", section: "about" },
];

export const sectionLabels: Record<SectionId, string> = {
  projects: "Proyectos",
  skills: "Stack",
  about: "Sobre mí",
  contact: "Contacto",
};

export const footerLinks = [
  { label: "github", href: person.github },
  { label: "linkedin", href: person.linkedin },
  { label: "email", href: `mailto:${person.email}` },
];

