# Add-Project Workflow

## Overview

Make adding a finished project quick and safe: harden the content checks, finish and test the `/add-project` skill end to end, and document it. After this, a new project is one MDX file plus a screenshot, with no code changes.

## Requirements

- **Content checks** (`npm run check:content`, also run by `npm run build` through a `prebuild` script):
  - schema validation (spec 04)
  - cover exists and is under 500 KB
  - no duplicate `order`, slug or `accent` among published projects
  - `live` and `repo` respond with 2xx/3xx (only with `--online`, so offline builds still work)
- **Template**: `content/projects/_template.mdx` is complete, commented, and matches the schema exactly. A test parses the template (with placeholders filled by the test) so schema and template can't drift apart.
- **`/add-project` skill** (`.claude/skills/add-project/SKILL.md`, already drafted): walk through it once for real with a test project (for example a draft entry for DevStash with `draft: true`, then delete it or keep it as a draft if Michael wants), and fix any step that didn't work.
- **Reordering**: document how to change `order` and that the home page, menu and prev/next follow it.
- **Retiring a project**: set `draft: true` (hidden in production) rather than deleting, unless Michael asks to delete.
- **Docs**: a "Adding a project" section in `README.md` with both the skill route and the manual route (copy template → fill → add cover → `npm run check:content`).
- Update `context/project-overview.md` if anything about the content model changed.

## Files to Create / Modify

1. `scripts/check-content.ts`, `package.json` (`prebuild`, `check:content`)
2. `content/projects/_template.mdx`, `src/lib/content/template.test.ts`
3. `.claude/skills/add-project/SKILL.md`
4. `README.md`

## Key Gotchas

- The online link check must never run during Vercel builds by default (flaky external sites would block deploys).
- Accent colors: the skill should pick colors that are distinct from existing projects and pass contrast; list the existing ones before choosing.

## Testing

1. Breaking any field in a project file makes `npm run build` fail with a clear message.
2. A dry run of `/add-project` produces a valid draft file and cover for a real project folder.
3. Setting a project to `draft: true` removes it from the production build's home page, menu, sitemap and pager.

## References

- `.claude/skills/add-project/SKILL.md`, `context/project-overview.md` (Content Model, Adding a Project)
