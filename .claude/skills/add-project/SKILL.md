---
name: add-project
description: Add a finished project to the portfolio - reads the project's repo, drafts content/projects/<slug>.mdx, captures a cover screenshot, validates and reviews it
argument-hint: <path-to-project-folder> [slug]
---

# Add a Project

Add a new project to the portfolio from its own repo: $ARGUMENTS

The result is one new file, `content/projects/<slug>.mdx`, and one image, `public/projects/<slug>/cover.png`. No page or component changes. If you find yourself editing a component to make the project fit, stop and ask.

## Steps

### 1. Gather facts

1. If no path was given, ask for the project's folder. Check it exists.
2. Read, if present: `context/project-overview.md`, `README.md`, `CLAUDE.md`, every `package.json` (root, `frontend/`, `backend/`), deployment config (`vercel.json`, `render.yaml`), and `git remote -v`.
3. Work out: name, one-line purpose, features that **exist in the code** (check, don't trust plans), the stack with versions, the architecture (what talks to what, where it's hosted), and 2–4 genuinely hard problems (look at the code, decisions docs, specs and commit history).
4. Ask Michael in one message for whatever you couldn't find: live URL, role ("Solo: design, build, deploy", team, school), timeline, status wording, and whether a demo account exists for screenshots. Don't guess these.

### 2. Draft the content

1. Slug: kebab-case from the name; confirm it isn't taken in `content/projects/`.
2. Copy `content/projects/_template.mdx` to `content/projects/<slug>.mdx` and fill every field, following the schema in `src/lib/content/schema.ts`.
3. **Accent colors**: list the `accent`/`accent2` of every existing project, then pick two that are clearly different in hue, look good as a gradient, and keep white text readable on `accent` (4.5:1).
4. `order`: the next number after the current highest, unless Michael says where it goes.
5. Set `draft: true` until step 5 passes.
6. Write recruiter-first: tagline a non-engineer understands, problem → solution as a short story, a reason in every stack "why", challenges as problem → approach → result. Match the tone of the existing project files.

### 3. Capture the cover

1. Open the live site with Playwright at 1280×800, light mode.
2. Wait for real data to load (free Render APIs can take up to a minute to wake). Sign in with the project's demo account if it needs one; read credentials from that project's repo at capture time and never write them into this repo or into chat.
3. Pick the screen that best shows what the project does (not a login page unless that's all there is).
4. Save to `public/projects/<slug>/cover.png`, under 500 KB. Write `coverAlt` describing what's on screen.

### 4. Validate

1. `npm run check:content` and `npm run build`. Fix anything they report.
2. `npm run dev` and look at `/` and `/projects/<slug>` at 375px and 1280px, light and dark.

### 5. Review

1. Run the `content-reviewer` agent on the new file.
2. Fix High and Medium findings; show Michael the Low ones.
3. Set `draft: false`.

### 6. Hand over

1. Show Michael the page and a short summary: what you wrote, what you couldn't confirm, what he should check.
2. Ask before committing. Use branch `content/add-<slug>` and commit `content: add <name> project`, then follow the normal complete flow (merge, delete branch, push when asked).
3. Add the project to the "Projects" table in `context/project-overview.md` (slug, name, live, repo, local source) in the same commit.

## Rules

- Every claim must be true in the project's code. If a doc says something is planned, it isn't a feature yet.
- Never put secrets, demo passwords or private URLs in content.
- Don't change other projects' files, except to resolve an `order` clash Michael agreed to.
