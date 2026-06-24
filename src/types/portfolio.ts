export type SectionId = "projects" | "skills" | "about" | "contact";

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  category: "web" | "app";
  stack: string;
  description: string;
  cover?: string;
  image?: string;
  gallery?: ProjectImage[];
  href: string;
  github?: string;
  badge?: string;
  role?: string;
  duration?: string;
  team?: string;
  problem: string;
  approach: string[];
  outcome: string[];
  learnings: string[];
};

export type SkillContext = {
  project: string;
  context: string;
  tools: string[];
};
