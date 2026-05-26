# CI/CD Setup & Configuration Guide

## 📋 Overview

Your GitHub Actions workflows are now fully configured for production. Follow these steps to complete the setup and enable full monitoring capabilities.

## 🔐 Required GitHub Secrets

### 1. Slack Webhook (Optional but Recommended)

**Purpose**: Real-time notifications for CI/CD pipeline status

**Steps**:
1. Go to your Slack workspace
2. Create an Incoming Webhook: https://api.slack.com/messaging/webhooks
3. Copy the webhook URL
4. Add to GitHub Secrets:
   - Go: https://github.com/ClaudyGod-MusicMinistries/website2.0/settings/secrets/actions
   - Click "New repository secret"
   - Name: `SLACK_WEBHOOK`
   - Value: (paste your webhook URL)

### 2. VPS Deployment Secrets (If Deploying)

Required for automated VPS deployment:
- `VPS_HOST` – Your VPS IP or domain
- `VPS_USER` – SSH username
- `VPS_SSH_KEY` – Private SSH key
- `VPS_PORT` – SSH port (default: 22)
- `VPS_DEPLOY_PATH` – Path to docker-compose.yml

## 🚀 Workflow Triggers

### CI Workflow
- Runs on: push to main/develop, all PRs, manual trigger
- Duration: 5-10 minutes
- Jobs: Lint, Type-check, Build, Docker, Security

### Build & Push Workflow
- Runs on: push to main, version tags, manual trigger
- Duration: 10-15 minutes
- Outputs: Docker image pushed to GHCR

### Deploy Workflow
- Runs on: successful build-and-push completion
- Duration: 5 minutes
- Actions: SSH deploy, health checks, service restart

### Nightly Health Check
- Schedule: 2 AM UTC daily
- Duration: 5 minutes
- Verifies: Build, security, dependencies

## 📊 Monitor Your Workflows

**GitHub Actions Dashboard**:
https://github.com/ClaudyGod-MusicMinistries/website2.0/actions

**View**:
- All workflow runs with status
- Individual job logs
- Build artifacts
- Deployment history

## ✅ Next Steps

1. Add `SLACK_WEBHOOK` secret (takes 5 min)
2. Configure `VPS_*` secrets if deploying
3. Make a test commit to trigger CI
4. Watch workflows execute in real-time
5. Check Slack for notifications

## 📚 Resources

- GitHub Actions: https://docs.github.com/actions
- Workflow Files: `.github/workflows/`
- Deployment Guide: See README.md

---

**Status**: Production-Ready ✅  
**Last Updated**: May 26, 2026
