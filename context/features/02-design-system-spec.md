# Design System

## Overview

Build the shared building blocks every page uses, matching the prototype: section layout, chips, status dot, browser frame, reveal animation, project icons and button variants.

## Requirements

- **`Section`**: wrapper with the prototype's vertical padding (96px desktop, 64px phone), optional `id`, optional alternate background (`bg-2` with top/bottom borders). Includes the max-width container (1160px, 24px gutter, 16px on phones).
- **`SectionHead`**: eyebrow (mono, uppercase, brand color or project accent), `h2`, optional description on the right that wraps below on phones.
- **`Chip`**: mono, 12.5px, pill, sunken background, border.
- **`StatusDot`**: green dot with a soft ring + text (text is always present; color isn't the only signal).
- **Button variants** (extend shadcn `button`): `default` (inverted: text color background), `outline`, `accent` (project accent background, white text), sizes `default` (44px) and `sm` (36px). Icons inside buttons are 18px.
- **`BrowserFrame`**: three dots, URL pill showing the host of `live`, then a 16:10 image area. Takes `src`, `alt`, `url`, `priority?`, `sizes`. Uses `next/image` with `fill` and `object-cover object-top`. While the image is missing in dev, show the prototype's gradient + grid fallback with the project name.
- **`Reveal`** (client): fades and lifts children into view once using Motion's `whileInView` (`once: true`, small offset). Instant with `prefers-reduced-motion`. Content is visible if JS fails.
- **`ProjectIcon`**: maps the allowed icon names from the content schema to Lucide components (`home, calendar, repeat, chart, bell, shield, layers, swords, zap, move, search, users, upload, heart`). Unknown names are a type error, not a runtime fallback.
- **`Glow`**: decorative blurred circle (aria-hidden) used behind heroes.
- A `/dev/ui` page that renders every component in both themes, removed (or excluded from production) before deploy. Exclude with `notFound()` when `process.env.NODE_ENV === "production"`.

## Files to Create / Modify

1. `src/components/shared/Section.tsx`, `SectionHead.tsx`, `Chip.tsx`, `StatusDot.tsx`, `BrowserFrame.tsx`, `Reveal.tsx`, `ProjectIcon.tsx`, `Glow.tsx`
2. `src/components/ui/button.tsx` (variants)
3. `src/app/dev/ui/page.tsx`
4. `globals.css` additions (grid background utility, marquee keyframes for later)

## Key Gotchas

- Install Motion (`motion` package) and check Context7 for the current import path (`motion/react`).
- Keep `Reveal` the only animation wrapper so reduced-motion handling lives in one place.
- Accent colors come from content; components read them from CSS variables set by a parent, never from props turned into hex classes.

## Testing

1. `/dev/ui` matches the prototype's components in light and dark at 375px and 1280px.
2. Turning on reduced motion in the OS stops the reveal animation.
3. `npm run lint`, `npm run build` pass.

## References

- `context/mockup/styles.css` (exact sizes and colors), `context/mockup/app.js` (icon list)
