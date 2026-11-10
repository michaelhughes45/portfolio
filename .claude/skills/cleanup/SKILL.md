---
name: cleanup
description: Clean up project housekeeping tasks (add "run" to execute fixes)
argument-hint: run|check
---

Review the codebase for cleanup tasks:

1. Make sure that the history in @context/current-feature.md is in order from oldest to newest
2. Find unnecessary console.log statements in src/ and scripts/
3. Find unused imports
4. Check for stale TODO comments (especially placeholder links in `src/config/site.ts`)
5. Find orphaned/unused files, including images in `public/projects/` that no content file references
6. Check that context files match actual project state (project list and URLs in `context/project-overview.md` vs `content/projects/`)
7. Find project content or site text hard-coded in components instead of `content/projects/` or `src/config/site.ts`
8. Find `@ts-ignore` comments that might be stale
9. Find leftover `href="#"` placeholder links
10. Check `/dev/ui` is still excluded from production

**Mode: $ARGUMENTS**

If no argument or argument is "check":

- Only report findings, don't modify anything
- List what WOULD be cleaned up

If the argument is "run" or "fix":

- First, report all findings with numbered items
- Then ask: "Which items would you like me to fix? (enter numbers like 1,3,5 or 'all' or 'none')"
- Wait for user response before making any changes
- Only fix the items the user specifies
- Report what you changed
