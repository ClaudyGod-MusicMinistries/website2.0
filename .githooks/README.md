# Git hooks

Native git hooks — no Husky, no extra package. Tracked in version control here instead of the untracked `.git/hooks/`, and wired up via git's built-in `core.hooksPath` setting.

## Setup

Runs automatically: `npm install` inside `ClaudyGodWebApp/` triggers the `prepare` script, which runs `git config core.hooksPath .githooks` for you. Nothing to do manually.

If you ever need to do it by hand:

```bash
git config core.hooksPath .githooks
```

## What runs

- **pre-commit** — ESLint + `prettier --check` on your staged `.ts`/`.tsx`/`.js`/`.jsx` files, plus a project-wide `tsc --noEmit` type-check. Fast; fails and tells you the exact command to fix rather than silently rewriting your changes.
- **pre-push** — full `npm run build` (production build — catches what a dev server tolerates) + `npm test` (runs whatever test suite exists; picks up real tests automatically the moment any are added).

Both hooks are no-ops (skip cleanly) if the commit/push doesn't touch anything under `ClaudyGodWebApp/`.

## Bypassing (use sparingly)

```bash
git commit --no-verify   # skip pre-commit
git push --no-verify     # skip pre-push
```
