# Michael Hughes · Portfolio

My developer portfolio: a home page with a card for each project, plus one case-study page per project covering what it does, the tech stack and why, how it works and the hard problems solved.

Static Next.js site (App Router, TypeScript, Tailwind CSS v4, shadcn/ui), hosted on Vercel. No database, no environment variables.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:3000 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm test` | Unit tests (Vitest, single run) |
| `npm run test:watch` | Unit tests in watch mode |

## Adding a project

Each project is one file, `content/projects/<slug>.mdx`, plus a cover screenshot in `public/projects/<slug>/`. Use the `/add-project` Claude Code skill: it reads the project's repo, drafts the content file, captures the screenshot and validates it. No page or component changes are needed.

## Docs

Planning docs, feature specs and the agreed HTML prototype live in `context/`.
