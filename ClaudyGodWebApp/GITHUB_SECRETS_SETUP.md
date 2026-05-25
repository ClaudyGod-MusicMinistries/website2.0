# 🔐 GitHub Secrets Setup - Complete Guide

## Your VPS Information
- **IP Address**: 207.180.253.39
- **User**: root (or deploy user)
- **SSH Port**: 22
- **Deployment Path**: /opt/claudygod/deployment

---

## ⚡ Quick 5-Step Setup

### Step 1: Generate SSH Key (On Your Local Computer)

```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_deploy_key -N ""
```

This creates:
- `~/.ssh/github_deploy_key` (private key - keep secret!)
- `~/.ssh/github_deploy_key.pub` (public key - share with VPS)

### Step 2: Add Public Key to VPS

```bash
ssh-copy-id -i ~/.ssh/github_deploy_key.pub root@207.180.253.39
```

Enter your VPS root password when prompted.

### Step 3: Verify SSH Works

```bash
ssh -i ~/.ssh/github_deploy_key root@207.180.253.39
```

Should login without password. Type `exit` to logout.

### Step 4: Copy Private Key

**On macOS:**
```bash
cat ~/.ssh/github_deploy_key | pbcopy
```

**On Linux:**
```bash
cat ~/.ssh/github_deploy_key | xclip -selection clipboard
```

**On Windows PowerShell:**
```powershell
Get-Content $env:USERPROFILE\.ssh\github_deploy_key | Set-Clipboard
```

### Step 5: Add to GitHub

Go to: **GitHub Repository → Settings → Secrets and variables → Actions**

Click **"New repository secret"** and add these 6 secrets:

| # | Name | Value |
|---|------|-------|
| 1 | `VPS_HOST` | `207.180.253.39` |
| 2 | `VPS_USER` | `root` |
| 3 | `VPS_SSH_KEY` | (Paste your private key from Step 4) |
| 4 | `VPS_PORT` | `22` |
| 5 | `VPS_DEPLOY_PATH` | `/opt/claudygod/deployment` |
| 6 | `SLACK_WEBHOOK` | (Optional - Slack webhook URL) |

---

## ✅ Verification

After adding all secrets, you should see all 6 listed on GitHub:
- ✓ VPS_HOST
- ✓ VPS_USER
- ✓ VPS_SSH_KEY
- ✓ VPS_PORT
- ✓ VPS_DEPLOY_PATH
- ✓ SLACK_WEBHOOK (optional)

---

## 🆘 Troubleshooting

### Error: "ssh-copy-id: command not found"

Use this instead:
```bash
cat ~/.ssh/github_deploy_key.pub | ssh root@207.180.253.39 "cat >> ~/.ssh/authorized_keys"
```

### Error: "Permission denied (publickey)"

Fix permissions on VPS:
```bash
ssh root@207.180.253.39 "chmod 600 ~/.ssh/authorized_keys && chmod 700 ~/.ssh"
```

### Can't find deployment path

Find where your app is deployed:
```bash
ssh root@207.180.253.39 "ls -la /opt/"
```

Then update `VPS_DEPLOY_PATH` secret in GitHub.

### Test SSH key before adding to GitHub

```bash
ssh -i ~/.ssh/github_deploy_key -o "StrictHostKeyChecking=no" root@207.180.253.39 "echo 'Success!'"
```

Should output: `Success!`

---

## 🚀 Test Your Setup

Once all secrets are added:

1. Go to GitHub → **Actions**
2. Click **"Build & Push to GHCR"**
3. Click **"Run workflow"**
4. Watch it build and deploy automatically

---

## 📋 Complete Checklist

- [ ] SSH key pair generated locally
- [ ] Public key added to VPS
- [ ] SSH connection works without password
- [ ] Private key copied to clipboard
- [ ] All 6 secrets added to GitHub
- [ ] Secrets visible in GitHub Settings
- [ ] Ready for first deployment!

---

**Last Updated**: 2026-05-25
**For Issues**: Email peter4tech@gmail.com

