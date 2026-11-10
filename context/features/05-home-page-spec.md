# Home Page

## Overview

Build `/` from the prototype: hero with code card, tech strip, project cards, How I build, Toolbox and the About + contact panel. All text comes from `src/config/site.ts` or the project content.

## Requirements

- **Hero**: faint grid background + two `Glow`s. Left: `StatusDot` "Open to full-stack and front-end roles", `h1` "I build web apps that ship." (last word in the multicolor gradient), intro paragraph, buttons See my work (`#work`), Résumé, GitHub. Right: **`CodeCard`**, a dark editor card (window dots, `michael.ts` filename) showing the stack object with syntax colors, slightly rotated on desktop, flat on phones. Its lines come from `site.ts` and render as real text (not an image), horizontally scrollable inside the card if too long.
- **`TechMarquee`**: list from `site.ts`, duplicated for a seamless CSS loop, `aria-hidden`, paused with reduced motion.
- **Projects** (`id="work"`): `SectionHead` "Selected work / Projects" + description. Grid of **`ProjectCard`**s (2 columns ≥760px, 1 below): `BrowserFrame` with the cover, "01 · {type}" in the project accent, name, tagline, first 4 chips, "View project →". The whole card is one link to `/projects/<slug>` with a hover lift and accent-colored border/shadow. Then **`NextProjectCard`** (dashed, "+" icon, "Next project / In progress…"), shown only when `site.showNextProjectCard` is true.
- **How I build** (`id="how"`, alternate background): four step cards from `site.ts` (number, Lucide icon, title, text).
- **Toolbox**: four groups from `site.ts` (Frontend, Backend, Data, Tooling), each a card with an icon heading and chips.
- **About** (`id="about"`): dark rounded panel with eyebrow, `h2` "Let's build something.", bio from `site.ts`, buttons Email me (`mailto:`), LinkedIn, Download résumé. Placeholder links stay `#` until spec 08 and are marked with a TODO in `site.ts`.
- Wrap sections in `Reveal`.
- Page metadata: title "Michael Hughes · Full-stack developer", description from `site.ts`.

## Files to Create / Modify

1. `src/app/page.tsx`
2. `src/components/home/Hero.tsx`, `CodeCard.tsx`, `TechMarquee.tsx`, `ProjectCard.tsx`, `NextProjectCard.tsx`, `Steps.tsx`, `Toolbox.tsx`, `AboutPanel.tsx`
3. `src/config/site.ts` (hero, code card lines, marquee, steps, toolbox, bio)

## Key Gotchas

- Only one card should be a link wrapper; don't nest buttons or other links inside `ProjectCard`.
- Use `sizes` on card images (`(min-width: 760px) 50vw, 100vw`) so phones don't download desktop-size images.
- The hero headline gradient must keep enough contrast in light mode; check it.

## Testing

1. Matches `context/mockup/index.html` at 375px and 1280px in both themes.
2. Each card opens the right project page.
3. Setting `showNextProjectCard: false` hides the dashed card.
4. No horizontal scroll at 375px; Lighthouse accessibility ≥ 95.

## References

- `context/mockup/index.html`, `context/mockup/styles.css`
