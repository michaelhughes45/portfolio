import type { ProjectsMenuItem } from "@/components/layout/ProjectsMenu";

// Temporary menu items from context/mockup/data.js. Spec 04 replaces this with the content loader.
export const TEMP_PROJECTS: ProjectsMenuItem[] = [
  { slug: "task-master", name: "Task Master", type: "Installable web app (PWA)", accent: "#16a34a", accent2: "#0ea5e9" },
  { slug: "pokettrpg", name: "PokéTTRPG", type: "Multiplayer web app", accent: "#e11d48", accent2: "#f59e0b" },
  { slug: "ez-rentals", name: "Ez Rentals", type: "Full-stack web app", accent: "#0d9488", accent2: "#6366f1" },
];
