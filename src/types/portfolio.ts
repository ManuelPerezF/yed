export type SectionId = "projects" | "skills" | "about" | "contact";

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  title: string;
  subtitle?: string;
  category: "web" | "app";
  stack: string;
  description: string;
  image?: string;
  gallery?: ProjectImage[];
  href: string;
  github?: string;
  badge?: string;
};

export type SkillContext = {
  project: string;
  context: string;
  tools: string[];
};
