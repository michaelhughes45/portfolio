# 💼 Portfolio — Project Overview

> Michael Hughes's developer portfolio. A home page that introduces Michael, plus one case-study page per project explaining what it does, the tech stack and why, how it works and what was hard. Built to show recruiters and employers real, live, deployed work.

---

## 📑 Table of Contents

- [Problem](#-problem)
- [Audience](#-audience)
- [Goals](#-goals)
- [Pages](#-pages)
- [Projects](#-projects)
- [Content Model](#-content-model)
- [Adding a Project](#-adding-a-project)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Design](#-design)
- [Development Workflow](#️-development-workflow)
- [Deploying](#-deploying)
- [Roadmap](#-roadmap)
- [Open Questions](#-open-questions)

---

## 📌 Problem

Michael's projects each live at their own URL with their own README. A recruiter has no single place to see them all, understand what each one does, or see the engineering decisions behind them. The portfolio is that place, and it has to keep growing as new projects are finished.

---

## 🧑‍💼 Audience

- **Recruiters and hiring managers** skimming for 30–90 seconds: they need the name, what Michael does, live links and a quick sense of quality from the home page alone.
- **Engineers on an interview panel** reading a case study in depth: they want the stack, the reasons behind it, the architecture and the hard problems.
- Many will open the link on a phone first. Mobile has to be as good as desktop.

---

## 🎯 Goals

1. Show that every project is **real and live**: a working "Visit live site" and "View code" link on each.
2. Explain each project's **tech stack with reasons**, not just a list of logos.
3. Look **designed and visual**, with enough text to explain the important parts.
4. **Adding a project is one content file** plus screenshots. No page or component changes.
5. Fast, accessible and well-indexed: good Lighthouse scores, proper metadata and share images.

Non-goals: a blog, a CMS or admin panel, a database, user accounts, a contact form (a mailto link is enough).

---

## 🗺️ Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: hero, tech strip, project cards, How I build, Toolbox, About + contact |
| `/projects/[slug]` | One case study per project, all from the same template |
| `/resume.pdf` | Résumé download (static file in `public/`) |
| `not-found` | Friendly 404 with links back home and to the projects |

### Home (`/`)

Matches `context/mockup/index.html`:

1. **Hero**: "Open to full-stack and front-end roles" status line, headline, short intro, buttons (See my work, Résumé, GitHub). On the right, a code-editor card summing up Michael's stack as a TypeScript object.
2. **Tech strip**: a slow scrolling band of technologies (pauses with `prefers-reduced-motion`).
3. **Projects**: a card per project (preview image, number + type, name, tagline, up to 4 tech chips, "View project →"). The whole card links to the project page. The last card is a dashed "Next project" placeholder (can be turned off in site config).
4. **How I build**: four steps (Spec it, Branch it, Test it, Ship it).
5. **Toolbox**: skills grouped as Frontend, Backend, Data, Tooling.
6. **About + contact**: dark panel with a short bio and buttons for email, LinkedIn and résumé.

### Project page (`/projects/[slug]`)

Matches `context/mockup/project.html`:

1. Back link, status, name, tagline, "Visit live site" and "View code" buttons.
2. Meta row: Role, Type, Timeline, Stack.
3. Large cover screenshot in a browser frame.
4. Sticky "On this page" menu (desktop) with scroll highlighting.
5. **Overview**: The problem / The solution cards, plus optional long-form MDX body.
6. **Features**: icon cards.
7. **Tech stack**: grouped items, each with a one-line "why".
8. **How it works**: architecture flow diagram plus supporting services.
9. **Challenges**: numbered cards on the hard problems and what was learned.
10. Previous / Next project links.

Each page uses its project's own accent colors.

### Navigation

Sticky header: logo + name (links home), Home, **Projects** menu (lists every project with its color swatch and type, built from the content files), About, theme toggle. On phones, Home and About collapse and only Projects and the theme toggle show.

---

## 📂 Projects

Shown in this order. Source repos are on this machine; the content reviewer and `/add-project` read them to check facts.

| # | Slug | Name | Live | Repo | Local source |
| --- | --- | --- | --- | --- | --- |
| 1 | `task-master` | Task Master | https://taskmaster-eight-sigma.vercel.app/ | https://github.com/michaelhughes45/task-master | `D:\programming\Projects\task-master` |
| 2 | `pokettrpg` | PokéTTRPG | https://pokemon-game-rust.vercel.app/ | https://github.com/michaelhughes45/pokemonGame | `C:\Users\mhugh\OneDrive\Documents\Programming\Personal Projects\pokemonGame` |
| 3 | `ez-rentals` | Ez Rentals | https://capstone-sigma-brown.vercel.app/ | https://github.com/michaelhughes45/Capstone | `C:\Users\mhugh\OneDrive\Documents\school\Spring Semester 2025\Capstone\capstone_project` |

Notes:

- **Task Master** sends `X-Frame-Options: DENY` and needs a sign-in, so its screenshots are taken while signed in as the seeded demo user from that repo (`prisma/seed.ts`).
- **PokéTTRPG** and **Ez Rentals** have their API on Render's free tier, which sleeps. Screenshots should be taken after the API has woken up (wait for data to load).
- **Ez Rentals** was the Spring 2025 school capstone. Don't call it a commercial product.
- **DevStash** (`D:\programming\Projects\devstash`) is left out for now: it was built following a course. It can be added later as a clearly labeled learning project if Michael decides to.

---

## 🧱 Content Model

One file per project: `content/projects/<slug>.mdx`. The filename is the slug. Frontmatter holds everything the page renders as designed components, validated by a Zod schema in `src/lib/content/schema.ts`. The MDX body is optional long-form text shown at the end of the Overview section.

```yaml
---
name: Task Master
tagline: A personal planner that shows exactly what today holds, then reviews how your week went.
order: 1                    # position on the home page and in the menu
draft: false                # true = hidden in production, visible in dev
status: Live                # free text shown with a green dot
type: Installable web app (PWA)
role: "Solo: design, build, deploy"
timeline: "2026"
accent: "#16a34a"           # main project color (hex)
accent2: "#0ea5e9"          # second gradient color (hex)
live: https://taskmaster-eight-sigma.vercel.app/
repo: https://github.com/michaelhughes45/task-master
cover: /projects/task-master/cover.png     # 1280×800, must exist in public/
coverAlt: Task Master's Today page showing events and to-dos
chips: [Next.js, TypeScript, Postgres, Prisma, Better Auth, Tailwind]   # first 4 on the card, first 3 in the meta row
highlights:                 # 3 short bullets (used in share text and the card's description fallback)
  - ...
problem: ...
solution: ...
features:                   # 4–6
  - icon: home              # Lucide icon name from the allowed list in schema.ts
    title: Today page
    text: ...
stack:                      # 1–4 groups
  - group: Frontend
    items:
      - name: Next.js 16
        short: "N"          # 1–2 characters for the badge
        why: ...
arch:
  flow:                     # 2–4 nodes, left to right
    - title: Browser / installed PWA
      sub: React 19 UI
    - title: Next.js on Vercel
      sub: Server Components · Actions
      label: HTTPS          # text on the arrow leading INTO this node
      main: true            # highlighted node
  extras:                   # 0–3 supporting services
    - tag: Auth
      title: Better Auth
      sub: sessions in Postgres, Google OAuth
challenges:                 # 2–4
  - title: ...
    text: ...
---

Optional long-form MDX here.
```

Validation rules (the build fails if any break):

- Every required field present; hex colors valid; URLs valid `https://`.
- `cover` file exists in `public/`.
- `icon` is one of the allowed Lucide names.
- `order` values are unique among non-draft projects.
- Slug is lowercase kebab-case.

The real content starts from `context/mockup/data.js`, which already has all three projects in this shape (field names differ slightly; the schema above wins).

---

## ➕ Adding a Project

The whole point of the content model. To add a project:

1. Run `/add-project <path-to-project-folder>` (see `.claude/skills/add-project/SKILL.md`). It:
   - reads the project's `context/project-overview.md`, `README.md`, `CLAUDE.md` and `package.json` files and its git remote
   - asks for anything it can't find (live URL, role, timeline)
   - writes `content/projects/<slug>.mdx` from `content/projects/_template.mdx`, picking accent colors not used by other projects
   - captures `cover.png` from the live site with Playwright
   - runs `npm run check:content` and `npm run build`
   - runs the `content-reviewer` agent and fixes what it finds
2. Review the page at `/projects/<slug>` on desktop and phone.
3. Commit on a `content/add-<slug>` branch and merge, following the normal workflow.

The project automatically appears on the home page, in the Projects menu, in prev/next links, in the sitemap and gets its own share image.

---

## 🧰 Tech Stack

| Category | Choice | Notes |
| --- | --- | --- |
| ⚛️ Framework | [Next.js](https://nextjs.org/docs) (App Router, React 19) | Fully static: every page prerendered at build time |
| 🟦 Language | [TypeScript](https://www.typescriptlang.org/docs/) | Strict mode |
| 🎨 Styling | [Tailwind CSS v4](https://tailwindcss.com/docs) + [shadcn/ui](https://ui.shadcn.com/) | Tokens from the prototype; CSS-based config |
| 📝 Content | MDX files + frontmatter | Read with `gray-matter`, body rendered with an RSC MDX renderer (check Context7 for the current recommended package at spec 04) |
| ✅ Validation | [Zod](https://zod.dev/) | Frontmatter schema; build fails on bad content |
| ✨ Animation | [Motion](https://motion.dev/) | Scroll reveals and hover effects; respects reduced motion |
| 🔤 Fonts | `next/font/google` | Bricolage Grotesque (display), Inter (body), JetBrains Mono (mono) |
| 🧩 Icons | [Lucide](https://lucide.dev/) | Same set the prototype uses |
| 🌗 Theme | [next-themes](https://github.com/pacocoursey/next-themes) | Light/dark, follows the system by default |
| 🖼️ Share images | `next/og` | One Open Graph image per page, generated at build |
| 🧪 Tests | [Vitest](https://vitest.dev/) | Content loading and schema rules |
| 🎭 Screenshots / UI review | [Playwright MCP](https://github.com/microsoft/playwright-mcp) | Captures covers, used by ui-reviewer |
| ☁️ Hosting | [Vercel](https://vercel.com/) | Free `*.vercel.app` domain to start |

No database, no auth, no environment variables needed.

---

## 🏗️ Architecture

```
content/projects/*.mdx ──► src/lib/content/projects.ts ──► pages (static, at build time)
        │                    (read + Zod validate + sort)        ├─ /                 (cards, menu)
        │                                                        ├─ /projects/[slug]  (generateStaticParams)
public/projects/<slug>/                                          ├─ opengraph-image   (next/og)
  cover.png  ─────────────────────────────────────────────────► └─ sitemap.xml
```

- All content is read on the server at build time. Nothing is fetched at runtime.
- `dynamicParams = false` on `/projects/[slug]`, so unknown slugs are a 404.
- Site-wide settings (name, email, LinkedIn, GitHub, résumé path, whether to show the "Next project" card, toolbox lists, How I build steps) live in `src/config/site.ts`, not in components.

---

## 📁 Project Structure

```
portfolio/
├─ CLAUDE.md, AGENTS.md, README.md, .mcp.json
├─ context/
│  ├─ project-overview.md, coding-standards.md, ai-interaction.md, current-feature.md
│  ├─ features/                 numbered specs (01-…-spec.md)
│  ├─ mockup/                   the agreed HTML prototype + README with tokens
│  ├─ research/                 research prompts for /research
│  └─ screenshots/              full-page screenshots of the prototype (desktop/phone, light/dark)
├─ .claude/
│  ├─ agents/                   code-scanner, ui-reviewer, content-reviewer, seo-a11y-auditor
│  └─ skills/                   feature, add-project, research, cleanup, list-components
├─ content/projects/            _template.mdx + one .mdx per project
├─ public/
│  ├─ projects/<slug>/cover.png
│  └─ resume.pdf
├─ scripts/check-content.ts     validates content + images (npm run check:content)
└─ src/
   ├─ app/
   │  ├─ layout.tsx, page.tsx, not-found.tsx, globals.css
   │  ├─ projects/[slug]/page.tsx, opengraph-image.tsx
   │  ├─ opengraph-image.tsx, sitemap.ts, robots.ts, icon.svg
   ├─ components/
   │  ├─ layout/                SiteHeader, ProjectsMenu, SiteFooter, ThemeToggle
   │  ├─ home/                  Hero, CodeCard, TechMarquee, ProjectCard, NextProjectCard, Steps, Toolbox, AboutPanel
   │  ├─ project/               ProjectHero, MetaRow, Toc, ProblemSolution, FeatureGrid, StackList, ArchDiagram, Challenges, ProjectPager
   │  ├─ shared/                BrowserFrame, Chip, Reveal, Section, StatusDot, ProjectIcon
   │  └─ ui/                    shadcn
   ├─ config/site.ts
   ├─ lib/content/              schema.ts, projects.ts (+ tests)
   └─ lib/utils.ts
```

---

## 🎨 Design

The agreed look is the prototype in `context/mockup/` (open it with the command in `CLAUDE.md`, or look at the full-page screenshots in `context/screenshots/`). Tokens, fonts and rules are in `context/mockup/README.md`. Summary:

- Neutral base, light and dark, with a violet brand color for site-wide accents.
- **Each project has its own two accent colors** used on its card, its page and its share image.
- Display headings in Bricolage Grotesque, body in Inter, labels and chips in JetBrains Mono.
- Browser-frame screenshots, soft glows, a faint grid in the hero, gentle reveal-on-scroll.
- Mobile first: 375px up, 16px side gutter, no horizontal scroll.

---

## 🛠️ Development Workflow

Same as task-master: one numbered spec at a time through `/feature load → start → review → test → complete`. See `context/ai-interaction.md`.

Spec order:

1. `01-project-setup-spec.md`
2. `02-design-system-spec.md`
3. `03-layout-shell-spec.md`
4. `04-content-pipeline-spec.md`
5. `05-home-page-spec.md`
6. `06-project-page-spec.md`
7. `07-project-writeups-spec.md`
8. `08-about-resume-spec.md`
9. `09-seo-share-images-spec.md`
10. `10-deploy-spec.md`
11. `11-add-project-workflow-spec.md`

---

## 🚀 Deploying

- GitHub repo `michaelhughes45/portfolio` (public), connected to Vercel.
- Every push to `main` deploys to production; other branches get preview URLs.
- No environment variables.
- Domain: a free `*.vercel.app` name to start (pick the name in spec 10). A custom domain can be added later without code changes other than `siteUrl` in `src/config/site.ts`.

---

## 🧭 Roadmap

After the 11 specs:

- More projects through `/add-project` as they're finished
- Optional: DevStash as a labeled learning project
- Optional: custom domain
- Optional: short screen-recording GIFs on project pages
- Optional: "Currently working on" strip on the home page

---

## ❓ Open Questions

- Email address and LinkedIn URL for the contact buttons (placeholders until given)
- Résumé PDF (placeholder until given)
- Short bio text for the About panel
- The `*.vercel.app` name to use
- Confirm each project's draft copy is accurate (especially Ez Rentals' seeded-data protection, which came from its deployment plan)
