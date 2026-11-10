# Content Pipeline

## Overview

Load project content from `content/projects/*.mdx`, validate it with Zod, and expose typed helpers for pages. Add the template file and the first project (Task Master) so the pipeline is proven end to end.

## Requirements

- **Schema** `src/lib/content/schema.ts`: the frontmatter shape in `context/project-overview.md` ("Content Model") as a Zod schema, with:
  - hex color check for `accent`/`accent2`
  - `https://` URL check for `live`/`repo`
  - `icon` as a `z.enum` of the allowed icon names (shared with `ProjectIcon`)
  - array lengths: `chips` 3–8, `highlights` 3, `features` 4–6, `stack` 1–4 groups of 1–6 items, `arch.flow` 2–4, `arch.extras` 0–3, `challenges` 2–4
  - `short` 1–2 characters
  - `draft` defaults to `false`
  - export `type Project = z.infer<...> & { slug: string; body: string }`
- **Loader** `src/lib/content/projects.ts` (`server-only`):
  - `getAllProjects()`: reads every `.mdx` in `content/projects/` except files starting with `_`, parses frontmatter with `gray-matter`, validates, adds `slug` from the filename, drops drafts in production, sorts by `order`. Cached per build with React `cache`.
  - `getProject(slug)`: one project or `null`.
  - `getAdjacentProjects(slug)`: `{ prev, next }`, wrapping around.
  - Errors name the file and field: `content/projects/foo.mdx: accent: Invalid hex color`.
  - Duplicate `order` among published projects is an error.
  - Slug must be kebab-case.
- **Cover check**: the loader verifies `public${cover}` exists; missing file is an error in production builds and a warning in dev.
- **MDX body**: render with an RSC-compatible MDX renderer (check Context7 for the current recommended option, such as `next-mdx-remote`'s RSC entry). Styled with Tailwind Typography or a small set of custom element styles matching the site.
- **`content/projects/_template.mdx`**: every field with a comment explaining it and an example value.
- **`content/projects/task-master.mdx`**: converted from `context/mockup/data.js`.
- **`scripts/check-content.ts`** + `npm run check:content`: runs the same validation outside Next.js (no `server-only` import; share the schema and a pure `parseProjectFile` function) and prints a pass/fail line per file.
- Wire the header's Projects menu to `getAllProjects()` (remove the temporary array from spec 03).

## Files to Create / Modify

1. `src/lib/content/schema.ts`, `parse.ts` (pure, testable), `projects.ts` (server-only, file system + cache)
2. `src/lib/content/schema.test.ts`, `parse.test.ts`, `projects.test.ts`, `src/lib/content/__fixtures__/*.mdx`
3. `content/projects/_template.mdx`, `content/projects/task-master.mdx`
4. `scripts/check-content.ts`, `package.json` script
5. `src/app/layout.tsx` (menu data)

## Key Gotchas

- `gray-matter` parses unquoted `2026` as a number; the schema should accept `timeline` as a string and the template should quote it.
- Keep file reading in `projects.ts` and parsing/validation in `parse.ts`, so tests and the script don't need Next.js.
- Tests use fixtures, never the real content folder.

## Testing

1. Unit tests: valid fixture passes; bad hex, bad URL, unknown icon, too many highlights, duplicate order, bad slug each fail with a clear message; drafts filtered in production mode only; sort order; prev/next wrap.
2. `npm run check:content` passes on the real content and fails if you break a field.
3. The Projects menu lists Task Master from the content file.

## References

- `context/project-overview.md` (Content Model), `context/mockup/data.js`
