# Prototype

The agreed design for the portfolio, made as plain HTML, CSS and JavaScript before any app code. Read it for **layout, spacing, copy, colors and behavior**; don't copy the markup into the app. Rebuild it with Next.js, Tailwind and shadcn/ui (see `context/features/`).

## Viewing it

```bash
python -m http.server 5500 --directory context/mockup
```

Then open http://localhost:5500. (It needs a server, not `file://`, because the project frames load the live sites.)

| File | Shows |
| --- | --- |
| `index.html` | Home: hero + code card, tech strip, project cards, "Next project" card, How I build, Toolbox, About + contact |
| `project.html?p=<slug>` | The project case-study template. Slugs: `task-master`, `pokettrpg`, `ez-rentals` |
| `data.js` | Draft content for all three projects, in nearly the same shape as the real content files (see "Content Model" in `context/project-overview.md`; the schema wins where they differ) |
| `app.js` | Icons used, theme toggle, browser frame, Projects menu |
| `styles.css` | Every size, color and breakpoint |

The browser frames embed the live sites with iframes only for the prototype. Task Master refuses embedding (`X-Frame-Options: DENY`), so it shows a placeholder. The real site uses screenshots for all projects.

## Screenshots

Full-page screenshots of the prototype are in `context/screenshots/`, so you can compare without running the server:

| Page | Desktop (1280px) | Phone (390px) |
| --- | --- | --- |
| Home | `home-desktop-{light,dark}.png` | `home-phone-{light,dark}.png` |
| Task Master | `project-task-master-desktop-{light,dark}.png` | `project-task-master-phone-{light,dark}.png` |
| PokéTTRPG | `project-pokettrpg-desktop-{light,dark}.png` | `project-pokettrpg-phone-{light,dark}.png` |
| Ez Rentals | `project-ez-rentals-desktop-{light,dark}.png` | `project-ez-rentals-phone-{light,dark}.png` |

Notes: the striped "PROTOTYPE" banner at the top is not part of the design. The project previews show live sites (or a placeholder for Task Master); the real site uses cover screenshots. Add `?theme=dark` or `?theme=light` to any prototype URL to force a theme.

## Design tokens

Use these values in `src/app/globals.css`. Names in brackets are the variable each maps to.

| Token | Light | Dark | Used for |
| --- | --- | --- | --- |
| bg [`--background`] | `#F6F6FA` | `#0A0C11` | Page background |
| bg-2 [`--bg-2`] | `#EEEEF5` | `#0F1218` | Alternate sections (How I build), tech strip |
| surface [`--card`, `--popover`] | `#FFFFFF` | `#13161F` | Cards, menus, frames |
| surface-2 [`--muted`, `--secondary`, `--accent` (shadcn hover)] | `#F3F3F8` | `#191D28` | Chips, frame bars, hover |
| border [`--border`, `--input`] | `#E2E3EC` | `#232837` | Hairlines |
| text [`--foreground`] | `#11131A` | `#E9EBF1` | Body text, primary button background |
| muted [`--muted-foreground`] | `#5A6274` | `#9AA2B4` | Secondary text |
| faint [`--faint`] | `#8A91A3` | `#6B7385` | Labels, URL pills, footer |
| brand [`--brand`, `--ring`] | `#5B4CF0` | `#8F82FF` | Eyebrows, step numbers, site-wide accent |
| brand-soft [`--brand-soft`] | `rgba(91,76,240,.10)` | `rgba(143,130,255,.12)` | Icon tiles |
| code-bg [`--code-bg`] | `#14161F` | `#0D0F15` | Code card and About panel (dark in both themes) |

Fixed colors: status dot `#22C55E`; window dots `#FF5F57`, `#FEBC2E`, `#28C840`; hero gradient word `#22C55E → #0EA5E9 → #8F82FF → #EF4444`; logo mark conic gradient of the same plus `#F59E0B`.

### Project colors (from content, set as `--project` / `--project-2`)

| Project | accent | accent2 |
| --- | --- | --- |
| Task Master | `#16A34A` | `#0EA5E9` |
| PokéTTRPG | `#E11D48` | `#F59E0B` |
| Ez Rentals | `#0D9488` | `#6366F1` |

## Type

- **Bricolage Grotesque** 600/700/800 for headings (`h1` 44–80px clamp, letter-spacing −0.02em, line-height 1.1)
- **Inter** 400/500/600 for body (16px, line-height 1.6)
- **JetBrains Mono** 500/600 for chips, eyebrows (uppercase, +0.12em), URL pills and the code card

## Rules

- Radii: 16px cards, 20px project cards, 11px buttons, 12–14px frames, 28px About panel, pills for chips.
- Max width 1160px, 24px gutter (16px on phones). Sections 96px top/bottom (64px on phones).
- Breakpoints used: 520, 640, 720/760, 900px.
- Shadows soft and low (`--shadow`); glows are blurred circles at 30–35% opacity.
- Animations: reveal on scroll (fade + 18px lift, 0.7s), card hover lift 4px, tech strip 40s loop. All off with reduced motion.
- No horizontal scroll at 375px. Header never wraps.
