# Current Feature: Project Setup

Scaffold the Next.js app with TypeScript, Tailwind CSS v4, shadcn/ui, the prototype's theme tokens and fonts, light/dark mode, Vitest and git. No content or real pages yet. Spec: `context/features/01-project-setup-spec.md`.

## Status

In Progress

## Goals

- Next.js scaffolded (TypeScript, ESLint, Tailwind, App Router, `src/`, `@/*` alias) without overwriting `CLAUDE.md`, `AGENTS.md`, `context/` or `.claude/` (merge any generated agent rules into ours)
- Default boilerplate page, assets and styles removed
- `git init` on `main`; `.gitignore` covers `.env*` (not `.env.example`), `node_modules`, `.next`, `.vercel`, `.playwright-mcp`
- Public GitHub repo `michaelhughes45/portfolio` created and set as `origin` (ask before pushing) — done: repo created by Michael, `origin` added
- shadcn/ui initialized with `button` only
- Theme tokens in `src/app/globals.css` from `context/mockup/README.md`: light on `:root`, dark on `.dark`, extras (`--brand`, `--brand-soft`, `--surface-2`, `--faint`, `--code-bg`) exposed via `@theme inline`; `@custom-variant dark (&:where(.dark, .dark *));`
- Dark mode via `next-themes` (`attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`), `suppressHydrationWarning` on `<html>`
- Fonts via `next/font/google`: Bricolage Grotesque (600/700/800) → `font-display`, Inter (400/500/600) → `font-sans`, JetBrains Mono (500/600) → `font-mono`
- Placeholder home page: "Michael Hughes" display heading, muted text, primary button, mono chip, theme toggle
- Vitest: `vitest.config.mts` (Node env, `@/` alias, `include: ['src/**/*.test.ts']`, `restoreMocks`), scripts `test` / `test:watch`, a `cn()` test in `src/lib/utils.test.ts`
- `src/config/site.ts` with name, role line, GitHub URL, placeholders for email, LinkedIn, résumé path, bio, and `siteUrl`
- Short `README.md`: what the site is, commands, how to add a project (`/add-project`)
- `npm run lint`, `npm test`, `npm run build` all pass

## Notes

- Files: `package.json`, `src/app/layout.tsx` (title "Michael Hughes · Portfolio"), `src/app/globals.css`, `src/app/page.tsx`, `src/components/theme-provider.tsx`, `src/components/layout/ThemeToggle.tsx`, `src/lib/utils.ts` + test, `src/config/site.ts`, `vitest.config.mts`, `.gitignore`, `README.md`
- Check the installed Next.js docs (`node_modules/next/dist/docs/`) or Context7 for current Next.js / Tailwind v4 setup. No `tailwind.config.*`.
- shadcn's `--accent` is a hover color. Site-wide color is `--brand`; per-project colors are `--project` / `--project-2` (the prototype's `--accent`/`--accent2` get renamed when ported).
- Theme toggle is a client component that renders nothing theme-specific until mounted (avoid hydration mismatch).
- Verify in the browser: all three fonts show, toggle switches light/dark with prototype colors.

## History

<!-- Keep this updated.  Earliest to latest -->

- **2026-11-09 — Planning and Prototype:** Agreed the plan (static Next.js site on Vercel, no database, one MDX file per project, home page + one case-study page per project, Projects menu in the nav) and the visual design. HTML prototype in `context/mockup/` with Task Master, PokéTTRPG and Ez Rentals. DevStash left out for now. Context docs, 11 feature specs, agents and skills written.
