import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ContentError, findAdjacent, isProjectFile, parseProjectFile, prepareProjects } from "./parse";
import type { Project } from "./schema";

const VALID_SOURCE = readFileSync(path.join(__dirname, "__fixtures__", "valid.mdx"), "utf8");

function problemsFrom(run: () => unknown) {
  try {
    run();
  } catch (error) {
    expect(error).toBeInstanceOf(ContentError);
    return (error as ContentError).problems;
  }
  throw new Error("Expected a ContentError");
}

function project(slug: string, order: number, draft = false) {
  return { ...parseProjectFile(`content/projects/${slug}.mdx`, VALID_SOURCE), slug, order, draft } as Project;
}

describe("parseProjectFile", () => {
  it("adds the slug from the filename and the trimmed body", () => {
    const result = parseProjectFile("content/projects/alpha.mdx", VALID_SOURCE);
    expect(result.slug).toBe("alpha");
    expect(result.name).toBe("Alpha Project");
    expect(result.body).toBe("Some **body** text.");
  });

  it("names the file and field in errors", () => {
    const source = VALID_SOURCE.replace('accent: "#16a34a"', 'accent: "green"');
    expect(problemsFrom(() => parseProjectFile("content/projects/foo.mdx", source))).toEqual([
      "content/projects/foo.mdx: accent: Invalid hex color",
    ]);
  });

  it.each(["My-Project", "my_project", "my--project", "-project"])("rejects the slug %s", (slug) => {
    const problems = problemsFrom(() => parseProjectFile(`content/projects/${slug}.mdx`, VALID_SOURCE));
    expect(problems).toEqual([`content/projects/${slug}.mdx: slug: "${slug}" must be lowercase kebab-case (e.g. my-project)`]);
  });

  it("reports invalid YAML", () => {
    const problems = problemsFrom(() => parseProjectFile("content/projects/foo.mdx", "---\nname: [oops\n---\n"));
    expect(problems[0]).toMatch(/^content\/projects\/foo\.mdx: frontmatter: Invalid YAML/);
  });
});

describe("isProjectFile", () => {
  it("skips underscored and non-MDX files", () => {
    expect(isProjectFile("alpha.mdx")).toBe(true);
    expect(isProjectFile("_template.mdx")).toBe(false);
    expect(isProjectFile("notes.md")).toBe(false);
  });
});

describe("prepareProjects", () => {
  const projects = [project("charlie", 3), project("alpha", 1), project("draft-one", 2, true)];

  it("sorts by order and keeps drafts outside production", () => {
    expect(prepareProjects(projects, { production: false }).map((p) => p.slug)).toEqual(["alpha", "draft-one", "charlie"]);
  });

  it("drops drafts in production", () => {
    expect(prepareProjects(projects, { production: true }).map((p) => p.slug)).toEqual(["alpha", "charlie"]);
  });

  it("rejects duplicate orders among published projects", () => {
    expect(problemsFrom(() => prepareProjects([project("alpha", 1), project("beta", 1)], { production: true }))).toEqual([
      "content/projects/beta.mdx: order: 1 is already used by alpha",
    ]);
  });

  it("allows a draft to share an order", () => {
    expect(() => prepareProjects([project("alpha", 1), project("beta", 1, true)], { production: false })).not.toThrow();
  });
});

describe("findAdjacent", () => {
  const projects = [project("a", 1), project("b", 2), project("c", 3)];
  const slugs = (slug: string) => {
    const adjacent = findAdjacent(projects, slug);
    return adjacent && [adjacent.prev.slug, adjacent.next.slug];
  };

  it("returns the neighbors and wraps around at both ends", () => {
    expect(slugs("b")).toEqual(["a", "c"]);
    expect(slugs("a")).toEqual(["c", "b"]);
    expect(slugs("c")).toEqual(["b", "a"]);
  });

  it("returns null for an unknown slug", () => {
    expect(findAdjacent(projects, "missing")).toBeNull();
  });
});
