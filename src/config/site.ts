import { Code, Database, FileText, FlaskConical, GitBranch, Rocket, Server, Wrench, type LucideIcon } from "lucide-react";
import { numberWord } from "@/lib/format";

/** A value in the hero code card. `{ projectCount: true }` is replaced with the number of live projects. */
export type CodeValue = string | string[] | boolean | { projectCount: true };

export interface CodeField {
  key: string;
  value: CodeValue;
  comment?: string;
}

export interface Step {
  title: string;
  text: string;
  icon: LucideIcon;
}

export interface ToolGroup {
  title: string;
  icon: LucideIcon;
  items: string[];
}

export const siteConfig = {
  name: "Michael Hughes",
  initials: "MH",
  role: "Full-stack developer",
  status: "Open to full-stack and front-end roles",
  description:
    "Michael Hughes is a full-stack developer working in TypeScript, React and Node. Live, deployed projects with a case study for each.",
  // Placeholder until spec 10 picks the *.vercel.app name.
  siteUrl: "https://portfolio.vercel.app",
  links: {
    github: "https://github.com/michaelhughes45",
    // TODO(spec 08): real email (as "mailto:…"), LinkedIn URL and "/resume.pdf" once they exist.
    email: "#",
    linkedin: "#",
    resume: "#",
  },
  footerNote: "Built with Next.js · Hosted on Vercel",
  // TODO(spec 08): Michael's real bio.
  bio: "[Short bio placeholder: where you studied, what you enjoy building, what kind of role you're looking for.]",

  hero: {
    headline: { line1: "I build web apps", line2: "that", highlight: "ship." },
    lead: (projectCount: number) =>
      `I'm Michael, a full-stack developer working in TypeScript, React and Node. I take projects from a written spec to a tested, deployed app. ${
        projectCount === 1 ? "Here's one that's" : `Here are ${numberWord(projectCount)} that are`
      } live right now.`,
  },

  codeCard: {
    fileName: "michael.ts",
    variable: "michael",
    fields: [
      { key: "role", value: "Full-stack developer" },
      { key: "languages", value: ["TypeScript", "JavaScript"] },
      { key: "frontend", value: ["React", "Next.js", "Tailwind"] },
      { key: "backend", value: ["Node", "Express", "Prisma"] },
      { key: "databases", value: ["Postgres", "MongoDB"] },
      { key: "liveProjects", value: { projectCount: true } },
      { key: "openToWork", value: true, comment: "👋" },
    ] satisfies CodeField[],
  },

  marquee: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Prisma",
    "MongoDB",
    "Tailwind CSS",
    "shadcn/ui",
    "Redux",
    "Vitest",
    "Jest",
    "Vercel",
  ],

  showNextProjectCard: true,

  sections: {
    work: {
      eyebrow: "Selected work",
      title: "Projects",
      description:
        "Every project is live and has its own page covering what it does, the stack behind it and the hard problems I solved.",
    },
    nextProject: {
      title: "Next project",
      text: "In progress. New projects get a card here and their own page.",
    },
    how: {
      eyebrow: "Process",
      title: "How I build",
      description: "Every feature follows the same loop, whether it's a login page or a battle engine.",
    },
    toolbox: { eyebrow: "Toolbox", title: "What I work with" },
    about: { eyebrow: "About", title: "Let's build something." },
  },

  steps: [
    {
      title: "Spec it",
      text: "Write a short feature spec with goals and edge cases before writing any code.",
      icon: FileText,
    },
    { title: "Branch it", text: "One branch per feature, with focused, conventional commits.", icon: GitBranch },
    {
      title: "Test it",
      text: "Unit tests for logic, then a check in the browser at desktop and phone sizes.",
      icon: FlaskConical,
    },
    { title: "Ship it", text: "Merge once the build and tests pass, then deploy to Vercel.", icon: Rocket },
  ] satisfies Step[],

  toolbox: [
    {
      title: "Frontend",
      icon: Code,
      items: ["React", "Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Redux", "Material UI"],
    },
    { title: "Backend", icon: Server, items: ["Node", "Express", "Server Actions", "REST", "JWT", "Better Auth"] },
    { title: "Data", icon: Database, items: ["PostgreSQL", "Prisma", "MongoDB", "Mongoose", "Neon"] },
    { title: "Tooling", icon: Wrench, items: ["Git", "Vitest", "Jest", "Playwright", "Vercel", "Render"] },
  ] satisfies ToolGroup[],
};
