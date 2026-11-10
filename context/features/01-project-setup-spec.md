# Project Setup

## Overview

Scaffold the Next.js app with TypeScript, Tailwind CSS v4, shadcn/ui, the prototype's theme tokens and fonts, light/dark mode, Vitest and git. No content or real pages yet.

## Requirements

- Scaffold with Create Next App: TypeScript, ESLint, Tailwind CSS, App Router, `src/` directory, `@/*` import alias.
  - The folder already has `CLAUDE.md`, `AGENTS.md`, `.mcp.json`, `.claude/` and `context/`. Scaffold into a temporary folder and move the files in, or use whatever flag the installed version offers. **Never overwrite `CLAUDE.md`, `AGENTS.md` or anything in `context/` or `.claude/`.** If Next.js generates its own `AGENTS.md`/`CLAUDE.md` content, merge its block into ours.
- Remove the default boilerplate page, assets and styles.
- `git init` on `main`. `.gitignore` covers `.env*` (but not `.env.example`), `node_modules`, `.next`, `.vercel`, `.playwright-mcp`.
- Create the public GitHub repo `michaelhughes45/portfolio` and add it as `origin` (ask before pushing).
- Initialize shadcn/ui and add `button` only for now.
- **Theme tokens** in `src/app/globals.css` from `context/mockup/README.md`:
  - Light values on `:root`, dark values on `.dark`, using the shadcn variable names in the README table.
  - Extra tokens shadcn doesn't have (`--brand`, `--brand-soft`, `--surface-2`, `--faint`, `--code-bg`) exposed via `@theme inline` (e.g. `bg-brand-soft`, `text-faint`, `bg-code`).
  - `@custom-variant dark (&:where(.dark, .dark *));`
- **Dark mode** with `next-themes`: `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`. Add `suppressHydrationWarning` on `<html>`.
- **Fonts** with `next/font/google`: Bricolage Grotesque (600, 700, 800) as `--font-display`, Inter (400, 500, 600) as `--font-sans`, JetBrains Mono (500, 600) as `--font-mono`, wired into the Tailwind theme as `font-display`, `font-sans`, `font-mono`.
- **Placeholder home page**: "Michael Hughes" heading in the display font, a line of muted text, a primary button, a chip in mono, and a theme toggle, so tokens and fonts can be checked in both modes.
- **Vitest**: `vitest.config.mts` (Node environment, `@/` alias, `include: ['src/**/*.test.ts']`, `restoreMocks`). Scripts `test` (`vitest run`) and `test:watch`. One test for `cn()` in `src/lib/utils.test.ts`.
- `src/config/site.ts` with the site-wide values from `context/project-overview.md` (name, role line, GitHub URL; placeholders for email, LinkedIn, résumé path and bio) and `siteUrl` (placeholder until spec 10).
- Short `README.md`: what the site is, commands, how to add a project (points to `/add-project`).

## Files to Create / Modify

1. `package.json`: scripts `dev`, `build`, `start`, `lint`, `test`, `test:watch`
2. `src/app/layout.tsx`: fonts, `ThemeProvider`, metadata (title "Michael Hughes · Portfolio")
3. `src/app/globals.css`: tokens for light and dark, `@theme inline`
4. `src/app/page.tsx`: placeholder page
5. `src/components/theme-provider.tsx`, `src/components/layout/ThemeToggle.tsx`
6. `src/lib/utils.ts` (from shadcn) and `src/lib/utils.test.ts`
7. `src/config/site.ts`
8. `vitest.config.mts`, `.gitignore`, `README.md`

## Key Gotchas

- Use Context7 or `node_modules/next/dist/docs/` for the current Next.js and Tailwind v4 setup. Don't create `tailwind.config.*`.
- shadcn's own `--accent` is a hover color. Our site-wide color is `--brand`; project colors are `--project` / `--project-2`, set per project at runtime (see coding standards). The prototype calls them `--accent`/`--accent2`; rename when porting.
- `next-themes` toggles must be client components and render nothing theme-specific until mounted (avoid hydration mismatch).

## Testing

1. `npm run dev`: placeholder page shows all three fonts, the toggle switches light/dark with the prototype colors.
2. `npm run lint`, `npm test`, `npm run build` all pass.

## References

- `context/mockup/README.md` (tokens), `context/mockup/styles.css`
- https://ui.shadcn.com/docs/installation/next · https://ui.shadcn.com/docs/dark-mode/next
