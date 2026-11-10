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
- **2026-11-10 — 03 Layout Shell:** `src/components/layout/`: `SiteHeader` (sticky, `bg-background/78` + blur, 64px, Home/About hidden below `sm`), `ProjectsMenu` (shadcn `dropdown-menu`, `modal={false}`, swatch via `--project`/`--project-2`, `aria-current` from `usePathname`, takes `ProjectsMenuItem[]` props), `SiteFooter`, `SkipLink` (fixed, translated off-screen until focused). Root layout: body is a flex column with `<main id="main" tabIndex={-1}>`; pages must not render their own `<main>`. `not-found.tsx` with Back home / See the projects (`/#projects`). `globals.css`: `bg-logo` utility, `html { scroll-padding-top: 80px }`, `overflow-x: clip` on body only. `siteConfig` gained `initials` and `footerNote`. Temporary `src/config/temp-projects.ts` feeds the menu until spec 04 removes it. Menu type text uses `text-muted-foreground` (`text-faint` fails 4.5:1 on cards). Nav links are 44px tall for tap size. Dev server's file watcher can miss edits on Windows; restart it if changes don't show.
- **2026-11-10 — 04 Content Pipeline:** `src/lib/content/`: `schema.ts` (Zod 4 `strictObject`, so unknown fields fail; icons from `PROJECT_ICON_NAMES`), `parse.ts` (pure: `parseProjectFile`, `prepareProjects` for draft filter/sort/duplicate order, `findAdjacent` with wrap, `ContentError` with `file: field: message` lines), `projects.ts` (`server-only`; `loadProjects({ contentDir, publicDir, production })` for tests, cached `getAllProjects`, `getProject`, `getAdjacentProjects` which returns `null` for unknown slugs and the project itself when there's only one). Missing cover fails production builds, warns in dev. MDX body via `next-mdx-remote-client/rsc` (`next-mdx-remote` is archived) in `src/components/project/ProjectBody.tsx`: headings become h3/h4, imports/exports disabled, external links get an icon. `content/projects/_template.mdx` and `task-master.mdx`; `public/projects/task-master/cover.png` is a generated placeholder until spec 07. `npm run check:content` (`tsx scripts/check-content.ts`). Root layout feeds the Projects menu from `getAllProjects()`; `temp-projects.ts` removed. 34 tests using fixtures in `src/lib/content/__fixtures__/`.
