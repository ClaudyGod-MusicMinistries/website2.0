#!/bin/bash
# VPS Quick Fix Script - Run this to fix the .env deployment error
# Usage: bash VPS_QUICK_FIX.sh

set -e

echo "╔════════════════════════════════════════════════════════════════════════╗"
echo "║           ClaudyGod VPS Quick Fix - Environment Setup                 ║"
echo "╚════════════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
  echo -e "${RED}❌ Error: docker-compose.yml not found in current directory${NC}"
  echo "Please navigate to your deployment directory first:"
  echo "  cd /opt/claudygod  # or your actual deployment path"
  exit 1
fi

echo -e "${BLUE}📍 Working directory: $(pwd)${NC}"
echo ""

# Step 1: Backup
echo -e "${YELLOW}Step 1: Creating backup...${NC}"
BACKUP_FILE=".env.backup.$(date +%Y%m%d_%H%M%S)"
if [ -f ".env" ]; then
  cp .env "$BACKUP_FILE"
  echo -e "${GREEN}✓ Backup created: $BACKUP_FILE${NC}"
else
  echo -e "${YELLOW}⚠️  No .env file found, creating new one${NC}"
fi
echo ""

# Step 2: Create clean .env
echo -e "${YELLOW}Step 2: Creating clean .env file...${NC}"
cat > .env << 'EOF'
# ═══════════════════════════════════════════════════════════════════════════════
# ClaudyGod Web Application - Production Environment
# ═══════════════════════════════════════════════════════════════════════════════

# ─── Node.js Configuration ────────────────────────────────────────────────────
NODE_ENV=production

# ─── Application URLs ─────────────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://claudygod.com
NEXT_PUBLIC_API_URL=https://api.claudygod.com

# ─── Paystack Payment Gateway ─────────────────────────────────────────────────
# IMPORTANT: Replace with your ACTUAL Paystack keys!
# Get from: https://dashboard.paystack.com
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_actual_public_key_here
PAYSTACK_SECRET_KEY=sk_live_your_actual_secret_key_here
EOF
echo -e "${GREEN}✓ .env file created${NC}"
echo ""

# Step 3: Verify syntax
echo -e "${YELLOW}Step 3: Verifying .env syntax...${NC}"
if bash -n .env 2>&1; then
  echo -e "${GREEN}✓ Syntax is valid${NC}"
else
  echo -e "${RED}✗ Syntax error detected${NC}"
  exit 1
fi
echo ""

# Step 4: Show .env content
echo -e "${YELLOW}Step 4: Environment file content:${NC}"
cat .env
echo ""

# Step 5: Verify Docker is running
echo -e "${YELLOW}Step 5: Checking Docker...${NC}"
if ! command -v docker &> /dev/null; then
  echo -e "${RED}✗ Docker is not installed${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Docker found: $(docker --version)${NC}"

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
  echo -e "${RED}✗ Docker Compose not found${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Docker Compose available${NC}"
echo ""

# Step 6: Stop services
echo -e "${YELLOW}Step 6: Stopping current services...${NC}"
docker compose down web 2>/dev/null || true
sleep 2
echo -e "${GREEN}✓ Services stopped${NC}"
echo ""

# Step 7: Verify Docker can read .env
echo -e "${YELLOW}Step 7: Verifying Docker configuration...${NC}"
if docker compose config > /dev/null 2>&1; then
  echo -e "${GREEN}✓ Docker can read .env${NC}"
else
  echo -e "${RED}✗ Docker configuration error${NC}"
  docker compose config 2>&1 | head -10
  exit 1
fi
echo ""

# Step 8: Start services
echo -e "${YELLOW}Step 8: Starting services...${NC}"
docker compose up -d web
echo -e "${GREEN}✓ Web service started${NC}"
sleep 5
echo ""

# Step 9: Check status
echo -e "${YELLOW}Step 9: Checking service status...${NC}"
docker compose ps web
echo ""

# Step 10: Health check
echo -e "${YELLOW}Step 10: Running health check...${NC}"
sleep 3
if curl -s http://localhost:3000/api/healthz > /dev/null 2>&1; then
  echo -e "${GREEN}✓ Application is responding${NC}"
else
  echo -e "${YELLOW}⚠️  Application not responding yet, wait 10 seconds...${NC}"
  sleep 10
  if curl -s http://localhost:3000/api/healthz > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Application is now responding${NC}"
  else
    echo -e "${YELLOW}⚠️  Still initializing, check logs:${NC}"
    echo "  docker compose logs web"
  fi
fi
echo ""

# Step 11: Check logs
echo -e "${YELLOW}Step 11: Checking application logs (last 20 lines)...${NC}"
echo "─────────────────────────────────────────────────────────────────────────"
docker compose logs web --tail=20
echo "─────────────────────────────────────────────────────────────────────────"
echo ""

# Final summary
echo -e "${BLUE}╔════════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                        ✅ Setup Complete!                             ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo "1. Update Paystack keys in .env with your ACTUAL keys"
echo "2. Run: docker compose restart web"
echo "3. Test the application at https://claudygod.com"
echo ""
echo -e "${YELLOW}🔍 Verification Commands:${NC}"
echo "  docker compose ps              # Check service status"
echo "  docker compose logs web        # View application logs"
echo "  curl http://localhost:3000     # Test application"
echo ""
echo -e "${YELLOW}📞 Troubleshooting:${NC}"
echo "  docker compose logs web | grep -i error   # Find errors"
echo "  cat .env                                    # View environment"
echo "  bash -n .env                                # Check syntax"
echo ""
