import { z } from "zod";
import { PROJECT_ICON_NAMES } from "@/components/shared/ProjectIcon";

const HEX_COLOR = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

const text = z.string().trim().min(1, "Required");
const hexColor = z.string().regex(HEX_COLOR, "Invalid hex color");
const httpsUrl = z.url({ protocol: /^https$/, error: "Invalid https:// URL" });

const featureSchema = z.strictObject({
  icon: z.enum(PROJECT_ICON_NAMES, {
    error: `Unknown icon (allowed: ${PROJECT_ICON_NAMES.join(", ")})`,
  }),
  title: text,
  text: text,
});

const stackItemSchema = z.strictObject({
  name: text,
  short: z.string().trim().min(1, "Must be 1–2 characters").max(2, "Must be 1–2 characters"),
  why: text,
});

const stackGroupSchema = z.strictObject({
  group: text,
  items: z.array(stackItemSchema).min(1, "Needs 1–6 items").max(6, "Needs 1–6 items"),
});

const flowNodeSchema = z.strictObject({
  title: text,
  sub: text,
  label: text.optional(),
  main: z.boolean().optional(),
});

const extraSchema = z.strictObject({
  tag: text,
  title: text,
  sub: text,
});

const challengeSchema = z.strictObject({
  title: text,
  text: text,
});

export const projectSchema = z.strictObject({
  name: text,
  tagline: text,
  order: z.number().int("Must be a whole number").positive("Must be 1 or more"),
  draft: z.boolean().default(false),
  status: text,
  type: text,
  role: text,
  timeline: z.string("Must be a string (quote it, e.g. \"2026\")").trim().min(1, "Required"),
  accent: hexColor,
  accent2: hexColor,
  live: httpsUrl,
  repo: httpsUrl,
  cover: z.string().regex(/^\/\S+\.(?:png|webp|jpe?g)$/, "Must be a path in public/ like /projects/<slug>/cover.png"),
  coverAlt: text,
  chips: z.array(text).min(3, "Needs 3–8 chips").max(8, "Needs 3–8 chips"),
  highlights: z.array(text).length(3, "Needs exactly 3 highlights"),
  problem: text,
  solution: text,
  features: z.array(featureSchema).min(4, "Needs 4–6 features").max(6, "Needs 4–6 features"),
  stack: z.array(stackGroupSchema).min(1, "Needs 1–4 groups").max(4, "Needs 1–4 groups"),
  arch: z.strictObject({
    flow: z.array(flowNodeSchema).min(2, "Needs 2–4 nodes").max(4, "Needs 2–4 nodes"),
    extras: z.array(extraSchema).max(3, "Needs 0–3 extras").default([]),
  }),
  challenges: z.array(challengeSchema).min(2, "Needs 2–4 challenges").max(4, "Needs 2–4 challenges"),
});

export type ProjectFrontmatter = z.infer<typeof projectSchema>;

export type Project = ProjectFrontmatter & { slug: string; body: string };
