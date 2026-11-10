# Project Write-ups

## Overview

Write the real content for all three projects (Task Master, PokéTTRPG, Ez Rentals), checked against each repo, with real cover screenshots.

## Requirements

- Create `content/projects/pokettrpg.mdx` and `content/projects/ez-rentals.mdx`, and review `task-master.mdx`, starting from `context/mockup/data.js`.
- **Fact-check every claim** against the project's own source (paths in `context/project-overview.md`): `context/project-overview.md`, `README.md`, `package.json` files and the code itself. Fix or remove anything that isn't true. Known items to confirm:
  - Ez Rentals: is the seeded-demo-data protection (`isSeeded` + 403 guards) actually implemented? If not, replace that challenge.
  - Task Master: the "76 unit tests" figure (date helpers only, or more now?). Prefer a claim that won't go stale ("timezone and DST edge cases covered by unit tests").
  - PokéTTRPG: confirm status wording and timeline with Michael.
  - Versions (Next.js 16, React 19) match each `package.json`.
- Ask Michael for anything that can't be confirmed from the repo (timeline, role wording).
- **Cover screenshots** with Playwright, 1280×800, light mode, saved to `public/projects/<slug>/cover.png`:
  - Task Master: sign in as the seeded demo user from task-master's `prisma/seed.ts` and capture the Today page with data.
  - PokéTTRPG: the landing page (or a battle screen if a demo account exists; ask).
  - Ez Rentals: the listings page after the Render API has woken up and listings have loaded; dismiss or include the demo banner consistently.
  - Compress to under 500 KB each.
- `coverAlt` describes what the screenshot shows.
- Run the `content-reviewer` agent on all three and fix its findings.

## Files to Create / Modify

1. `content/projects/task-master.mdx`, `pokettrpg.mdx`, `ez-rentals.mdx`
2. `public/projects/task-master/cover.png`, `public/projects/pokettrpg/cover.png`, `public/projects/ez-rentals/cover.png`

## Key Gotchas

- Never type the demo password into chat or commit it here; read it from the task-master repo at capture time.
- Free Render APIs take 30–60 seconds to wake. Load the page, wait for real data, then capture.
- Keep copy recruiter-first: short sentences, plain words, what-then-why.

## Testing

1. `npm run check:content` and `npm run build` pass.
2. Every project page reads well at 375px and 1280px; covers are sharp and not cut off awkwardly.
3. content-reviewer reports no High findings.

## References

- `context/mockup/data.js`, `.claude/agents/content-reviewer.md`
