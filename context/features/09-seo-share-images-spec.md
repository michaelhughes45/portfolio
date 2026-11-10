# SEO and Share Images

## Overview

Make the site look good when shared (LinkedIn, Slack, email) and easy to find: metadata, generated Open Graph images, sitemap, robots, favicon and an accessibility/performance pass.

## Requirements

- **Root metadata** in `layout.tsx`: `metadataBase` from `site.siteUrl`, title template `%s · Michael Hughes`, default description, `openGraph` (type website, site name), `twitter` card `summary_large_image`.
- **Home share image** `src/app/opengraph-image.tsx` with `next/og` (1200×630): dark background, the logo mark, "Michael Hughes", "Full-stack developer", and the project names as colored chips.
- **Project share image** `src/app/projects/[slug]/opengraph-image.tsx`: background gradient in the project's accent colors, project name, tagline, 3 chips, "Michael Hughes" at the bottom. Generated for every project via `generateStaticParams`.
- Load Bricolage Grotesque for the OG images (fetch the font file at build, or bundle a `.ttf` in `src/app/fonts/`).
- `src/app/sitemap.ts`: `/` and every published project page.
- `src/app/robots.ts`: allow all, point to the sitemap.
- `src/app/icon.svg`: the MH logo mark; `apple-icon.png` 180×180.
- JSON-LD `Person` on the home page (name, url, sameAs GitHub and LinkedIn, jobTitle).
- Run the `seo-a11y-auditor` agent and fix High/Medium findings.

## Files to Create / Modify

1. `src/app/layout.tsx`, `src/app/page.tsx` (JSON-LD)
2. `src/app/opengraph-image.tsx`, `src/app/projects/[slug]/opengraph-image.tsx`
3. `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/icon.svg`, `src/app/apple-icon.png`

## Key Gotchas

- `next/og` supports a subset of CSS (flexbox only, no grid). Check the current docs in `node_modules/next/dist/docs/`.
- `metadataBase` must be the real URL by spec 10, or share images resolve to localhost.

## Testing

1. Visit `/opengraph-image` and `/projects/<slug>/opengraph-image` and check each image.
2. `/sitemap.xml` and `/robots.txt` are correct.
3. Lighthouse (mobile) on `/` and one project page: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100.

## References

- `.claude/agents/seo-a11y-auditor.md`
