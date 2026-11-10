# Current Feature

<!-- Feature name and short description -->

## Status

<!-- Not Started | In Progress | Completed -->

## Goals

<!-- Goals and requirements -->

## Notes

<!-- Any extra notes -->

## History

<!-- Keep this updated.  Earliest to latest -->

- **2026-11-09 — Planning and Prototype:** Agreed the plan (static Next.js site on Vercel, no database, one MDX file per project, home page + one case-study page per project, Projects menu in the nav) and the visual design. HTML prototype in `context/mockup/` with Task Master, PokéTTRPG and Ez Rentals. DevStash left out for now. Context docs, 11 feature specs, agents and skills written.
- **2026-11-10 — 01 Project Setup:** Scaffolded Next.js 16.4 (App Router, TypeScript, `src/`), Tailwind CSS v4 and shadcn/ui (Radix, `button` only). Prototype tokens for light and dark in `globals.css`, with extras exposed as `bg-brand-soft`, `bg-surface-2`, `bg-bg-2`, `text-faint`, `bg-code`. next-themes light/dark with `ThemeToggle`; fonts via `next/font` (`--font-bricolage`/`--font-inter`/`--font-jetbrains-mono` mapped to `font-display`/`font-sans`/`font-mono`). Vitest with a `cn()` test, `src/config/site.ts`, README. Cache Components turned off (it forbids `dynamicParams = false`, which spec 06 needs). ESLint ignores `context/**`. Repo on `main`, `origin` is `michaelhughes45/portfolio`.
- **2026-11-10 — 02 Design System:** Shared components in `src/components/shared/`: `Section` (+ `Container`, 1160px), `SectionHead` (`accent` uses `--project`), `Chip`, `StatusDot`, `Glow` (sized/colored by className), `ProjectIcon` (exports `ProjectIconName` and `PROJECT_ICON_NAMES` for the spec 04 schema), `BrowserFrame` (shows the gradient + grid placeholder with `name` when the file isn't in `public/`), `Reveal` (Motion `whileInView`, `data-reveal` forced visible in CSS under reduced motion or `scripting: none`). Button variants `default`/`outline`/`accent`, sizes 44px/36px, 18px icons. `globals.css`: `bg-status`, `bg-dot-*`, `shadow-soft`, `bg-grid`, `bg-grid-frame`, `animate-marquee`, bold `h1`–`h3`, `.light` scope. `/dev/ui` preview (404 in production). Added `motion`. Lucide 1.x has no brand icons, so GitHub/LinkedIn need custom SVGs later. Vitest fails from a lowercase `d:\` cwd (duplicate module load); run from `D:\`.
