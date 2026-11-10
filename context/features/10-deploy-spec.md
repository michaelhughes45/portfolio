# Deploy

## Overview

Put the site live on Vercel with a `*.vercel.app` address and link to it from the places recruiters look.

## Requirements

- Ask Michael which `*.vercel.app` name to use (for example `michaelhughes.vercel.app` or `michael-hughes-dev.vercel.app`), and check it's free.
- Push `main` to `github.com/michaelhughes45/portfolio` (ask first).
- Import the repo in Vercel (Michael does this in the Vercel dashboard; give him the exact steps). Framework preset Next.js, no environment variables.
- Set the production domain to the chosen name; update `site.siteUrl` and commit.
- Remove or confirm production-exclusion of `/dev/ui`.
- Confirm on the live URL: every page, share images (paste the URL into LinkedIn's Post Inspector), `sitemap.xml`, 404, phone layout.
- Suggest (don't do) next steps for Michael: add the URL to his GitHub profile, LinkedIn "Featured", and résumé; add a link back to the portfolio from each project's README.

## Files to Create / Modify

1. `src/config/site.ts` (`siteUrl`)
2. `README.md` (live URL)
3. `context/project-overview.md` (live URL, decisions)

## Key Gotchas

- Preview deployments get their own URLs; `metadataBase` should still point to production so shared links are consistent.
- Don't enable Vercel Analytics or other extras unless Michael asks.

## Testing

1. Live site passes the checks in spec 09 (Lighthouse on the real URL).
2. A push to a branch creates a preview; merging to `main` updates production.

## References

- https://vercel.com/docs/frameworks/nextjs
