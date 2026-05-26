# Git Hooks Setup

This project uses native Git hooks (no external dependencies like Husky). All hooks are stored in `.githooks/` and committed to the repository.

## Quick Start

After cloning or pulling the repo, configure git hooks:

```bash
npm run setup-hooks
```

Or manually:

```bash
git config core.hooksPath .githooks
```

## What Hooks Do

### 1. **pre-commit** (before `git commit`)
- Lints TypeScript/TSX files with ESLint
- Fixes formatting issues automatically
- Prevents commits with linting errors
- Re-stages fixed files

```bash
# Trigger:
git commit -m "feat: add new feature"

# Output:
🔍 Running pre-commit checks...
Running ESLint on staged files...
Running Prettier on staged files...
✓ Pre-commit checks passed
```

### 2. **pre-push** (before `git push`)
- Runs TypeScript type checking
- Ensures no type errors before pushing
- Blocks push if type errors exist

```bash
# Trigger:
git push origin main

# Output:
🔍 Running pre-push checks...
Running TypeScript type checking...
✓ All pre-push checks passed — Ready to push
```

### 3. **commit-msg** (validates commit message)
- Enforces Conventional Commit format
- Valid prefixes: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`, `revert`
- Rejects invalid messages with helpful guidance

```bash
# ✓ Valid:
git commit -m "feat(auth): add login page"
git commit -m "fix(cart): resolve empty cart bug"
git commit -m "docs: update README"

# ✗ Invalid:
git commit -m "added new feature"
git commit -m "fixed stuff"
```

## Why This Approach?

✅ **No external dependencies** — Uses git's native capabilities  
✅ **Version controlled** — Hooks are in the repo, same for all developers  
✅ **Transparent** — You can inspect what each hook does  
✅ **Lightweight** — No npm package overhead  
✅ **Professional** — Used by senior projects (Linux, Git, etc)  

## Troubleshooting

### Hooks Not Running?

1. Verify configuration:
```bash
git config core.hooksPath
# Should output: .githooks
```

2. Reconfigure if needed:
```bash
npm run setup-hooks
```

3. Check hook permissions:
```bash
ls -la .githooks/
# All hooks should have -rwxr-xr-x (executable)
```

### Bypass Hooks (Emergency Only)

```bash
# Commit without pre-commit hook:
git commit --no-verify

# Push without pre-push hook:
git push --no-verify
```

⚠️ **Note:** Only use `--no-verify` for genuine emergencies. Hooks exist to maintain code quality.

## Editing Hooks

Hooks are shell scripts in `.githooks/`. You can edit them directly:

```bash
nano .githooks/pre-commit
# Make changes, save, commit
git add .githooks/pre-commit
git commit -m "chore: update git hooks"
```

All developers will get updated hooks on `git pull`.

## Adding New Hooks

Git supports these standard hooks:

- `pre-commit` — Before commit
- `commit-msg` — Validate commit message
- `pre-push` — Before push
- `pre-rebase` — Before rebase
- `post-merge` — After merge
- `post-checkout` — After checkout

Create a new file in `.githooks/` and make it executable:

```bash
cat > .githooks/post-merge << 'EOF'
#!/bin/bash
echo "Running post-merge tasks..."
npm install  # Reinstall if package.json changed
EOF

chmod +x .githooks/post-merge
git add .githooks/post-merge
git commit -m "chore: add post-merge hook"
```

## References

- [Git Hooks Documentation](https://git-scm.com/docs/githooks)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
