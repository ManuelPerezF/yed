type StackIcon = {
  slug: string;
  color: string;
};

const STACK_ICON_MAP: Record<string, StackIcon> = {
  react: { slug: "react", color: "61DAFB" },
  vite: { slug: "vite", color: "646CFF" },
  typescript: { slug: "typescript", color: "3178C6" },
  "node.js": { slug: "nodedotjs", color: "5FA04E" },
  nodejs: { slug: "nodedotjs", color: "5FA04E" },
  express: { slug: "express", color: "000000" },
  "oracle db": { slug: "oracle", color: "F80000" },
  oracle: { slug: "oracle", color: "F80000" },
  oracledb: { slug: "oracle", color: "F80000" },
  "next.js": { slug: "nextdotjs", color: "000000" },
  nextjs: { slug: "nextdotjs", color: "000000" },
  next: { slug: "nextdotjs", color: "000000" },
  msqlserver: { slug: "microsoftsqlserver", color: "CC2927" },
  supabase: { slug: "supabase", color: "3FCF8E" },
  "google gemini": { slug: "googlegemini", color: "8E75B2" },
  fastapi: { slug: "fastapi", color: "009688" },
  python: { slug: "python", color: "3776AB" },
  swiftui: { slug: "swift", color: "F05138" },
  "microsoft sql server": { slug: "microsoftsqlserver", color: "CC2927" },
  electron: { slug: "electron", color: "47848F" },
  prisma: { slug: "prisma", color: "2D3748" },
  sqlite: { slug: "sqlite", color: "003B57" },
  jwt: { slug: "jsonwebtokens", color: "000000" },
  cloudinary: { slug: "cloudinary", color: "3448C5" },
  mcp: { slug: "mcp", color: "000000" },
};

const CUSTOM_ICON_URLS: Record<string, string> = {
  oracle: "https://api.iconify.design/devicon/oracle.svg",
  microsoftsqlserver:
    "https://api.iconify.design/devicon/microsoftsqlserver.svg",
  vite: "https://api.iconify.design/devicon/vitejs.svg",
  fastapi: "https://api.iconify.design/devicon/fastapi.svg",
  mcp: "https://api.iconify.design/bxl/mcp.svg",
};

function normalizeStackName(tech: string): string {
  return tech
    .toLowerCase()
    .replace(/\s+\d+(\.\d+)?$/g, "")
    .replace(/[^a-z0-9.]/g, "")
    .trim();
}

export function getStackIcon(tech: string): StackIcon | null {
  const normalized = normalizeStackName(tech);
  return STACK_ICON_MAP[normalized] ?? null;
}

export function getStackIconUrl(tech: string): string | null {
  const icon = getStackIcon(tech);
  if (!icon) return null;

  if (CUSTOM_ICON_URLS[icon.slug]) {
    return CUSTOM_ICON_URLS[icon.slug];
  }

  return `https://cdn.simpleicons.org/${icon.slug}/${icon.color}`;
}

export function parseProjectStack(stack: string): string[] {
  return stack.split(" · ").map((item) => item.trim()).filter(Boolean);
}

const MAX_STACK_BADGES = 4;

export function getFeaturedStack(stack: string): string[] {
  const items = parseProjectStack(stack);
  const withIcons = items.filter((item) => getStackIcon(item));
  const withoutIcons = items.filter((item) => !getStackIcon(item));

  return [...withIcons, ...withoutIcons].slice(0, MAX_STACK_BADGES);
}

export function getStackDisplayLabel(tech: string): string {
  const normalized = normalizeStackName(tech);
  const labels: Record<string, string> = {
    react: "React",
    express: "Express",
    oracledb: "Oracle",
    oracle: "Oracle",
    vite: "Vite",
    next: "Next.js",
    nextjs: "Next.js",
    supabase: "Supabase",
    mcp: "MCP",
    swiftui: "SwiftUI",
    msqlserver: "SQL Server",
    fastapi: "FastAPI",
    python: "Python",
    sqlite: "SQLite",
    prisma: "Prisma",
    electron: "Electron",
  };

  return labels[normalized] ?? tech;
}

export function getStackBadgeLabel(tech: string): string {
  const normalized = normalizeStackName(tech);
  if (normalized === "microsoft sql server") return "SQL";
  if (normalized === "google gemini") return "Gemini";
  if (normalized === "node.js") return "Node";
  if (normalized === "next.js") return "Next";
  if (normalized === "swiftui") return "Swift";
  if (normalized === "oracledb" || normalized === "oracle") return "Oracle";
  if (normalized === "msqlserver") return "SQL";
  if (normalized === "mcp") return "MCP";
  if (normalized === "next") return "Next";

  return tech
    .replace(/\s+\d+(\.\d+)?$/g, "")
    .split(" ")
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 3);
}
