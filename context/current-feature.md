# Current Feature: 03 Layout Shell

The sticky site header with the Projects menu, the footer, the skip link and the 404 page, shared by every page.

## Status

In Progress

## Goals

- **`SiteHeader`** (`src/components/layout/SiteHeader.tsx`): sticky, blurred translucent background, bottom border, 64px tall.
  - Logo: rounded square with the conic gradient and "MH", then "Michael Hughes" (never wraps, including at 375px). Links to `/`.
  - Links: Home, **Projects** menu, About (`/#about`), then the theme toggle.
  - On phones (<640px): only the Projects menu and theme toggle show next to the logo.
- **`ProjectsMenu`** (`ProjectsMenu.tsx`): shadcn `dropdown-menu` (added with the shadcn CLI). Each item shows the project's color swatch (`accent` → `accent2` gradient), name and type, and links to `/projects/<slug>`. Current project marked with `aria-current="page"` and highlighted. Works with keyboard and touch. Items come from props.
- **`SiteFooter`** (`SiteFooter.tsx`): "© {year} Michael Hughes" left, "Built with Next.js · Hosted on Vercel" right; wraps on phones.
- **`SkipLink`** (`SkipLink.tsx`): "Skip to content" as the first focusable element, targeting `<main id="main">`.
- **`src/app/layout.tsx`**: header, `<main id="main">`, footer.
- **`src/app/not-found.tsx`**: friendly message, buttons back home and to the projects section.
- `html { scroll-padding-top }` so anchor jumps aren't hidden under the sticky header.

## Notes

- Until spec 04 exists, the layout passes a temporary project array (from `context/mockup/data.js`) to `ProjectsMenu`; spec 04 removes it.
- Sticky gotcha from the prototype: use `overflow-x: clip` on `body` only, and no `overflow` on any ancestor of the header.
- Name, footer text etc. should come from `src/config/site.ts`, not be hard-coded.
- Testing: header pinned while scrolling on every page (desktop and 375px); menu opens with click, tap and keyboard (Enter/Space, arrows, Escape) and links work; `/does-not-exist` shows the 404; no horizontal scroll at 375px.
- References: `context/mockup/index.html`, `context/mockup/app.js` (`renderNav`), `context/mockup/styles.css` (`.nav`, `.nav-drop`).

## History

<!-- Keep this updated.  Earliest to latest -->

- **2026-11-09 — Planning and Prototype:** Agreed the plan (static Next.js site on Vercel, no database, one MDX file per project, home page + one case-study page per project, Projects menu in the nav) and the visual design. HTML prototype in `context/mockup/` with Task Master, PokéTTRPG and Ez Rentals. DevStash left out for now. Context docs, 11 feature specs, agents and skills written.
- **2026-11-10 — 01 Project Setup:** Scaffolded Next.js 16.4 (App Router, TypeScript, `src/`), Tailwind CSS v4 and shadcn/ui (Radix, `button` only). Prototype tokens for light and dark in `globals.css`, with extras exposed as `bg-brand-soft`, `bg-surface-2`, `bg-bg-2`, `text-faint`, `bg-code`. next-themes light/dark with `ThemeToggle`; fonts via `next/font` (`--font-bricolage`/`--font-inter`/`--font-jetbrains-mono` mapped to `font-display`/`font-sans`/`font-mono`). Vitest with a `cn()` test, `src/config/site.ts`, README. Cache Components turned off (it forbids `dynamicParams = false`, which spec 06 needs). ESLint ignores `context/**`. Repo on `main`, `origin` is `michaelhughes45/portfolio`.
- **2026-11-10 — 02 Design System:** Shared components in `src/components/shared/`: `Section` (+ `Container`, 1160px), `SectionHead` (`accent` uses `--project`), `Chip`, `StatusDot`, `Glow` (sized/colored by className), `ProjectIcon` (exports `ProjectIconName` and `PROJECT_ICON_NAMES` for the spec 04 schema), `BrowserFrame` (shows the gradient + grid placeholder with `name` when the file isn't in `public/`), `Reveal` (Motion `whileInView`, `data-reveal` forced visible in CSS under reduced motion or `scripting: none`). Button variants `default`/`outline`/`accent`, sizes 44px/36px, 18px icons. `globals.css`: `bg-status`, `bg-dot-*`, `shadow-soft`, `bg-grid`, `bg-grid-frame`, `animate-marquee`, bold `h1`–`h3`, `.light` scope. `/dev/ui` preview (404 in production). Added `motion`. Lucide 1.x has no brand icons, so GitHub/LinkedIn need custom SVGs later. Vitest fails from a lowercase `d:\` cwd (duplicate module load); run from `D:\`.
