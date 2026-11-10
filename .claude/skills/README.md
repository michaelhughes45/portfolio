# Skills

Custom Claude Code skills (slash commands) for the portfolio. Each skill has its own subfolder with a `SKILL.md` file.

- `feature/` - Main workflow command for loading, starting, reviewing, testing and completing features
- `add-project/` - Adds a finished project: reads its repo, drafts `content/projects/<slug>.mdx`, captures a cover screenshot, validates and reviews it
- `research/` - Generates documentation from research prompt files into the `docs/` folder
- `cleanup/` - Runs housekeeping tasks like finding unused imports, stale TODOs, orphaned images and hard-coded content
- `list-components/` - Simple utility to list React component files with descriptions

## Agents

Defined in `.claude/agents/`:

- `code-scanner` - Security, performance and code quality scan of the whole codebase
- `ui-reviewer` - Reviews pages with Playwright for polish, mobile usability and accessibility, against the prototype
- `content-reviewer` - Fact-checks project write-ups against each project's real repo and edits for recruiter clarity
- `seo-a11y-auditor` - Metadata, share images, sitemap, accessibility and Lighthouse checks
