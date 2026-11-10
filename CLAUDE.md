@AGENTS.md

# Portfolio

Michael Hughes's developer portfolio, aimed at recruiters and employers. A home page introduces Michael and shows a card for each project; every project has its own case-study page covering what it does, the tech stack and why, how it works and the hard problems solved. New projects are added as one content file each.

## Context Files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

Reference, read only when working in that area:

- `context/mockup/README.md` — the agreed prototype, design tokens and how to view it
- `context/screenshots/` — full-page screenshots of the prototype, desktop and phone, light and dark
- `context/features/` — numbered feature specs, built in order

## Commands

- **Dev server**: `npm run dev` (runs on http://localhost:3000)
- **Build**: `npm run build`
- **Production server**: `npm run start`
- **Lint**: `npm run lint`
- **Unit tests**: `npm test` (Vitest, single run) or `npm run test:watch`
- **Content check**: `npm run check:content` (validates every project file and its images; added in spec 04/11)
- **View the prototype**: `python -m http.server 5500 --directory context/mockup`, then open http://localhost:5500

(The npm scripts exist once spec 01 is done.)

## Adding a Project

Use the `/add-project` skill. It reads the finished project's own repo, drafts `content/projects/<slug>.mdx`, captures screenshots and runs the content reviewer. Never hard-code a project into a page or component.

**IMPORTANT:** Do not add Claude to any commit messages
