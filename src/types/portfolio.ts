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
  stackBadges: string[];
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

export type StackTool = {
  name: string;
  icon: string;
};

export type StackCategory = {
  label: string;
  tools: StackTool[];
};
