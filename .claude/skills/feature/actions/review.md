# Review Action

1. Read current-feature.md to understand the goals
2. Review all code changes made for this feature
3. Check for:
   - ✅ Goals met
   - ❌ Goals missing or incomplete
   - ⚠️ Code quality issues or bugs
   - 📝 No project content or site text hard-coded in components (must come from `content/projects/` or `src/config/site.ts`)
   - 🎨 Matches the prototype in `context/mockup/` at 375px and 1280px, light and dark
   - ♿ Headings, alt text, focus states, contrast on accent colors
   - ⚡ Pages still static; `'use client'` only where needed; images have `sizes`
   - 🧪 Adequate test coverage for new content-layer code and utilities
   - 🚫 Scope creep (code beyond goals)
4. Final verdict: Ready to complete or needs changes
