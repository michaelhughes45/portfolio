# AI Interaction Guidelines

## Communication

- Be concise and direct
- Explain non-obvious decisions briefly
- Ask before large refactors or architectural changes
- Don't add features not in the project spec
- Never delete files without clarification

## Workflow

This is the common workflow that we will use for every single feature/fix:

1. **Document** - Document the feature in @context/current-feature.md.
2. **Branch** - Create new branch for feature, fix, etc
3. **Implement** - Implement the feature/fix that I create in @context/current-feature.md
4. **Test** - Write or update Vitest unit tests for any new or changed content-layer code and utilities, and run `npm test`. Verify it works in the browser at 375px and 1280px, in light and dark mode. Run `npm run build` and fix any errors
5. **Iterate** - Iterate and change things if needed
6. **Commit** - Only after tests and build pass and everything works
7. **Merge** - Merge to main
8. **Delete Branch** - Delete branch after merge
9. **Review** - Review AI-generated code periodically and on demand.
10. Mark as completed in @context/current-feature.md and add to history

Do NOT commit without permission and until the tests and build pass. If either fails, fix the issues first.

## Branching

We will create a new branch for every feature/fix. Name branch **feature/[feature]**, **fix/[fix]** or **content/[change]** (for adding or editing project content). Ask to delete the branch once merged.

## Commits

- Ask before committing (don't auto-commit)
- Use conventional commit messages (feat:, fix:, chore:, content:, etc.)
- Keep commits focused (one feature/fix per commit)
- Never put "Generated With Claude" or a Claude co-author line in the commit messages

## When Stuck

- If something isn't working after 2-3 attempts, stop and explain the issue
- Don't keep trying random fixes
- Ask for clarification if requirements are unclear

## Code Changes

- Make minimal changes to accomplish the task
- Don't refactor unrelated code unless asked
- Don't add "nice to have" features
- Preserve existing patterns in the codebase

## Writing Project Content

- Every claim about a project must be true in that project's repo. Check the source (paths are in `context/project-overview.md`) instead of guessing.
- If something can't be confirmed, ask rather than write it.
- Write for a recruiter first: what it is, why it matters, then the details.

## Design

- The prototype in `context/mockup/` is the agreed design. Match it unless a spec says otherwise.
- If a change to the look seems needed, show it and ask before building it.

## Code Review

Review AI-generated code periodically, especially for:

- Content hard-coded in components instead of coming from `content/` or `src/config/site.ts`
- Accessibility (headings, alt text, focus, contrast on accent colors)
- Performance (image sizes, unnecessary client components, layout shift)
- Patterns (matches existing codebase?)
