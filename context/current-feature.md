# Current Feature: 04 Content Pipeline

Load project content from `content/projects/*.mdx`, validate it with Zod, and expose typed helpers for pages. Add the template and the first project (Task Master) to prove the pipeline end to end.

## Status

In Progress

## Goals

- **Schema** `src/lib/content/schema.ts`: Zod version of the Content Model in `context/project-overview.md`
  - hex check for `accent`/`accent2`; `https://` check for `live`/`repo`
  - `icon` as `z.enum(PROJECT_ICON_NAMES)` shared with `ProjectIcon`
  - lengths: `chips` 3–8, `highlights` 3, `features` 4–6, `stack` 1–4 groups of 1–6 items, `arch.flow` 2–4, `arch.extras` 0–3, `challenges` 2–4, `short` 1–2 chars
  - `draft` defaults to `false`; `timeline` is a string
  - `export type Project = z.infer<...> & { slug: string; body: string }`
- **Pure parser** `src/lib/content/parse.ts`: `parseProjectFile` (gray-matter + validate + slug), errors formatted as `content/projects/foo.mdx: accent: Invalid hex color`; kebab-case slug check
- **Loader** `src/lib/content/projects.ts` (`server-only`, React `cache`):
  - `getAllProjects()`: every `.mdx` except `_*`, drafts dropped in production, sorted by `order`, duplicate published `order` is an error
  - `getProject(slug)` → project or `null`; `getAdjacentProjects(slug)` → `{ prev, next }` wrapping around
  - Cover check: `public${cover}` must exist (error in production, warning in dev)
- **MDX body** rendered with an RSC-compatible renderer (check Context7 for the current recommendation), styled to match the site
- `content/projects/_template.mdx` (every field commented with an example) and `content/projects/task-master.mdx` (converted from `context/mockup/data.js`)
- `scripts/check-content.ts` + `npm run check:content`: same validation outside Next.js, pass/fail line per file
- Header Projects menu reads from `getAllProjects()`; remove `src/config/temp-projects.ts`
- Tests: `schema.test.ts`, `parse.test.ts`, `projects.test.ts` using fixtures in `src/lib/content/__fixtures__/`

## Notes

- gray-matter parses unquoted `2026` as a number: schema takes `timeline` as a string, template quotes it.
- File reading stays in `projects.ts`; parsing/validation in `parse.ts` so tests and the script don't need Next.js (no `server-only` import there).
- Tests use fixtures, never the real `content/` folder.
- Test cases: valid fixture passes; bad hex, bad URL, unknown icon, too many highlights, duplicate order, bad slug each fail clearly; drafts filtered in production only; sort order; prev/next wrap.
- Task Master's `public/projects/task-master/cover.png` is a generated placeholder (accent gradient + grid + "screenshot coming soon", 65 KB) so production builds pass. Spec 07 replaces it with the real screenshot.
- MDX renderer: `next-mdx-remote-client/rsc` (`next-mdx-remote` is archived). `ProjectBody` in `src/components/project/` maps body headings to h3/h4 (the Overview section owns the h2); imports/exports disabled. Previewed on `/dev/ui`.
- Pure collection logic (`prepareProjects`, `findAdjacent`, `isProjectFile`) lives in `parse.ts`; `projects.ts` exports `loadProjects({ contentDir, publicDir, production })` for tests and wraps it in React `cache`.
- Schema uses `z.strictObject`, so unknown/misspelled fields fail. `check:content` runs via `tsx`; drafts with a missing cover only warn there.
- `ProjectIcon` already exports `PROJECT_ICON_NAMES` / `ProjectIconName` (spec 02).
- Run Vitest from `D:\` (uppercase) to avoid the duplicate module load issue.
- References: `context/project-overview.md` (Content Model), `context/mockup/data.js`.

## History

<!-- Keep this updated.  Earliest to latest -->

- **2026-11-09 — Planning and Prototype:** Agreed the plan (static Next.js site on Vercel, no database, one MDX file per project, home page + one case-study page per project, Projects menu in the nav) and the visual design. HTML prototype in `context/mockup/` with Task Master, PokéTTRPG and Ez Rentals. DevStash left out for now. Context docs, 11 feature specs, agents and skills written.
- **2026-11-10 — 01 Project Setup:** Scaffolded Next.js 16.4 (App Router, TypeScript, `src/`), Tailwind CSS v4 and shadcn/ui (Radix, `button` only). Prototype tokens for light and dark in `globals.css`, with extras exposed as `bg-brand-soft`, `bg-surface-2`, `bg-bg-2`, `text-faint`, `bg-code`. next-themes light/dark with `ThemeToggle`; fonts via `next/font` (`--font-bricolage`/`--font-inter`/`--font-jetbrains-mono` mapped to `font-display`/`font-sans`/`font-mono`). Vitest with a `cn()` test, `src/config/site.ts`, README. Cache Components turned off (it forbids `dynamicParams = false`, which spec 06 needs). ESLint ignores `context/**`. Repo on `main`, `origin` is `michaelhughes45/portfolio`.
- **2026-11-10 — 02 Design System:** Shared components in `src/components/shared/`: `Section` (+ `Container`, 1160px), `SectionHead` (`accent` uses `--project`), `Chip`, `StatusDot`, `Glow` (sized/colored by className), `ProjectIcon` (exports `ProjectIconName` and `PROJECT_ICON_NAMES` for the spec 04 schema), `BrowserFrame` (shows the gradient + grid placeholder with `name` when the file isn't in `public/`), `Reveal` (Motion `whileInView`, `data-reveal` forced visible in CSS under reduced motion or `scripting: none`). Button variants `default`/`outline`/`accent`, sizes 44px/36px, 18px icons. `globals.css`: `bg-status`, `bg-dot-*`, `shadow-soft`, `bg-grid`, `bg-grid-frame`, `animate-marquee`, bold `h1`–`h3`, `.light` scope. `/dev/ui` preview (404 in production). Added `motion`. Lucide 1.x has no brand icons, so GitHub/LinkedIn need custom SVGs later. Vitest fails from a lowercase `d:\` cwd (duplicate module load); run from `D:\`.
- **2026-11-10 — 03 Layout Shell:** `src/components/layout/`: `SiteHeader` (sticky, `bg-background/78` + blur, 64px, Home/About hidden below `sm`), `ProjectsMenu` (shadcn `dropdown-menu`, `modal={false}`, swatch via `--project`/`--project-2`, `aria-current` from `usePathname`, takes `ProjectsMenuItem[]` props), `SiteFooter`, `SkipLink` (fixed, translated off-screen until focused). Root layout: body is a flex column with `<main id="main" tabIndex={-1}>`; pages must not render their own `<main>`. `not-found.tsx` with Back home / See the projects (`/#projects`). `globals.css`: `bg-logo` utility, `html { scroll-padding-top: 80px }`, `overflow-x: clip` on body only. `siteConfig` gained `initials` and `footerNote`. Temporary `src/config/temp-projects.ts` feeds the menu until spec 04 removes it. Menu type text uses `text-muted-foreground` (`text-faint` fails 4.5:1 on cards). Nav links are 44px tall for tap size. Dev server's file watcher can miss edits on Windows; restart it if changes don't show.
