import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { ContentError } from "./parse";
import { loadProjects } from "./projects";

vi.mock("server-only", () => ({}));

const FIXTURES = path.join(__dirname, "__fixtures__");
const PUBLIC_DIR = path.join(FIXTURES, "public");

function load(folder: string, production: boolean) {
  return loadProjects({ contentDir: path.join(FIXTURES, folder), publicDir: PUBLIC_DIR, production });
}

describe("loadProjects", () => {
  it("loads every project except underscored files, sorted by order, with drafts in dev", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(load("projects", false).map((p) => p.slug)).toEqual(["beta", "alpha", "gamma-draft"]);
    expect(warn).toHaveBeenCalledWith(
      "[content] content/projects/gamma-draft.mdx: cover: /projects/gamma-draft/cover.png not found in public/",
    );
  });

  it("drops drafts in production, so their missing cover doesn't fail the build", () => {
    expect(load("projects", true).map((p) => p.slug)).toEqual(["beta", "alpha"]);
  });

  it("fails on duplicate orders", () => {
    expect(() => load("duplicate-order", true)).toThrow("content/projects/beta.mdx: order: 1 is already used by alpha");
  });

  it("fails in production when a cover is missing", () => {
    const run = () =>
      loadProjects({ contentDir: path.join(FIXTURES, "projects"), publicDir: path.join(FIXTURES, "missing"), production: true });
    expect(run).toThrow(ContentError);
    expect(run).toThrow("content/projects/beta.mdx: cover: /projects/beta/cover.png not found in public/");
  });
});
