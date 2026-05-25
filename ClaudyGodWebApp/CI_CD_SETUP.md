# ClaudyGod Web App — Complete CI/CD Setup

## 🎯 Overview

This document summarizes the **production-ready, industry-standard CI/CD pipeline** that has been set up for the ClaudyGod Web Application.

### What's Included

✅ **GitHub Actions Workflows**
✅ **Multi-stage Docker Builds**
✅ **Automated Image Registry (GHCR)**
✅ **Production Deployment Pipeline**
✅ **Code Quality & Security Checks**
✅ **Git Flow Branching Strategy**
✅ **Rollback Procedures**

---

## 📦 New Files Created

### GitHub Actions Workflows

```
.github/workflows/
├── build-and-push.yml        # Build Docker image & push to GHCR
├── pr-checks.yml             # Quality checks on every PR
├── deploy-production.yml      # Auto-deploy to production VPS
├── CODEOWNERS                 # Code ownership & review requirements
└── pull_request_template.md   # PR submission template
```

### Docker & Infrastructure

```
Dockerfile                      # Production-optimized multi-stage build
.dockerignore                   # Optimize Docker layer caching
Makefile                        # Development & deployment commands
```

### Documentation

```
GIT_WORKFLOW.md                # Complete git workflow guide
CI_CD_SETUP.md                 # This file - setup instructions
```

---

## 🚀 Quick Start

### 1. Initial Setup (First Time)

```bash
# Ensure GitHub secrets are configured
# Required secrets in GitHub Settings → Secrets and variables:
- VPS_HOST
- VPS_USER
- VPS_SSH_KEY
- VPS_PORT (optional, default: 22)
- VPS_DEPLOY_PATH
- SLACK_WEBHOOK (optional, for notifications)

# Install dependencies locally
make install

# Start development
make dev
```

### 2. Development Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature develop

# Make changes and commit
git add .
git commit -m "feat: your feature description"

# Push to remote
git push origin feature/your-feature

# Create Pull Request on GitHub
# → All checks run automatically
# → Once approved, merge to develop
```

### 3. Merge to Main (Production)

```bash
# When ready to deploy
git checkout main
git pull origin main
git merge develop

# This automatically triggers:
# 1. pr-checks.yml    → Quality checks
# 2. build-and-push.yml → Build & push Docker image to GHCR
# 3. deploy-production.yml → Deploy to production VPS
```

---

## 🔄 CI/CD Pipeline Explained

### Pipeline Stages

```
Feature Development
    ↓
Create Pull Request
    ↓
[PR Checks]
├─ ESLint & Prettier
├─ TypeScript Type Check
├─ Build Test
├─ Unit Tests
├─ Docker Build Test
└─ Security Scan (npm audit + Snyk)
    ↓
[Approval Required]
    ↓
Merge to Develop
    ↓
Code Review & Testing
    ↓
Merge to Main
    ↓
[Build & Push]
├─ Build Docker image
├─ Push to GHCR
└─ Tag with: main, latest, sha-*
    ↓
[Deploy to Production]
├─ Authenticate with GHCR
├─ Pull image from registry
├─ Stop old container
├─ Start new container
├─ Run health checks
└─ Slack notification
    ↓
✅ Production Deployed
```

### Environment Variables

**Build Time:**
```
NEXT_PUBLIC_API_URL              API endpoint (e.g., https://api.claudygod.com)
NEXT_PUBLIC_SITE_URL             Website URL (e.g., https://claudygod.com)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY  Payment gateway key
NODE_ENV                          production
```

**Runtime (Docker):**
```
NODE_ENV                          production
HOSTNAME                          0.0.0.0
PORT                              3000
NEXT_TELEMETRY_DISABLED           1
```

---

## 📊 GitHub Secrets Configuration

### Required Secrets

Add these to: **GitHub → Settings → Secrets and variables → Actions**

```yaml
VPS_HOST:
  Type: Environment Secret
  Value: your-vps-hostname.com
  Description: Production VPS IP or hostname

VPS_USER:
  Type: Environment Secret
  Value: deploy-user
  Description: SSH user for deployments

VPS_SSH_KEY:
  Type: Environment Secret
  Value: |
    -----BEGIN OPENSSH PRIVATE KEY-----
    ... (your private key content)
    -----END OPENSSH PRIVATE KEY-----
  Description: SSH private key for VPS access

VPS_PORT:
  Type: Environment Secret (Optional)
  Value: 22
  Description: SSH port (defaults to 22)

VPS_DEPLOY_PATH:
  Type: Environment Secret
  Value: /opt/claudygod/deployment
  Description: Path where app is deployed on VPS

SLACK_WEBHOOK:
  Type: Environment Secret (Optional)
  Value: https://hooks.slack.com/services/T.../...
  Description: Slack webhook for deployment notifications

CODECOV_TOKEN:
  Type: Secret (Optional)
  Value: your-codecov-token
  Description: For code coverage reporting

SNYK_TOKEN:
  Type: Secret (Optional)
  Value: your-snyk-token
  Description: For security vulnerability scanning
```

### Create SSH Key for Deployment

```bash
# Generate SSH key (run on your local machine)
ssh-keygen -t ed25519 -C "github-actions" -f gh-deploy-key -N ""

# Copy private key content to GitHub secret
cat gh-deploy-key | base64 | pbcopy  # macOS
cat gh-deploy-key | base64 -w 0 | xclip -selection clipboard  # Linux

# Add public key to VPS
ssh-copy-id -i gh-deploy-key.pub deploy-user@vps-host

# Test connection
ssh -i gh-deploy-key deploy-user@vps-host
```

---

## 🐳 Docker Image Details

### Multi-Stage Build Benefits

1. **Builder Stage**
   - Full Node environment
   - All build tools (Python, Make, C++)
   - Dependencies installed
   - Application compiled

2. **Runtime Stage**
   - Minimal Alpine Linux
   - Only production dependencies
   - Non-root user (nextjs:1001)
   - Security hardened

### Image Size

- Builder: ~1.2GB (not pushed)
- Runtime: ~200-300MB (optimized)

### Image Tags

```
ghcr.io/claudygod-musicministries/claudygodwebapp:
├── main         # Latest from main branch
├── latest       # Latest successful build
├── v1.2.3       # Semantic version
└── sha-abc123   # Commit SHA (for rollbacks)
```

---

## 🔐 Security Features

### Docker Container Security

```dockerfile
# Non-root user execution
USER nextjs

# Minimal attack surface
RUN apk add --no-cache dumb-init wget

# Read-only filesystem (except /tmp, /run, /.next/cache)
read_only: true
tmpfs:
  - /tmp
  - /run
  - /app/.next/cache

# Drop all Linux capabilities
cap_drop:
  - ALL

# No new privileges
security_opt:
  - no-new-privileges:true
```

### GitHub Actions Security

- ✅ Environment secrets (not exposed in logs)
- ✅ SSH key authentication (not passwords)
- ✅ GHCR token scoped to GitHub Actions
- ✅ Code review required before deployment
- ✅ Health checks before considering deployment successful

### Code Quality Checks

- ✅ ESLint for code standards
- ✅ TypeScript for type safety
- ✅ npm audit for dependency vulnerabilities
- ✅ Snyk for advanced security scanning

---

## 📝 Usage Examples

### Deploy Latest Changes

```bash
# Simply push to main
git push origin develop
git push origin main

# Or merge PR to main via GitHub UI
# Automatic deployment happens within 2-3 minutes
```

### Manual Deployment (if auto fails)

```bash
# Via GitHub Actions
1. Go to: Actions → Deploy to Production
2. Click: "Run workflow"
3. Select: Branch (main) and tag (latest)
4. Click: "Run workflow"
5. Watch logs
```

### Rollback to Previous Version

```bash
# Check available versions
ssh deploy-user@vps-host
docker images | grep claudygodwebapp

# Rollback (VPS)
cd /opt/claudygod/deployment
export FRONTEND_IMAGE="ghcr.io/.../claudygodwebapp:previous-tag"
docker compose down web
docker compose up -d web

# Verify
docker compose logs web
```

### View Deployment Logs

```bash
# GitHub Actions Logs
1. Go to: github.com/claudygod-musicministries/ClaudyGodWebApp
2. Click: Actions
3. Select: Latest deployment run
4. View: Real-time deployment logs

# VPS Logs
ssh deploy-user@vps-host
docker compose logs web -f  # Follow logs
```

---

## ✅ Pre-Deployment Checklist

Before pushing to `main`:

- [ ] Code reviewed and approved
- [ ] All PR checks passing
- [ ] No console errors
- [ ] Images optimized and loading fast
- [ ] Mobile responsive verified
- [ ] All links working
- [ ] Forms submitting correctly
- [ ] Performance acceptable
- [ ] No breaking changes
- [ ] Documentation updated
- [ ] Commit messages clear and descriptive

---

## 🆘 Troubleshooting

### PR Checks Failing

```bash
# Run locally first
make lint
make type-check
make build

# Fix issues
git add .
git commit -m "fix: address lint errors"
git push origin feature/your-feature
```

### Build/Push Failing

```bash
# Check Docker locally
make docker-build

# Verify GHCR access
docker login ghcr.io
docker pull ghcr.io/claudygod-musicministries/claudygodwebapp:latest
```

### Deployment Stuck

```bash
# SSH to VPS
ssh deploy-user@vps-host

# Check containers
docker compose ps

# Check logs
docker compose logs web

# Restart if needed
docker compose restart web
```

### Image Too Large

```bash
# Optimize Dockerfile
- Reduce dependencies
- Use Alpine Linux images
- Remove dev dependencies from runtime

# Check layers
docker history ghcr.io/.../claudygodwebapp:latest
```

---

## 📚 Additional Resources

- **Git Workflow Guide**: [GIT_WORKFLOW.md](./GIT_WORKFLOW.md)
- **Docker Documentation**: https://docs.docker.com/
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Actions**: https://docs.github.com/en/actions
- **GHCR Documentation**: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry

---

## 🎓 Next Steps

1. **Configure GitHub Secrets** (see above)
2. **Test locally** with `make dev`
3. **Create feature branch** and make a test PR
4. **Verify all checks pass** in GitHub Actions
5. **Merge to main** and watch deployment
6. **Monitor logs** in Actions tab
7. **Verify deployment** on production VPS

---

## 📞 Support

For questions or issues:
- 📧 Email: peter4tech@gmail.com
- 🐙 GitHub Issues: Create an issue on the repository
- 📋 Slack: #engineering channel

---

**Document Version**: 1.0.0
**Last Updated**: 2026-05-25
**Maintained By**: Peter (peter4tech)

