# About and Résumé

## Overview

Replace the About panel and contact placeholders with Michael's real bio, email, LinkedIn and résumé PDF.

## Requirements

- Ask Michael for: a 2–3 sentence bio (or draft one from his answers about school, interests and the role he wants), email address, LinkedIn URL, and the résumé PDF.
- Put the bio, email and LinkedIn in `src/config/site.ts`; remove the TODO placeholders.
- Save the PDF as `public/resume.pdf`. Hero "Résumé" and About "Download résumé" link to `/resume.pdf` (opens in a new tab; `download` attribute on the About button).
- Email button uses `mailto:`. Show the address as text too, so people can copy it.
- Optional (ask first): a photo in the About panel (`public/me.jpg`, `next/image`, round or rounded-square).
- Confirm the hero intro and "Open to full-stack and front-end roles" line still match what Michael is looking for.

## Files to Create / Modify

1. `src/config/site.ts`
2. `public/resume.pdf` (+ `public/me.jpg` if chosen)
3. `src/components/home/AboutPanel.tsx`, `Hero.tsx` (only if layout changes for the photo)

## Key Gotchas

- Don't invent bio facts. Use only what Michael provides.
- Check the PDF has no personal details Michael doesn't want public (home address, phone).

## Testing

1. All contact links work; résumé opens and downloads.
2. No `#` placeholder links remain (`grep` for `href="#"`).

## References

- `context/mockup/index.html` (`.cta`)
