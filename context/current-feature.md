# Current Feature: 06 Project Page

Build `/projects/[slug]`, the case-study template every project uses, from the prototype's `project.html`.

## Status

In Progress

## Goals

- `src/app/projects/[slug]/page.tsx`: `generateStaticParams` from `getAllProjects()`, `dynamicParams = false`, `notFound()` when `getProject` returns null
- `generateMetadata`: title "{name} · Michael Hughes", description = tagline
- `--project` / `--project-2` set on the page wrapper from `accent` / `accent2`
- **`ProjectHero`**: two accent `Glow`s, "← Back to home", `StatusDot` with `status`, `h1` name, tagline, "Visit live site" (accent) and "View code" (outline) external buttons
- **`MetaRow`**: `dl` with Role, Type, Timeline, Stack (first 3 chips joined by " · "); 4 columns, 2×2 on phones
- Cover in `BrowserFrame` with `priority`
- Two-column body ≥900px: **`Toc`** (client, sticky, IntersectionObserver highlight, hidden on phones) beside the sections:
  - **Overview** (`#overview`, "Why I built it"): **`ProblemSolution`** cards (solution tinted with accent), then MDX body if present
  - **Features** (`#features`, "What it does"): **`FeatureGrid`** (2 cols, 1 on phones) with `ProjectIcon`
  - **Tech stack** (`#stack`, "What it's built with, and why"): **`StackList`** groups with gradient letter badges
  - **How it works** (`#architecture`, "Architecture"): **`ArchDiagram`** flow nodes left→right with arrows + labels, `main` node highlighted, extras below a dashed line; stacks vertically on phones with down arrows and labels beside them
  - **Challenges** (`#challenges`, "Hard problems and what I learned"): numbered cards
- **`ProjectPager`**: Previous / Next cards from `getAdjacentProjects`, hover-highlighted in each project's accent
- Components in `src/components/project/`: `ProjectHero`, `MetaRow`, `Toc`, `ProblemSolution`, `FeatureGrid`, `StackList`, `ArchDiagram`, `Challenges`, `ProjectPager`, `MdxBody`

## Notes

- Architecture diagram is HTML/CSS flex, not an image. Arrows `aria-hidden`; flow gets a visually hidden summary ("Browser → Next.js on Vercel → Prisma → Neon Postgres").
- Section anchors need `scroll-margin-top` for the sticky header.
- Check accent-colored text contrast in both themes; if an accent fails 4.5:1, use it only for decoration (existing `text-project-ink` helper may help).
- `Toc` is the only client component in the body.
- `ProjectBody.tsx` already renders MDX (spec 04); spec lists `MdxBody.tsx` — reuse/rename rather than duplicate.
- Pages must not render their own `<main>` (root layout provides it).
- References: `context/mockup/project.html`, `context/mockup/styles.css` (`.p-*`, `.arch*`, `.pn`).
- Testing: `/projects/task-master` matches `context/mockup/project.html?p=task-master` at 375px and 1280px, both themes; TOC highlights and links jump correctly; `/projects/unknown` is a 404; build lists project pages as static (●/○).

## History

<!-- Keep this updated.  Earliest to latest -->

- **2026-11-09 — Planning and Prototype:** Agreed the plan (static Next.js site on Vercel, no database, one MDX file per project, home page + one case-study page per project, Projects menu in the nav) and the visual design. HTML prototype in `context/mockup/` with Task Master, PokéTTRPG and Ez Rentals. DevStash left out for now. Context docs, 11 feature specs, agents and skills written.
- **2026-11-10 — 01 Project Setup:** Scaffolded Next.js 16.4 (App Router, TypeScript, `src/`), Tailwind CSS v4 and shadcn/ui (Radix, `button` only). Prototype tokens for light and dark in `globals.css`, with extras exposed as `bg-brand-soft`, `bg-surface-2`, `bg-bg-2`, `text-faint`, `bg-code`. next-themes light/dark with `ThemeToggle`; fonts via `next/font` (`--font-bricolage`/`--font-inter`/`--font-jetbrains-mono` mapped to `font-display`/`font-sans`/`font-mono`). Vitest with a `cn()` test, `src/config/site.ts`, README. Cache Components turned off (it forbids `dynamicParams = false`, which spec 06 needs). ESLint ignores `context/**`. Repo on `main`, `origin` is `michaelhughes45/portfolio`.
- **2026-11-10 — 02 Design System:** Shared components in `src/components/shared/`: `Section` (+ `Container`, 1160px), `SectionHead` (`accent` uses `--project`), `Chip`, `StatusDot`, `Glow` (sized/colored by className), `ProjectIcon` (exports `ProjectIconName` and `PROJECT_ICON_NAMES` for the spec 04 schema), `BrowserFrame` (shows the gradient + grid placeholder with `name` when the file isn't in `public/`), `Reveal` (Motion `whileInView`, `data-reveal` forced visible in CSS under reduced motion or `scripting: none`). Button variants `default`/`outline`/`accent`, sizes 44px/36px, 18px icons. `globals.css`: `bg-status`, `bg-dot-*`, `shadow-soft`, `bg-grid`, `bg-grid-frame`, `animate-marquee`, bold `h1`–`h3`, `.light` scope. `/dev/ui` preview (404 in production). Added `motion`. Lucide 1.x has no brand icons, so GitHub/LinkedIn need custom SVGs later. Vitest fails from a lowercase `d:\` cwd (duplicate module load); run from `D:\`.
- **2026-11-10 — 03 Layout Shell:** `src/components/layout/`: `SiteHeader` (sticky, `bg-background/78` + blur, 64px, Home/About hidden below `sm`), `ProjectsMenu` (shadcn `dropdown-menu`, `modal={false}`, swatch via `--project`/`--project-2`, `aria-current` from `usePathname`, takes `ProjectsMenuItem[]` props), `SiteFooter`, `SkipLink` (fixed, translated off-screen until focused). Root layout: body is a flex column with `<main id="main" tabIndex={-1}>`; pages must not render their own `<main>`. `not-found.tsx` with Back home / See the projects (`/#projects`). `globals.css`: `bg-logo` utility, `html { scroll-padding-top: 80px }`, `overflow-x: clip` on body only. `siteConfig` gained `initials` and `footerNote`. Temporary `src/config/temp-projects.ts` feeds the menu until spec 04 removes it. Menu type text uses `text-muted-foreground` (`text-faint` fails 4.5:1 on cards). Nav links are 44px tall for tap size. Dev server's file watcher can miss edits on Windows; restart it if changes don't show.
- **2026-11-10 — 04 Content Pipeline:** `src/lib/content/`: `schema.ts` (Zod 4 `strictObject`, so unknown fields fail; icons from `PROJECT_ICON_NAMES`), `parse.ts` (pure: `parseProjectFile`, `prepareProjects` for draft filter/sort/duplicate order, `findAdjacent` with wrap, `ContentError` with `file: field: message` lines), `projects.ts` (`server-only`; `loadProjects({ contentDir, publicDir, production })` for tests, cached `getAllProjects`, `getProject`, `getAdjacentProjects` which returns `null` for unknown slugs and the project itself when there's only one). Missing cover fails production builds, warns in dev. MDX body via `next-mdx-remote-client/rsc` (`next-mdx-remote` is archived) in `src/components/project/ProjectBody.tsx`: headings become h3/h4, imports/exports disabled, external links get an icon. `content/projects/_template.mdx` and `task-master.mdx`; `public/projects/task-master/cover.png` is a generated placeholder until spec 07. `npm run check:content` (`tsx scripts/check-content.ts`). Root layout feeds the Projects menu from `getAllProjects()`; `temp-projects.ts` removed. 34 tests using fixtures in `src/lib/content/__fixtures__/`.
- **2026-11-10 — 05 Home Page:** `src/components/home/`: `Hero` (grid + two `Glow`s, gradient headline, live project count in the intro), `CodeCard` (real text from `siteConfig.codeCard`, `{ projectCount: true }` value, `--color-code-*` tokens, rotated at ≥900px, scrollable focusable `pre`), `TechMarquee` (list rendered twice with per-item right padding so -50% loops seamlessly), `ProjectCard` (one `Link`, `--project` vars, `text-project-ink`, `sizes="(min-width: 760px) 50vw, 100vw"`), `NextProjectCard` (`showNextProjectCard`), `Steps`, `Toolbox`, `AboutPanel` (`.dark` scope inside a `bg-code` wrapper). All home copy in `site.ts` (`hero`, `codeCard`, `marquee`, `sections`, `steps`, `toolbox`; Lucide icons imported there); email/LinkedIn/résumé are `#` with TODO(spec 08). New shared `BrandIcons` (GitHub/LinkedIn) and `ExternalAnchor` (http(s) → new tab + arrow icon + sr-only note). `src/lib/format.ts` `numberWord` (tested, 36 tests). `globals.css`: `text-gradient-hero` (darker light-mode stops, ≥4.48:1), `text-project-ink` (accent 72% + foreground). Bricolage loads as a variable font with `axes: ["opsz"]` to match the prototype's narrower headings. Single-column grids need `grid-cols-1` (minmax(0,1fr)) or long content overflows at 375px. 404 links to `/#work`. Card links 404 until spec 06; Lighthouse not run yet.
