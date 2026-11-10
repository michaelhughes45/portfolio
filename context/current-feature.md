# Current Feature: 05 Home Page

Build `/` from the prototype: hero with code card, tech strip, project cards, How I build, Toolbox and the About + contact panel. All text comes from `src/config/site.ts` or the project content.

## Status

In Progress

## Goals

- **Hero**: faint grid background + two `Glow`s. `StatusDot` "Open to full-stack and front-end roles", `h1` "I build web apps that ship." (last word in the multicolor gradient), intro paragraph, buttons See my work (`#work`), Résumé, GitHub.
- **`CodeCard`**: dark editor card (window dots, `michael.ts` filename) showing the stack object with syntax colors; lines from `site.ts`, rendered as real text, horizontally scrollable inside the card; slightly rotated on desktop, flat on phones.
- **`TechMarquee`**: list from `site.ts`, duplicated for a seamless CSS loop, `aria-hidden`, paused with reduced motion.
- **Projects** (`id="work"`): `SectionHead` "Selected work / Projects" + description. Grid of `ProjectCard`s (2 columns ≥760px, 1 below): `BrowserFrame` with cover, "01 · {type}" in project accent, name, tagline, first 4 chips, "View project →". Whole card is one link to `/projects/<slug>` with hover lift and accent border/shadow.
- **`NextProjectCard`**: dashed, "+" icon, "Next project / In progress…", shown only when `site.showNextProjectCard` is true.
- **How I build** (`id="how"`, alternate background): four step cards from `site.ts` (number, Lucide icon, title, text).
- **Toolbox**: four groups from `site.ts` (Frontend, Backend, Data, Tooling), each a card with icon heading and chips.
- **About** (`id="about"`): dark rounded panel with eyebrow, `h2` "Let's build something.", bio from `site.ts`, buttons Email me (`mailto:`), LinkedIn, Download résumé. Placeholder links stay `#` until spec 08, marked with a TODO in `site.ts`.
- Wrap sections in `Reveal`.
- Page metadata: title "Michael Hughes · Full-stack developer", description from `site.ts`.

## Notes

- Files: `src/app/page.tsx`; `src/components/home/` `Hero`, `CodeCard`, `TechMarquee`, `ProjectCard`, `NextProjectCard`, `Steps`, `Toolbox`, `AboutPanel`; `src/config/site.ts` (hero, code card lines, marquee, steps, toolbox, bio).
- Only one link wrapper per `ProjectCard`; no nested buttons or links inside it.
- Card images use `sizes="(min-width: 760px) 50vw, 100vw"`.
- Hero headline gradient must keep enough contrast in light mode; check it.
- Lucide 1.x has no brand icons, so the GitHub/LinkedIn buttons need custom SVGs.
- 404 page links to `/#projects`, but this spec uses `id="work"`; reconcile the two.
- Testing: matches `context/mockup/index.html` at 375px and 1280px in both themes; each card opens the right project; `showNextProjectCard: false` hides the dashed card; no horizontal scroll at 375px; Lighthouse accessibility ≥ 95.
- References: `context/mockup/index.html`, `context/mockup/styles.css`.

### Implementation notes

- 404 link changed to `/#work`.
- Hero intro and code card `liveProjects` use the real project count (`numberWord` in `src/lib/format.ts`, tested).
- Bricolage now loads as a variable font with the `opsz` axis (as in the prototype); without it the headline wrapped to three lines.
- `text-gradient-hero` uses darker stops in light mode (≥4.48:1); dark mode keeps the prototype colors.
- `text-project-ink` (accent mixed 72% with foreground) for small accent text on cards: 5.3:1 light, 7.2:1 dark for Task Master.
- Code card colors are `--color-code-*` theme tokens. About panel scopes `.dark` inside a `bg-code` wrapper so it is dark in both themes.
- `GitHubIcon`/`LinkedInIcon` in `shared/BrandIcons.tsx`; `shared/ExternalAnchor.tsx` opens http(s) links in a new tab with an arrow icon and a screen-reader note, and leaves `#`/`mailto:` alone.
- Single-column grids use `grid-cols-1` (minmax(0,1fr)) so content can't push them past 375px.
- Email, LinkedIn and résumé are `#` with a TODO(spec 08) in `site.ts`. Project card links go to `/projects/<slug>`, which 404s until spec 06.

## History

<!-- Keep this updated.  Earliest to latest -->

- **2026-11-09 — Planning and Prototype:** Agreed the plan (static Next.js site on Vercel, no database, one MDX file per project, home page + one case-study page per project, Projects menu in the nav) and the visual design. HTML prototype in `context/mockup/` with Task Master, PokéTTRPG and Ez Rentals. DevStash left out for now. Context docs, 11 feature specs, agents and skills written.
- **2026-11-10 — 01 Project Setup:** Scaffolded Next.js 16.4 (App Router, TypeScript, `src/`), Tailwind CSS v4 and shadcn/ui (Radix, `button` only). Prototype tokens for light and dark in `globals.css`, with extras exposed as `bg-brand-soft`, `bg-surface-2`, `bg-bg-2`, `text-faint`, `bg-code`. next-themes light/dark with `ThemeToggle`; fonts via `next/font` (`--font-bricolage`/`--font-inter`/`--font-jetbrains-mono` mapped to `font-display`/`font-sans`/`font-mono`). Vitest with a `cn()` test, `src/config/site.ts`, README. Cache Components turned off (it forbids `dynamicParams = false`, which spec 06 needs). ESLint ignores `context/**`. Repo on `main`, `origin` is `michaelhughes45/portfolio`.
- **2026-11-10 — 02 Design System:** Shared components in `src/components/shared/`: `Section` (+ `Container`, 1160px), `SectionHead` (`accent` uses `--project`), `Chip`, `StatusDot`, `Glow` (sized/colored by className), `ProjectIcon` (exports `ProjectIconName` and `PROJECT_ICON_NAMES` for the spec 04 schema), `BrowserFrame` (shows the gradient + grid placeholder with `name` when the file isn't in `public/`), `Reveal` (Motion `whileInView`, `data-reveal` forced visible in CSS under reduced motion or `scripting: none`). Button variants `default`/`outline`/`accent`, sizes 44px/36px, 18px icons. `globals.css`: `bg-status`, `bg-dot-*`, `shadow-soft`, `bg-grid`, `bg-grid-frame`, `animate-marquee`, bold `h1`–`h3`, `.light` scope. `/dev/ui` preview (404 in production). Added `motion`. Lucide 1.x has no brand icons, so GitHub/LinkedIn need custom SVGs later. Vitest fails from a lowercase `d:\` cwd (duplicate module load); run from `D:\`.
- **2026-11-10 — 03 Layout Shell:** `src/components/layout/`: `SiteHeader` (sticky, `bg-background/78` + blur, 64px, Home/About hidden below `sm`), `ProjectsMenu` (shadcn `dropdown-menu`, `modal={false}`, swatch via `--project`/`--project-2`, `aria-current` from `usePathname`, takes `ProjectsMenuItem[]` props), `SiteFooter`, `SkipLink` (fixed, translated off-screen until focused). Root layout: body is a flex column with `<main id="main" tabIndex={-1}>`; pages must not render their own `<main>`. `not-found.tsx` with Back home / See the projects (`/#projects`). `globals.css`: `bg-logo` utility, `html { scroll-padding-top: 80px }`, `overflow-x: clip` on body only. `siteConfig` gained `initials` and `footerNote`. Temporary `src/config/temp-projects.ts` feeds the menu until spec 04 removes it. Menu type text uses `text-muted-foreground` (`text-faint` fails 4.5:1 on cards). Nav links are 44px tall for tap size. Dev server's file watcher can miss edits on Windows; restart it if changes don't show.
- **2026-11-10 — 04 Content Pipeline:** `src/lib/content/`: `schema.ts` (Zod 4 `strictObject`, so unknown fields fail; icons from `PROJECT_ICON_NAMES`), `parse.ts` (pure: `parseProjectFile`, `prepareProjects` for draft filter/sort/duplicate order, `findAdjacent` with wrap, `ContentError` with `file: field: message` lines), `projects.ts` (`server-only`; `loadProjects({ contentDir, publicDir, production })` for tests, cached `getAllProjects`, `getProject`, `getAdjacentProjects` which returns `null` for unknown slugs and the project itself when there's only one). Missing cover fails production builds, warns in dev. MDX body via `next-mdx-remote-client/rsc` (`next-mdx-remote` is archived) in `src/components/project/ProjectBody.tsx`: headings become h3/h4, imports/exports disabled, external links get an icon. `content/projects/_template.mdx` and `task-master.mdx`; `public/projects/task-master/cover.png` is a generated placeholder until spec 07. `npm run check:content` (`tsx scripts/check-content.ts`). Root layout feeds the Projects menu from `getAllProjects()`; `temp-projects.ts` removed. 34 tests using fixtures in `src/lib/content/__fixtures__/`.
