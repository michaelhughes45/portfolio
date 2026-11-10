import { readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { projectSchema } from "./schema";

const VALID = matter(readFileSync(path.join(__dirname, "__fixtures__", "valid.mdx"), "utf8")).data;

function validate(overrides: Record<string, unknown>) {
  return projectSchema.safeParse({ ...VALID, ...overrides });
}

function firstIssue(overrides: Record<string, unknown>) {
  const result = validate(overrides);
  expect(result.success).toBe(false);
  return result.error!.issues[0];
}

describe("projectSchema", () => {
  it("accepts the valid fixture and defaults draft to false", () => {
    const result = validate({});
    expect(result.success).toBe(true);
    expect(result.data?.draft).toBe(false);
    expect(result.data?.arch.extras).toEqual([]);
  });

  it("rejects a bad hex color", () => {
    const issue = firstIssue({ accent: "green" });
    expect(issue.path).toEqual(["accent"]);
    expect(issue.message).toBe("Invalid hex color");
  });

  it.each(["http://alpha.example.com/", "not a url", "ftp://alpha.example.com/"])("rejects the URL %s", (live) => {
    const issue = firstIssue({ live });
    expect(issue.path).toEqual(["live"]);
    expect(issue.message).toBe("Invalid https:// URL");
  });

  it("rejects an unknown icon", () => {
    const features = [{ icon: "rocket", title: "T", text: "T" }, ...VALID.features.slice(1)];
    const issue = firstIssue({ features });
    expect(issue.path).toEqual(["features", 0, "icon"]);
    expect(issue.message).toMatch(/^Unknown icon/);
  });

  it("requires exactly 3 highlights", () => {
    const issue = firstIssue({ highlights: ["a", "b", "c", "d"] });
    expect(issue.path).toEqual(["highlights"]);
    expect(issue.message).toBe("Needs exactly 3 highlights");
  });

  it.each([
    ["chips", ["a", "b"]],
    ["features", []],
    ["stack", []],
    ["challenges", [{ title: "T", text: "T" }]],
  ])("enforces the length of %s", (field, value) => {
    expect(firstIssue({ [field]: value }).path).toEqual([field]);
  });

  it("limits the badge to 1–2 characters", () => {
    const stack = [{ group: "G", items: [{ name: "N", short: "Abc", why: "W" }] }];
    expect(firstIssue({ stack }).path).toEqual(["stack", 0, "items", 0, "short"]);
  });

  it("rejects an unquoted numeric timeline", () => {
    expect(firstIssue({ timeline: 2026 }).path).toEqual(["timeline"]);
  });

  it("rejects unknown fields so typos are caught", () => {
    expect(firstIssue({ year: "2026" }).message).toMatch(/year/);
  });
});
