import "server-only";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { ContentError, findAdjacent, isProjectFile, parseProjectFile, prepareProjects } from "./parse";
import type { Project } from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");
const PUBLIC_DIR = path.join(process.cwd(), "public");

interface LoadOptions {
  contentDir: string;
  publicDir: string;
  production: boolean;
}

function readProjects(contentDir: string) {
  const problems: string[] = [];
  const projects: Project[] = [];

  for (const fileName of readdirSync(contentDir).filter(isProjectFile)) {
    const file = path.posix.join("content/projects", fileName);
    try {
      projects.push(parseProjectFile(file, readFileSync(path.join(contentDir, fileName), "utf8")));
    } catch (error) {
      if (!(error instanceof ContentError)) throw error;
      problems.push(...error.problems);
    }
  }

  if (problems.length > 0) throw new ContentError(problems);
  return projects;
}

function checkCovers(projects: Project[], publicDir: string, production: boolean) {
  const missing = projects
    .filter((p) => !existsSync(path.join(publicDir, p.cover)))
    .map((p) => `content/projects/${p.slug}.mdx: cover: ${p.cover} not found in public/`);

  if (missing.length === 0) return;
  if (production) throw new ContentError(missing);
  for (const message of missing) console.warn(`[content] ${message}`);
}

/** Reads, validates and sorts every project. Exported for tests; pages use the cached helpers below. */
export function loadProjects({ contentDir, publicDir, production }: LoadOptions): Project[] {
  const projects = prepareProjects(readProjects(contentDir), { production });
  checkCovers(projects, publicDir, production);
  return projects;
}

export const getAllProjects = cache((): Project[] =>
  loadProjects({
    contentDir: CONTENT_DIR,
    publicDir: PUBLIC_DIR,
    production: process.env.NODE_ENV === "production",
  }),
);

export function getProject(slug: string): Project | null {
  return getAllProjects().find((p) => p.slug === slug) ?? null;
}

export function getAdjacentProjects(slug: string) {
  return findAdjacent(getAllProjects(), slug);
}
