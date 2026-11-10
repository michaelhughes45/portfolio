import path from "node:path";
import matter from "gray-matter";
import type { z } from "zod";
import { projectSchema, type Project } from "./schema";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class ContentError extends Error {
  constructor(public readonly problems: string[]) {
    super(problems.join("\n"));
    this.name = "ContentError";
  }
}

/** Files the loader reads: `.mdx`, not starting with `_`. */
export function isProjectFile(fileName: string) {
  return fileName.endsWith(".mdx") && !fileName.startsWith("_");
}

function formatIssues(file: string, error: z.ZodError) {
  return error.issues.map((issue) => {
    const field = issue.path.length > 0 ? issue.path.join(".") : "frontmatter";
    return `${file}: ${field}: ${issue.message}`;
  });
}

/**
 * Parses and validates one project file.
 * `file` is the path shown in errors (e.g. `content/projects/foo.mdx`); the slug is its base name.
 */
export function parseProjectFile(file: string, source: string): Project {
  const slug = path.basename(file, ".mdx");
  const problems: string[] = [];

  if (!SLUG_PATTERN.test(slug)) {
    problems.push(`${file}: slug: "${slug}" must be lowercase kebab-case (e.g. my-project)`);
  }

  let parsed: matter.GrayMatterFile<string>;
  try {
    parsed = matter(source);
  } catch (error) {
    const reason = error instanceof Error ? error.message.split("\n")[0] : String(error);
    throw new ContentError([...problems, `${file}: frontmatter: Invalid YAML (${reason})`]);
  }

  const result = projectSchema.safeParse(parsed.data);
  if (!result.success) problems.push(...formatIssues(file, result.error));
  if (problems.length > 0 || !result.success) throw new ContentError(problems);

  return { ...result.data, slug, body: parsed.content.trim() };
}

interface CollectionOptions {
  /** Drop `draft: true` projects (production builds). */
  production: boolean;
}

/** Filters drafts (production only), sorts by `order` and rejects duplicate orders. */
export function prepareProjects(projects: Project[], { production }: CollectionOptions): Project[] {
  const visible = production ? projects.filter((p) => !p.draft) : projects;
  const sorted = [...visible].sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));

  const published = sorted.filter((p) => !p.draft);
  const problems: string[] = [];
  published.forEach((p, i) => {
    const earlier = published.slice(0, i).find((q) => q.order === p.order);
    if (earlier) {
      problems.push(`content/projects/${p.slug}.mdx: order: ${p.order} is already used by ${earlier.slug}`);
    }
  });
  if (problems.length > 0) throw new ContentError(problems);

  return sorted;
}

/** Previous and next project in display order, wrapping around. `null` when the slug isn't found. */
export function findAdjacent(projects: Project[], slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  const count = projects.length;
  return {
    prev: projects[(index - 1 + count) % count],
    next: projects[(index + 1) % count],
  };
}
