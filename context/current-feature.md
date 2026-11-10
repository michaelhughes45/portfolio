# Current Feature: 02 Design System

Shared building blocks every page uses, matching the prototype: section layout, chips, status dot, browser frame, reveal animation, project icons, glow and button variants, plus a `/dev/ui` page to view them all.

## Status

In Progress

## Goals

- **`Section`** (`src/components/shared/Section.tsx`): vertical padding 96px desktop / 64px phone, optional `id`, optional alternate background (`bg-2` with top/bottom borders). Includes the max-width container (1160px, 24px gutter, 16px on phones).
- **`SectionHead`**: mono uppercase eyebrow (brand color or project accent), `h2`, optional description on the right that wraps below on phones.
- **`Chip`**: mono, 12.5px, pill, sunken background, border.
- **`StatusDot`**: green dot with a soft ring + text (text always present).
- **Button variants** (`src/components/ui/button.tsx`): `default` (inverted: text-color background), `outline`, `accent` (project accent background, white text); sizes `default` (44px) and `sm` (36px); icons inside buttons 18px.
- **`BrowserFrame`**: three dots, URL pill showing the host of `live`, 16:10 image area. Props `src`, `alt`, `url`, `priority?`, `sizes`. `next/image` with `fill` and `object-cover object-top`. In dev, when the image is missing, show the prototype's gradient + grid fallback with the project name.
- **`Reveal`** (client): fades and lifts children into view once via Motion `whileInView` (`once: true`, small offset). Instant with `prefers-reduced-motion`. Content visible if JS fails.
- **`ProjectIcon`**: maps allowed icon names (`home, calendar, repeat, chart, bell, shield, layers, swords, zap, move, search, users, upload, heart`) to Lucide components. Unknown names are a type error, not a runtime fallback.
- **`Glow`**: decorative blurred circle (`aria-hidden`) used behind heroes.
- **`/dev/ui`** page (`src/app/dev/ui/page.tsx`) rendering every component in both themes; `notFound()` when `process.env.NODE_ENV === "production"`.
- `globals.css` additions: grid background utility, marquee keyframes (for later).
- `npm run lint` and `npm run build` pass.

## Notes

- Install the `motion` package; check Context7 for the current import path (`motion/react`).
- `Reveal` is the only animation wrapper so reduced-motion handling lives in one place.
- Accent colors come from content: components read them from CSS variables set by a parent (`--project`, `--project-2`), never from props turned into hex classes.
- References: `context/mockup/styles.css` (exact sizes and colors), `context/mockup/app.js` (icon list).
- Testing: `/dev/ui` matches the prototype in light and dark at 375px and 1280px; OS reduced motion stops the reveal.

## History

<!-- Keep this updated.  Earliest to latest -->

- **2026-11-09 — Planning and Prototype:** Agreed the plan (static Next.js site on Vercel, no database, one MDX file per project, home page + one case-study page per project, Projects menu in the nav) and the visual design. HTML prototype in `context/mockup/` with Task Master, PokéTTRPG and Ez Rentals. DevStash left out for now. Context docs, 11 feature specs, agents and skills written.
- **2026-11-10 — 01 Project Setup:** Scaffolded Next.js 16.4 (App Router, TypeScript, `src/`), Tailwind CSS v4 and shadcn/ui (Radix, `button` only). Prototype tokens for light and dark in `globals.css`, with extras exposed as `bg-brand-soft`, `bg-surface-2`, `bg-bg-2`, `text-faint`, `bg-code`. next-themes light/dark with `ThemeToggle`; fonts via `next/font` (`--font-bricolage`/`--font-inter`/`--font-jetbrains-mono` mapped to `font-display`/`font-sans`/`font-mono`). Vitest with a `cn()` test, `src/config/site.ts`, README. Cache Components turned off (it forbids `dynamicParams = false`, which spec 06 needs). ESLint ignores `context/**`. Repo on `main`, `origin` is `michaelhughes45/portfolio`.
