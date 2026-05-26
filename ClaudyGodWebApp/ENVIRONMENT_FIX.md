# Environment File Fix - VPS Deployment Error

## 🚨 The Error

```
***/.env: line 50: Music: command not found
2026/05/26 13:51:41 Process exited with status 127
```

This error occurs when the `.env` file on your VPS has **invalid syntax**. The shell is trying to execute something in the file as a command instead of treating it as a variable assignment.

## ✅ Solution: Fix Your VPS `.env` File

### Option 1: Quick SSH Fix (Recommended)

```bash
# SSH into your VPS
ssh user@your-vps-host

# Navigate to deployment directory
cd /path/to/docker-compose  # e.g., /opt/claudygod or /home/user/claudygod

# Backup current .env
cp .env .env.backup

# Create a clean .env file with proper syntax
cat > .env << 'EOF'
# ─── Node.js Configuration ───────────────────────────────────────────
NODE_ENV=production

# ─── Application URLs ────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://claudygod.com
NEXT_PUBLIC_API_URL=https://api.claudygod.com

# ─── Paystack Configuration ──────────────────────────────────────────
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_key_here
PAYSTACK_SECRET_KEY=sk_live_your_key_here
EOF

# Verify the file is valid
bash /path/to/scripts/validate-env.sh .env

# Restart Docker services
docker compose down web
docker compose up -d web
```

### Option 2: Automated Fix via GitHub Actions

1. **Create a new GitHub Secret** for your `.env` content:
   - Go to: https://github.com/ClaudyGod-MusicMinistries/website2.0/settings/secrets/actions
   - Click "New repository secret"
   - Name: `VPS_ENV_FILE`
   - Value: (Your complete .env file content)

2. **Manual deployment trigger**:
   - Go to Actions tab
   - Select "Deploy to Production"
   - Click "Run workflow"
   - Watch it deploy with the new `.env`

## 🔍 What's Wrong with Your Current `.env`

The error suggests:
- ❌ Improperly formatted variables (missing `=` or spaces around it)
- ❌ Multiline values not properly quoted
- ❌ Invalid characters or special formatting
- ❌ Content from other files mixed in
- ❌ Line 50 specifically has something like: `Music: value` (should be `MUSIC=value`)

## ✨ Correct `.env` Format

### ✅ CORRECT
```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://claudygod.com
NEXT_PUBLIC_API_URL=https://api.claudygod.com
PAYSTACK_SECRET_KEY=sk_live_abc123
```

### ❌ INCORRECT (causes the error)
```bash
NODE_ENV = production          # ❌ Spaces around =
NEXT_PUBLIC_SITE_URL https://claudygod.com  # ❌ Missing =
Music: value                   # ❌ Not KEY=VALUE format (this is your line 50!)
PAYSTACK_SECRET_KEY            # ❌ No value
```

## 📝 Required Variables (Minimum)

For the application to work, you **must** have:

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://claudygod.com
NEXT_PUBLIC_API_URL=https://api.claudygod.com
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxx
PAYSTACK_SECRET_KEY=sk_live_xxxxx
```

## 🛡️ Validation Script

We've provided a validation script to check your `.env` file before deploying:

```bash
./scripts/validate-env.sh .env.local
```

This script checks:
- ✓ Proper KEY=VALUE syntax
- ✓ Required variables are present
- ✓ No empty required variables

## 🚀 After Fixing

Once you've fixed the `.env` file:

1. **Verify it's valid**:
   ```bash
   bash scripts/validate-env.sh /path/to/your/.env
   ```

2. **Restart services**:
   ```bash
   docker compose restart web
   ```

3. **Check health**:
   ```bash
   docker compose ps
   curl http://localhost:3000/api/healthz
   ```

4. **View logs**:
   ```bash
   docker compose logs -f web
   ```

## 📋 Complete `.env.example`

See `.env.example` in the repository for the full template with all available variables and descriptions.

## 🆘 Still Having Issues?

1. **Check VPS file permissions**:
   ```bash
   ls -la .env
   ```

2. **View the actual error line**:
   ```bash
   sed -n '50p' .env
   ```

3. **Copy from template**:
   ```bash
   cp .env.example .env
   # Then edit with your actual values
   nano .env
   ```

4. **Verify Docker can read it**:
   ```bash
   docker compose config | grep NEXT_PUBLIC
   ```

---

**Next time**: Use the validation script before deploying:
```bash
npm run validate:env .env.local
```
