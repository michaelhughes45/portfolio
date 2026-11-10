# Test Action

1. Read current-feature.md to understand what was implemented
2. Identify content-layer code (`src/lib/content/`), scripts and utilities added/modified for this feature
3. Check if tests already exist for these functions
4. For functions without tests that have testable logic, write unit tests:
   - Create unit tests using Vitest
   - Focus on the content layer and utilities (not components)
   - Use fixture files in `src/lib/content/__fixtures__/`, never the real `content/` folder
   - Test happy path and error cases
   - Do not write tests just to write them. Use your best judgement
5. Run `npm test` and `npm run check:content` (once it exists) to verify everything passes
6. Report test coverage for the new feature code
