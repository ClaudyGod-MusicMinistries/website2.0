# Git quality gates

These are native Git hooks with a polished terminal UI—no Husky, Lefthook, or hook framework dependency.

Install per clone with:

```bash
npm run setup-hooks
```

- `pre-commit` checks staged hygiene, likely secrets, Prettier, and ESLint without silently modifying files.
- `commit-msg` enforces conventional commit messages.
- `pre-push` audits production dependencies, checks repository formatting, lint, types and tests, then creates the complete production bundle.

Every step includes its elapsed time and an actionable failure summary. Set `NO_COLOR=1` for plain output.
