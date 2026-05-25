# ClaudyGod Web App — Git Workflow & CI/CD Pipeline

This document describes the production-ready git workflow and CI/CD pipeline for the ClaudyGod Web Application.

## Table of Contents

- [Branch Strategy](#branch-strategy)
- [Development Workflow](#development-workflow)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment Process](#deployment-process)
- [Rollback Procedures](#rollback-procedures)
- [Emergency Hotfixes](#emergency-hotfixes)

---

## Branch Strategy

We use a **modified Git Flow** branching strategy optimized for continuous deployment.

### Main Branches

- **`main`** - Production-ready code
  - ✅ Always deployable
  - ✅ Protected branch (requires PR review)
  - ✅ Auto-deploys to production on push
  - ✅ Must pass all CI/CD checks

- **`develop`** - Integration branch for features
  - Development and feature integration
  - Staging environment deployments
  - Protected branch (requires PR review)

### Supporting Branches

#### Feature Branches (`feature/*`)
```bash
git checkout -b feature/your-feature-name develop
```

- Branch from: `develop`
- Merge back into: `develop` (via PR)
- Naming convention: `feature/kebab-case-name`
- Examples:
  - `feature/responsive-images`
  - `feature/new-album-section`
  - `feature/performance-optimization`

#### Bugfix Branches (`bugfix/*`)
```bash
git checkout -b bugfix/issue-description develop
```

- Branch from: `develop`
- Merge back into: `develop` (via PR)
- Naming convention: `bugfix/issue-number-description`
- Examples:
  - `bugfix/404-broken-links`
  - `bugfix/memory-leak-images`

#### Hotfix Branches (`hotfix/*`)
```bash
git checkout -b hotfix/critical-issue main
```

- Branch from: `main`
- Merge back into: `main` AND `develop`
- Naming convention: `hotfix/issue-description`
- Examples:
  - `hotfix/production-outage`
  - `hotfix/critical-security-patch`

#### Release Branches (`release/*`)
```bash
git checkout -b release/v1.2.0 develop
```

- Branch from: `develop`
- Merge back into: `main` and `develop`
- Naming convention: `release/vX.Y.Z` (semantic versioning)
- Used for final testing and release preparation

---

## Development Workflow

### 1. Create a Feature Branch

```bash
# Update develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature-name

# Or use the interactive method
git checkout --track origin/develop
git flow feature start your-feature-name
```

### 2. Make Changes & Commit

```bash
# Make your changes
# ... edit files ...

# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add responsive image optimization

- Implement Next.js Image component best practices
- Add srcSet and lazy loading
- Improve performance metrics by 30%

Closes #123"
```

**Commit Message Format** (Conventional Commits):
```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`

### 3. Push to Remote

```bash
git push origin feature/your-feature-name
```

### 4. Create Pull Request

- Go to GitHub → New Pull Request
- Base: `develop`
- Compare: `feature/your-feature-name`
- Fill in PR template
- Request reviewers
- Ensure all CI checks pass

### 5. Code Review & Merge

- Address reviewer feedback
- Maintain clean commit history
- Squash commits if needed (1 commit per feature)
- Merge to `develop` when approved

---

## CI/CD Pipeline

### Automated Workflows

#### 1. **PR Quality Checks** (`pr-checks.yml`)

Runs on every pull request:

```
✅ Lint & Format    → ESLint + Prettier
✅ Type Checking    → TypeScript
✅ Build Test       → npm run build
✅ Unit Tests       → Jest (if configured)
✅ Docker Build     → Multi-stage build test
✅ Security Scan    → npm audit + Snyk
```

**Status Badges** in PR:
- 🟢 All checks passed → Ready to merge
- 🟡 Checks running → Wait for results
- 🔴 Checks failed → Fix issues and push again

#### 2. **Build & Push to GHCR** (`build-and-push.yml`)

Runs on every push to `main` or tags:

```bash
# Triggered by:
- Push to main
- Tag creation (v*.*.*)
- Manual workflow_dispatch
```

**Output:**
- Docker image tagged with:
  - `main` (branch tag)
  - `latest` (on main only)
  - `v1.2.3` (on version tags)
  - `sha-abc123` (short commit SHA)

**Registry:** `ghcr.io/claudygod-musicministries/claudygodwebapp`

#### 3. **Deploy to Production** (`deploy-production.yml`)

Runs automatically after successful build on `main`:

```
1. Authenticate with GHCR
2. Pull latest image
3. Stop old container
4. Start new container
5. Run health checks
6. Clean up old images
7. Send Slack notification
```

**Environment Checks:**
- Requires production environment
- Requires manual approval first time
- Validates image health

---

## Deployment Process

### Automatic Deployment (Main Branch)

```
Push to main
    ↓
pr-checks.yml (quality checks)
    ↓
build-and-push.yml (build Docker image)
    ↓
deploy-production.yml (deploy to VPS)
    ↓
✅ Deployment complete + Slack notification
```

### Manual Deployment

If auto-deployment fails or you need manual control:

```bash
# Via GitHub Actions
1. Go to Actions
2. Select "Deploy to Production"
3. Click "Run workflow"
4. Input deployment tag (default: "latest")
5. Watch logs for deployment progress
```

### Deployment Checklist

Before pushing to `main`:
- [ ] All tests passing locally
- [ ] Code reviewed and approved
- [ ] No breaking changes
- [ ] Environment variables set
- [ ] Database migrations (if any) tested
- [ ] Performance impact assessed
- [ ] Documentation updated

---

## Rollback Procedures

### Quick Rollback (Last 48 hours)

```bash
# List available images
docker images | grep claudygodwebapp

# Roll back to specific image
docker pull ghcr.io/claudygod-musicministries/claudygodwebapp:sha-abc123

# Via GitHub Actions
1. Go to VPS
2. Update .env: FRONTEND_IMAGE=ghcr.io/.../claudygodwebapp:sha-abc123
3. docker compose down web && docker compose up -d web
```

### Full Rollback

If deployment causes critical issues:

```bash
# SSH to VPS
ssh user@vps-host

# Stop problematic container
docker compose down web

# Restart with previous known-good image
cd /path/to/deploy
export FRONTEND_IMAGE="ghcr.io/.../claudygodwebapp:previous-tag"
docker compose up -d web

# Verify
docker compose ps
docker compose logs web
```

### Notify Team

```bash
# Slack notification
Post in #deployments channel:
"⚠️ ROLLBACK: Rolled back to [previous-version] due to [reason]"
```

---

## Emergency Hotfixes

### Critical Production Bug

```bash
# 1. Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-issue

# 2. Fix the issue
# ... make changes ...
git add .
git commit -m "fix: critical production issue

This addresses the critical bug reported in production."

# 3. Push and create PR to main
git push origin hotfix/critical-issue

# 4. Create PR to main (not develop)
# ⚠️ Fast-track review required

# 5. After merge to main, also merge to develop
git checkout develop
git pull origin develop
git merge --no-ff main
git push origin develop
```

### Hotfix Deployment

```bash
# Hotfixes bypass normal review if critical
1. Create hotfix branch
2. Fast-track review (30 min max)
3. Deploy immediately after merge
4. Monitor logs closely
5. Post-incident review after resolution
```

---

## Security & Access Control

### Protected Branch Rules (Main)

```yaml
require_code_review: true
required_approvals: 1
require_up_to_date_branches: true
require_status_checks_to_pass:
  - pr-checks
  - build-and-push
dismiss_stale_reviews: true
require_signed_commits: false  # Optional
```

### GitHub Secrets Required

```
VPS_HOST              # Production VPS hostname
VPS_USER              # SSH user
VPS_SSH_KEY           # Private SSH key
VPS_PORT              # SSH port (default: 22)
VPS_DEPLOY_PATH       # Deployment directory
SLACK_WEBHOOK         # Slack notifications
GITHUB_TOKEN          # Auto-generated
CODECOV_TOKEN         # Optional: coverage reporting
SNYK_TOKEN            # Optional: security scanning
```

---

## Local Development Setup

### Initial Setup

```bash
# Clone repository
git clone https://github.com/claudygod-musicministries/ClaudyGodWebApp.git
cd ClaudyGodWebApp

# Install dependencies
make install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
make dev
```

### Useful Commands

```bash
# Development
make dev              # Start dev server
make build           # Build for production
make lint            # Run linter
make format          # Format code
make test            # Run tests

# Docker (local)
make docker-build    # Build Docker image
make docker-run      # Run in Docker container

# Deployment (if VPS configured)
make deploy-local    # Deploy to VPS
```

### Git Configuration

```bash
# Set your identity
git config user.name "Your Name"
git config user.email "your@email.com"

# Setup git aliases for convenience
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
```

---

## Troubleshooting

### PR Checks Failing

```bash
# Run checks locally before pushing
make lint
make type-check
make build
make test

# Fix issues and push again
git add .
git commit -m "fix: address CI failures"
git push origin feature/your-feature
```

### Deployment Stuck

```bash
# Check deployment logs
# Go to: Actions → Deploy to Production → View logs

# If need to rollback
# Follow rollback procedures above
```

### Image Not Pulling from GHCR

```bash
# Verify authentication on VPS
docker logout ghcr.io
docker login ghcr.io -u github-username -p token

# Pull image manually
docker pull ghcr.io/claudygod-musicministries/claudygodwebapp:latest
```

---

## Contact & Support

For questions or issues:
- 📧 Email: peter4tech@gmail.com
- 🐙 GitHub: @peter4tech
- 💬 Slack: #engineering channel

---

**Last Updated**: 2026-05-25
**Version**: 1.0.0
