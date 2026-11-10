# Project Page

## Overview

Build `/projects/[slug]`, the case-study template every project uses, from the prototype's `project.html`.

## Requirements

- `generateStaticParams` from `getAllProjects()`, `dynamicParams = false`, `notFound()` if `getProject` returns null.
- `generateMetadata`: title "{name} · Michael Hughes", description = tagline.
- Set `--project` / `--project-2` on the page wrapper from the project's `accent` / `accent2`.
- **`ProjectHero`**: two `Glow`s in the accent colors, "← Back to home", `StatusDot` with `status`, `h1` name, tagline, buttons "Visit live site" (accent) and "View code" (outline), both external.
- **`MetaRow`**: `dl` with Role, Type, Timeline, Stack (first 3 chips joined by " · "). 4 columns, 2×2 on phones.
- Cover: `BrowserFrame` with `priority`.
- Two-column body ≥900px: **`Toc`** (client, sticky, highlights the section in view with IntersectionObserver; hidden on phones) and the sections:
  - **Overview** (`#overview`): "Why I built it", **`ProblemSolution`** cards (solution card tinted with the accent), then the MDX body if present.
  - **Features** (`#features`): "What it does", **`FeatureGrid`** (2 columns, 1 on phones) with `ProjectIcon`.
  - **Tech stack** (`#stack`): "What it's built with, and why", **`StackList`** groups with gradient letter badges.
  - **How it works** (`#architecture`): "Architecture", **`ArchDiagram`**: flow nodes left to right with arrows and arrow labels, the `main` node highlighted; extras below a dashed line. On phones the flow stacks vertically with down arrows and labels beside them.
  - **Challenges** (`#challenges`): "Hard problems and what I learned", numbered cards.
- **`ProjectPager`**: Previous / Next cards from `getAdjacentProjects`, each hover-highlighted in that project's accent.

## Files to Create / Modify

1. `src/app/projects/[slug]/page.tsx`
2. `src/components/project/ProjectHero.tsx`, `MetaRow.tsx`, `Toc.tsx`, `ProblemSolution.tsx`, `FeatureGrid.tsx`, `StackList.tsx`, `ArchDiagram.tsx`, `Challenges.tsx`, `ProjectPager.tsx`, `MdxBody.tsx`

## Key Gotchas

- The architecture diagram is HTML/CSS (flex), not an image, so it stays sharp, themeable and readable by screen readers. Arrows are `aria-hidden`; give the flow a visually hidden summary ("Browser → Next.js on Vercel → Prisma → Neon Postgres").
- Section anchors need `scroll-margin-top` for the sticky header.
- Check contrast of accent-colored text in both themes; if an accent fails 4.5:1 on the background, use it only for decoration and keep text in the normal text color.
- `Toc` is the only client component in the body.

## Testing

1. `/projects/task-master` matches `context/mockup/project.html?p=task-master` at 375px and 1280px, both themes.
2. TOC highlights the right section while scrolling and its links jump correctly.
3. `/projects/unknown` is a 404.
4. Build output lists the project pages as static (●/○), not dynamic.

## References

- `context/mockup/project.html`, `context/mockup/styles.css` (`.p-*`, `.arch*`, `.pn`)
