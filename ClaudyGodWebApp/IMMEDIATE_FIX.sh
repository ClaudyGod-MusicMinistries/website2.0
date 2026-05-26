#!/bin/bash
# IMMEDIATE FIX - Run this RIGHT NOW on your VPS to fix the .env error
# Usage: bash IMMEDIATE_FIX.sh

echo "🚨 IMMEDIATE .ENV FIX - Running now..."
echo ""

# Step 1: SSH command to fix .env on VPS
# Copy everything between the markers and run it on your VPS

cat << 'FIXSCRIPT'
#!/bin/bash
# Run this on your VPS immediately

echo "Backing up current .env..."
cp .env ".env.backup.broken.$(date +%s)" 2>/dev/null || true

echo "Creating clean .env file..."
cat > .env << 'ENV'
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://claudygod.com
NEXT_PUBLIC_API_URL=https://api.claudygod.com
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_key_here
PAYSTACK_SECRET_KEY=sk_live_your_key_here
ENV

echo "Verifying .env syntax..."
if bash -n .env 2>&1; then
  echo "✓ .env is valid"
else
  echo "✗ Syntax error"
  exit 1
fi

echo "Restarting Docker..."
docker compose down web 2>/dev/null || true
sleep 2
docker compose up -d web

echo "Waiting for startup..."
sleep 5

echo "Checking health..."
docker compose ps
docker compose logs web --tail=20

echo "✅ Fixed!"
FIXSCRIPT

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "📋 TO FIX YOUR VPS RIGHT NOW, RUN THESE COMMANDS:"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "1. SSH into your VPS:"
echo "   ssh user@your-vps-ip"
echo ""
echo "2. Navigate to deployment:"
echo "   cd /opt/claudygod  # or your deployment path"
echo ""
echo "3. Backup and create clean .env:"
echo ""
cat << 'CMD'
cp .env ".env.backup.broken.$(date +%s)"

cat > .env << 'ENVVAR'
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://claudygod.com
NEXT_PUBLIC_API_URL=https://api.claudygod.com
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_key_here
PAYSTACK_SECRET_KEY=sk_live_your_key_here
ENVVAR

echo "✓ .env created. Checking syntax..."
bash -n .env && echo "✓ Valid" || echo "✗ Invalid"

echo "Restarting Docker..."
docker compose down web
sleep 2
docker compose up -d web
sleep 5

echo "Health check:"
docker compose ps
docker compose logs web --tail=30
CMD

echo ""
echo "4. Update Paystack keys:"
echo "   nano .env  # Replace pk_live and sk_live with ACTUAL keys"
echo "   docker compose restart web"
echo ""
echo "5. Verify:"
echo "   curl http://localhost:3000/api/healthz"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "⚠️  IMPORTANT: The deployment workflow has been updated."
echo "   Next 'git push origin main' will auto-fix .env using GitHub Secrets."
echo ""
