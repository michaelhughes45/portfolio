# Layout Shell

## Overview

The sticky site header with the Projects menu, the footer and the 404 page, shared by every page.

## Requirements

- **`SiteHeader`** (sticky, blurred translucent background, bottom border, 64px tall):
  - Logo: rounded square with the conic gradient and "MH", then "Michael Hughes" (never wraps). Links to `/`.
  - Links: Home, **Projects** menu, About (`/#about`), then the theme toggle.
  - On phones (<640px): only the Projects menu and theme toggle show next to the logo.
- **`ProjectsMenu`**: shadcn `dropdown-menu`. Each item shows the project's color swatch (gradient of `accent` → `accent2`), name and type, and links to `/projects/<slug>`. The current project is marked (`aria-current="page"` + highlighted). Works with keyboard and touch. Items come from props (the layout loads projects; until spec 04 exists, pass a temporary array from `context/mockup/data.js` and remove it in spec 04).
- **`SiteFooter`**: "© {year} Michael Hughes" on the left, "Built with Next.js · Hosted on Vercel" on the right; wraps on phones.
- **`not-found.tsx`**: friendly message, buttons back home and to the projects section.
- Skip link ("Skip to content") as the first focusable element, targeting `<main id="main">`.
- `html { scroll-padding-top }` so anchor jumps (`/#about`, project page sections) aren't hidden under the sticky header.

## Files to Create / Modify

1. `src/components/layout/SiteHeader.tsx`, `ProjectsMenu.tsx`, `SiteFooter.tsx`, `SkipLink.tsx`
2. `src/app/layout.tsx`: header, `<main id="main">`, footer
3. `src/app/not-found.tsx`
4. `src/components/ui/dropdown-menu.tsx` (shadcn CLI)

## Key Gotchas

- In the prototype, the sticky header broke when `overflow-x: hidden` was on `body` with clipping on `html`. Use `overflow-x: clip` on `body` only, and don't put `overflow` on any ancestor of the header.
- The logo text must not wrap at 375px.

## Testing

1. Header stays pinned while scrolling on every page, desktop and 375px.
2. Projects menu opens with click, tap and keyboard (Enter/Space, arrows, Escape) and links work.
3. `/does-not-exist` shows the 404 page.
4. No horizontal scroll at 375px.

## References

- `context/mockup/index.html`, `context/mockup/app.js` (`renderNav`), `context/mockup/styles.css` (`.nav`, `.nav-drop`)
