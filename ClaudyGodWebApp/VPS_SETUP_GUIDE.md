# Complete VPS Setup & Deployment Verification Guide

## 🎯 What To Run On Your VPS - Complete Steps

### STEP 1: SSH Into Your VPS
```bash
ssh user@your-vps-ip
# Or if using specific port:
ssh -p 2222 user@your-vps-ip
```

### STEP 2: Navigate to Deployment Directory
```bash
cd /path/to/deployment
# Common paths:
# cd /opt/claudygod
# cd /home/ubuntu/claudygod
# cd ~/deployment

# Verify you're in the right place:
pwd
ls -la docker-compose.yml
```

### STEP 3: Check Current .env Status
```bash
# View current .env file
cat .env

# Check for syntax errors
bash ./scripts/validate-env.sh .env 2>/dev/null || echo "Script not available, proceed with manual fix"
```

### STEP 4: Backup Current .env (IMPORTANT!)
```bash
# Create timestamped backup
cp .env ".env.backup.$(date +%Y%m%d_%H%M%S)"

# List all backups
ls -la .env.backup.*
```

### STEP 5: Create Clean .env File
```bash
# Create a clean environment file with proper syntax
cat > .env << 'EOFENV'
# ═══════════════════════════════════════════════════════════════════════
# ClaudyGod Web Application - Production Environment Configuration
# ═══════════════════════════════════════════════════════════════════════

# ─── Node.js Environment ───────────────────────────────────────────────
NODE_ENV=production

# ─── Application URLs ──────────────────────────────────────────────────
# Frontend domain (used for redirects and canonical URLs)
NEXT_PUBLIC_SITE_URL=https://claudygod.com

# Backend API URL (used by frontend to call your backend service)
NEXT_PUBLIC_API_URL=https://api.claudygod.com

# ─── Paystack Payment Gateway ──────────────────────────────────────────
# Get these from your Paystack Dashboard: https://dashboard.paystack.com

# Public Key (safe to expose to frontend)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_actual_public_key_here

# Secret Key (NEVER expose - server-side only)
PAYSTACK_SECRET_KEY=sk_live_your_actual_secret_key_here
EOFENV
```

### STEP 6: Verify .env File Is Correct
```bash
# View the file
cat .env

# Check syntax (no command errors)
bash -n .env 2>&1 && echo "✓ Syntax is valid" || echo "✗ Syntax error found"

# Count lines
wc -l .env

# Show specific line 50 (to confirm no Music: error)
sed -n '50p' .env
echo "---"
```

Expected output should show empty or comments only, NOT "Music:" or any shell commands.

### STEP 7: Verify Docker Is Running
```bash
# Check Docker daemon
docker ps

# Check Docker Compose version
docker compose version

# Expected: Docker Compose v2.x or higher
```

### STEP 8: Stop Current Services
```bash
# Stop the web service gracefully
docker compose down web

# Or stop everything
docker compose down

# Verify services are stopped
docker compose ps
```

### STEP 9: Verify .env Is Readable
```bash
# Check file permissions
ls -la .env

# Check file content is readable
file .env

# Test that Docker can read it
docker compose config --quiet && echo "✓ Docker can read .env" || echo "✗ Error reading .env"
```

### STEP 10: Start Services With New .env
```bash
# Start web service only
docker compose up -d web

# Wait 5 seconds for startup
sleep 5

# Check if service is running
docker compose ps

# Expected status: "Up X seconds"
```

### STEP 11: Verify Service Health
```bash
# Check logs for errors
docker compose logs web --tail=50

# Look for:
# ✓ "Ready in X.XXs" or "started server on..."
# ✗ "command not found", "Music:", syntax errors

# Check health endpoint
curl http://localhost:3000/api/healthz

# Expected response: {"status":"ok"} or similar
```

### STEP 12: Full System Health Check
```bash
# All services running?
docker compose ps

# Network connectivity?
docker network ls | grep cgm_net || grep traefik

# Storage space?
df -h | head -3

# Memory available?
free -h | head -2

# Check application is responsive
curl -I http://localhost:3000/
```

---

## 📋 Complete Command Sequence (Copy & Paste)

```bash
#!/bin/bash
# Run this entire script on your VPS

echo "🚀 Starting ClaudyGod VPS Setup..."
echo ""

# Step 1: Navigate to deployment
cd /opt/claudygod  # CHANGE THIS PATH TO YOUR ACTUAL DEPLOYMENT PATH
echo "📍 Current directory: $(pwd)"
echo ""

# Step 2: Backup
echo "💾 Creating backup..."
cp .env ".env.backup.$(date +%Y%m%d_%H%M%S)"
echo "✓ Backup created"
echo ""

# Step 3: Create clean .env
echo "📝 Creating clean .env file..."
cat > .env << 'EOFENV'
# ─── Node.js Environment ───────────────────────────────────────────────
NODE_ENV=production

# ─── Application URLs ──────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://claudygod.com
NEXT_PUBLIC_API_URL=https://api.claudygod.com

# ─── Paystack Payment Gateway ──────────────────────────────────────────
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_key_here
PAYSTACK_SECRET_KEY=sk_live_your_key_here
EOFENV
echo "✓ .env file created"
echo ""

# Step 4: Verify syntax
echo "🔍 Verifying .env syntax..."
bash -n .env 2>&1 && echo "✓ Syntax valid" || echo "✗ Syntax error"
echo ""

# Step 5: Show file content
echo "📄 .env file content:"
cat .env
echo ""

# Step 6: Verify Docker
echo "🐳 Checking Docker..."
docker compose ps
echo ""

# Step 7: Stop services
echo "⏹️  Stopping services..."
docker compose down web 2>/dev/null
sleep 2
echo "✓ Services stopped"
echo ""

# Step 8: Start services
echo "🚀 Starting services..."
docker compose up -d web
sleep 5
echo "✓ Services starting"
echo ""

# Step 9: Check status
echo "📊 Service status:"
docker compose ps
echo ""

# Step 10: Check logs
echo "📋 Application logs (last 20 lines):"
docker compose logs web --tail=20
echo ""

# Step 11: Health check
echo "🏥 Health check:"
curl http://localhost:3000/api/healthz 2>/dev/null || echo "Not responding yet, wait 10 seconds..."
sleep 10
curl http://localhost:3000/api/healthz && echo "✓ Health check passed" || echo "⚠️ Not responding"
echo ""

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Replace YOUR actual Paystack keys in .env"
echo "2. Run: docker compose restart web"
echo "3. Test the application in browser"
```

Save as `setup-vps.sh`:
```bash
nano setup-vps.sh
# Paste the script above
# Press Ctrl+O, Enter, Ctrl+X

chmod +x setup-vps.sh
./setup-vps.sh
```

---

## ✅ Verification Checklist (Run These Commands)

```bash
# 1. Verify .env syntax - No errors should appear
echo "1️⃣ Checking .env syntax..."
bash -n .env && echo "✓ Valid" || echo "✗ Invalid"

# 2. Verify required variables exist
echo ""
echo "2️⃣ Checking required variables..."
grep -E "^(NODE_ENV|NEXT_PUBLIC_SITE_URL|NEXT_PUBLIC_API_URL)=" .env

# 3. Verify Docker containers
echo ""
echo "3️⃣ Checking Docker status..."
docker compose ps

# 4. Verify application is responding
echo ""
echo "4️⃣ Health check..."
curl http://localhost:3000/api/healthz

# 5. Verify logs show no errors
echo ""
echo "5️⃣ Checking logs for errors..."
docker compose logs web | grep -i "error\|failed\|command not found" || echo "✓ No errors found"

# 6. Verify network connectivity
echo ""
echo "6️⃣ Network status..."
docker network ls
docker compose ps web

# 7. Full system status
echo ""
echo "7️⃣ Full status summary..."
echo "Docker version: $(docker --version)"
echo "Docker Compose version: $(docker compose version --short)"
echo "Disk space: $(df -h / | tail -1 | awk '{print $4 " available"}')"
echo "Memory: $(free -h | grep Mem | awk '{print $7 " available"}')"
```

---

## 🔍 Troubleshooting If Still Having Issues

```bash
# If you see "command not found" errors:
echo "Checking line 50 of .env:"
sed -n '50p' .env
# Should be empty or start with # (comment)

# If Docker can't read .env:
docker compose config 2>&1 | head -20
# Should show configuration, not errors

# If application won't start:
docker compose logs web --tail=100 | grep -i error

# If port 3000 is not responding:
docker compose ps web
# Should show "Up" status

# Force restart everything:
docker compose down
docker system prune -f
docker compose up -d web
sleep 10
docker compose logs web
```

---

## 📅 Regular Maintenance Commands

Run these weekly to prevent issues:

```bash
# Weekly health check
echo "Weekly VPS Health Check - $(date)"
echo "1. Docker status:"
docker compose ps

echo "2. Application health:"
curl http://localhost:3000/api/healthz

echo "3. Disk usage:"
df -h /

echo "4. Recent errors:"
docker compose logs web --since=168h | grep -i error | tail -5

echo "5. Environment validation:"
cat .env | head -5
```

---

## 🛡️ After Fixing - Prevent Future Errors

### Before Each Deployment:
```bash
# 1. Validate locally
npm run validate:env .env.local

# 2. Check for syntax errors
bash -n .env

# 3. Push to GitHub (triggers auto-deployment)
git push origin main
```

### Monitor Deployment:
```bash
# Watch GitHub Actions:
# https://github.com/ClaudyGod-MusicMinistries/website2.0/actions

# Or monitor VPS:
docker compose logs -f web
```

### Recovery if Deployment Fails:
```bash
# Restore from backup
cp .env.backup.TIMESTAMP .env
docker compose restart web

# Check what went wrong
docker compose logs web | tail -50
```

---

## 📞 Quick Reference

| Command | Purpose |
|---------|---------|
| `pwd` | Show current directory |
| `cd /path` | Navigate to deployment |
| `cat .env` | View environment file |
| `docker compose ps` | Check service status |
| `docker compose logs web` | View application logs |
| `docker compose down web` | Stop web service |
| `docker compose up -d web` | Start web service |
| `curl http://localhost:3000/api/healthz` | Check health |
| `docker compose restart web` | Restart service |
| `bash -n .env` | Check syntax |

---

## ✨ Your VPS Is Now Production-Ready When:

✅ `docker compose ps` shows web service "Up"
✅ `curl http://localhost:3000/api/healthz` responds with success
✅ `docker compose logs web` shows no "command not found" errors
✅ `.env` file contains valid KEY=VALUE format
✅ All required variables are set with actual values
✅ Application responds at https://claudygod.com

---

**Questions?** Check the logs:
```bash
docker compose logs web --tail=100
```

All errors should be clearly visible there!
