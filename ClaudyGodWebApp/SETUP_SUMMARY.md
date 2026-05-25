# 🎯 ClaudyGod Web App — Production CI/CD Setup Complete

## ✅ Setup Summary

A **top-tier, industry-standard CI/CD pipeline** has been implemented for seamless development, testing, and production deployment.

---

## 📋 Files Created

### GitHub Actions Workflows (`.github/workflows/`)

| File | Purpose | Trigger |
|------|---------|---------|
| `build-and-push.yml` | Build Docker image & push to GHCR | Push to main, version tags, manual |
| `pr-checks.yml` | Quality checks (lint, type, build, tests) | Every PR to main/develop |
| `deploy-production.yml` | Deploy to production VPS | Push to main, manual |
| `CODEOWNERS` | Code review requirements | N/A - for PR management |
| `pull_request_template.md` | PR submission template | N/A - GitHub UI |

### Docker & Build

| File | Purpose |
|------|---------|
| `Dockerfile` | Production-optimized multi-stage build |
| `.dockerignore` | Optimize Docker layer caching |

### Development & Local

| File | Purpose |
|------|---------|
| `Makefile` | 12 useful commands for dev/build/deploy |

### Documentation

| File | Purpose |
|------|---------|
| `GIT_WORKFLOW.md` | Complete git branching & workflow guide |
| `CI_CD_SETUP.md` | Detailed CI/CD configuration guide |
| `SETUP_SUMMARY.md` | This file |

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Configure GitHub Secrets

Go to: **GitHub → Settings → Secrets and variables → Actions**

Required secrets:
```
VPS_HOST          = your-vps-ip-or-hostname
VPS_USER          = deploy-user
VPS_SSH_KEY       = (private SSH key content)
VPS_PORT          = 22 (optional)
VPS_DEPLOY_PATH   = /opt/claudygod/deployment
SLACK_WEBHOOK     = (optional, for notifications)
```

### Step 2: Test Locally

```bash
cd /root/website2.0/ClaudyGodWebApp

# Install dependencies
make install

# Start dev server
make dev

# Run quality checks
make lint
make type-check
make build
```

### Step 3: Make Your First Deployment

```bash
# Create feature branch
git checkout -b feature/test-deployment develop

# Make a small change
echo "# Testing CI/CD pipeline" >> README.md

# Commit and push
git add .
git commit -m "test: verify CI/CD pipeline"
git push origin feature/test-deployment

# Create PR on GitHub
# → Wait for all checks to pass
# → Merge to develop
# → Create PR from develop to main
# → Merge to main
# → Watch deployment in Actions tab
```

---

## 🔄 Complete Pipeline Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT WORKFLOW                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. git checkout -b feature/your-feature develop               │
│  2. Make changes & commit                                       │
│  3. git push origin feature/your-feature                        │
│  4. Create Pull Request (PR) on GitHub                          │
│     ├─ Target: develop                                          │
│     └─ Source: feature/your-feature                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              AUTOMATIC PR QUALITY CHECKS (pr-checks.yml)         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ✅ Lint (ESLint + Prettier)                                   │
│  ✅ Type Check (TypeScript)                                    │
│  ✅ Build Test (npm run build)                                 │
│  ✅ Unit Tests (Jest)                                          │
│  ✅ Docker Build Test                                          │
│  ✅ Security Scan (npm audit + Snyk)                           │
│                                                                 │
│  Status: 🟢 All passed or 🔴 Failed                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              CODE REVIEW & APPROVAL                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. @peter4tech reviews code                                    │
│  2. Approve & merge to develop                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│          PREPARE FOR PRODUCTION (develop → main)                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  When ready to deploy:                                          │
│  1. Create PR: develop → main                                   │
│  2. Final review                                                │
│  3. Merge to main                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│         AUTOMATIC BUILD & PUSH (build-and-push.yml)             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Build Docker image (multi-stage)                            │
│  2. Tag image:                                                  │
│     - ghcr.io/.../claudygodwebapp:main                          │
│     - ghcr.io/.../claudygodwebapp:latest                        │
│     - ghcr.io/.../claudygodwebapp:sha-abc123                    │
│  3. Push to GitHub Container Registry                           │
│  4. Slack notification (success/failure)                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│        AUTOMATIC DEPLOYMENT (deploy-production.yml)              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. SSH to production VPS                                       │
│  2. Authenticate with GHCR                                      │
│  3. Pull latest Docker image                                    │
│  4. Stop old web container gracefully                           │
│  5. Start new web container                                     │
│  6. Wait for health checks (30s)                                │
│  7. Clean up old images (older than 48h)                        │
│  8. Slack notification                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              ✅ DEPLOYED TO PRODUCTION                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Website live at: https://claudygod.com                         │
│  Logs available at: VPS or GitHub Actions                       │
│                                                                 │
│  Timeline: ~3-5 minutes from merge to live                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Branching Strategy

```
main (production)
  ↑
  └─ release/v1.2.3 (release preparation)
       ↓
       └─ Merge back after release
  ↑
  └─ hotfix/* (critical production fixes)
       ↓
       └─ Merge to both main & develop
  
develop (integration)
  ↑
  ├─ feature/* (new features)
  ├─ bugfix/* (bug fixes)
  └─ (other branches)
       ↓
       └─ Merge via PR after review
```

---

## 🐳 Docker Image Details

### Build Strategy (Multi-Stage)

```dockerfile
Stage 1: Builder
├─ Node 18 Alpine
├─ Install build tools (Python, Make, C++)
├─ npm ci (frozen dependencies)
└─ npm run build (Next.js compile)

Stage 2: Runtime (Final Image)
├─ Node 18 Alpine (minimal)
├─ dumb-init (signal handling)
├─ Non-root user (nextjs:1001)
├─ Read-only filesystem (security)
├─ Health checks
└─ Size: ~200-300MB
```

### Image Registry

```
Registry: ghcr.io (GitHub Container Registry)
Path: ghcr.io/claudygod-musicministries/claudygodwebapp

Available tags:
- main           (latest from main branch)
- latest         (latest successful build)
- v1.2.3         (semantic versions)
- sha-abc123     (commit SHA for rollbacks)
```

---

## 💾 GitHub Secrets Checklist

- [ ] `VPS_HOST` - Your VPS hostname/IP
- [ ] `VPS_USER` - SSH user for deployment
- [ ] `VPS_SSH_KEY` - Private SSH key (base64 or raw)
- [ ] `VPS_PORT` - SSH port (optional, default: 22)
- [ ] `VPS_DEPLOY_PATH` - Deployment directory on VPS
- [ ] `SLACK_WEBHOOK` - (optional) For notifications

---

## 🎯 What Gets Checked in PR

### Lint & Format
- ✅ ESLint rules compliance
- ✅ Prettier formatting
- ✅ No unused variables/imports
- ✅ Consistent code style

### Type Safety
- ✅ TypeScript strict mode
- ✅ No `any` types
- ✅ All types properly defined

### Build
- ✅ Next.js compilation succeeds
- ✅ No build warnings
- ✅ Bundle size acceptable

### Tests
- ✅ Unit tests pass
- ✅ Code coverage maintained
- ✅ No test regressions

### Docker
- ✅ Multi-stage build works
- ✅ Image builds successfully
- ✅ Image size reasonable

### Security
- ✅ npm audit passes
- ✅ No high/critical vulnerabilities
- ✅ Snyk scan (optional)

---

## 🔄 Day-to-Day Workflow

### Morning: Start Feature Work

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature develop
# Make changes...
git push origin feature/your-feature
```

### During Day: Commit & Push

```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/your-feature
```

### Ready to Ship: Create PR

```bash
# Go to GitHub → New Pull Request
# Base: develop
# Compare: feature/your-feature
# Wait for checks (2-3 min)
# If all ✅, request review
```

### After Approval: Merge & Deploy

```bash
# Merge to develop on GitHub
# Later: Create PR develop → main
# Merge to main
# Watch automatic deployment (3-5 min)
```

---

## 🆘 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| PR checks failing | Run `make lint`, `make type-check`, `make build` locally |
| Docker image too large | Check `.dockerignore`, remove dev dependencies |
| Deployment stuck | Check VPS logs: `docker compose logs web` |
| Image not pulling from GHCR | Verify `VPS_SSH_KEY` secret is set correctly |
| Health check failing | Check container logs, ensure port 3000 is open |
| Out of disk space (VPS) | Run `docker image prune -f --filter "until=48h"` |

---

## 📚 Documentation Files

Read these for more details:

1. **`GIT_WORKFLOW.md`** - Detailed git branching strategy & workflows
2. **`CI_CD_SETUP.md`** - Complete CI/CD configuration & troubleshooting
3. **`Makefile`** - All available commands (`make help`)

---

## ✨ Key Features

✅ **Continuous Integration** - Every PR gets tested automatically
✅ **Continuous Deployment** - Every merge to main deploys automatically
✅ **Multi-stage Docker** - Optimized production images (~200-300MB)
✅ **GHCR Registry** - Secure, private image storage
✅ **Health Checks** - Auto-validate deployment success
✅ **Slack Notifications** - Know when builds/deploys succeed/fail
✅ **Rollback Support** - Easy rollback to previous versions
✅ **Security Hardened** - Non-root user, minimal attack surface
✅ **Git Flow** - Professional branching strategy
✅ **Code Quality** - Lint, type check, tests, security scanning

---

## 🚀 Next Steps

1. **Configure GitHub Secrets** (see above)
2. **Test locally**: `make dev`
3. **Create a test feature branch**
4. **Make a small change and push**
5. **Create a PR and watch checks run**
6. **Merge to develop, then to main**
7. **Watch automatic deployment**
8. **Verify on production VPS**

---

## 📞 Need Help?

- 📖 Read `GIT_WORKFLOW.md` for git questions
- 🔧 Read `CI_CD_SETUP.md` for technical setup
- 📧 Email: peter4tech@gmail.com
- 🐙 GitHub Issues: Create an issue for bugs

---

**Setup Date**: 2026-05-25
**Maintained By**: Peter (peter4tech)
**Status**: ✅ Ready for Production

