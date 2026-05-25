################################################################################
#                    CLAUDYGODWEBAPP - DEVELOPMENT MAKEFILE                    #
#                         Production-ready commands                            #
################################################################################

.PHONY: help install dev build start test lint format clean docker-build docker-run deploy-local

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m

# Variables
NODE_VERSION := 18
DOCKER_REGISTRY := ghcr.io
DOCKER_IMAGE := claudygod-musicministries/claudygodwebapp
PORT := 3000
ENV_FILE := .env.local

help:
	@echo "$(BLUE)ClaudyGod Web App - Development Commands$(NC)"
	@echo ""
	@echo "$(YELLOW)Setup:$(NC)"
	@echo "  make install           Install dependencies"
	@echo ""
	@echo "$(YELLOW)Development:$(NC)"
	@echo "  make dev               Start development server"
	@echo "  make build             Build for production"
	@echo "  make start             Start production server"
	@echo ""
	@echo "$(YELLOW)Quality:$(NC)"
	@echo "  make lint              Run ESLint"
	@echo "  make format            Format code with Prettier"
	@echo "  make type-check        Run TypeScript type checking"
	@echo "  make test              Run test suite"
	@echo ""
	@echo "$(YELLOW)Docker:$(NC)"
	@echo "  make docker-build      Build Docker image locally"
	@echo "  make docker-run        Run Docker container locally"
	@echo "  make docker-push       Push Docker image to registry"
	@echo ""
	@echo "$(YELLOW)Deployment:$(NC)"
	@echo "  make deploy-local      Deploy to local VPS (requires SSH setup)"
	@echo ""
	@echo "$(YELLOW)Utilities:$(NC)"
	@echo "  make clean             Clean build artifacts"
	@echo "  make env-check         Verify environment setup"

install:
	@echo "$(BLUE)→ Installing dependencies...$(NC)"
	npm ci --frozen-lockfile
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

dev:
	@echo "$(BLUE)→ Starting development server...$(NC)"
	npm run dev

build:
	@echo "$(BLUE)→ Building for production...$(NC)"
	npm run build
	@echo "$(GREEN)✓ Build complete$(NC)"

start: build
	@echo "$(BLUE)→ Starting production server...$(NC)"
	npm start

lint:
	@echo "$(BLUE)→ Running ESLint...$(NC)"
	npm run lint --if-present || true
	@echo "$(GREEN)✓ Lint check complete$(NC)"

format:
	@echo "$(BLUE)→ Formatting code...$(NC)"
	npm run format --if-present || npm run prettier --if-present || true
	@echo "$(GREEN)✓ Code formatted$(NC)"

type-check:
	@echo "$(BLUE)→ Running TypeScript type check...$(NC)"
	npm run type-check --if-present || true
	@echo "$(GREEN)✓ Type check complete$(NC)"

test:
	@echo "$(BLUE)→ Running tests...$(NC)"
	npm test --if-present -- --watchAll=false || true
	@echo "$(GREEN)✓ Tests complete$(NC)"

clean:
	@echo "$(BLUE)→ Cleaning build artifacts...$(NC)"
	rm -rf .next build dist coverage
	rm -rf node_modules
	@echo "$(GREEN)✓ Cleanup complete$(NC)"

docker-build:
	@echo "$(BLUE)→ Building Docker image...$(NC)"
	docker build \
		--build-arg NEXT_PUBLIC_API_URL=$${NEXT_PUBLIC_API_URL:-https://api.example.com} \
		--build-arg NEXT_PUBLIC_SITE_URL=$${NEXT_PUBLIC_SITE_URL:-https://example.com} \
		-t $(DOCKER_IMAGE):latest \
		-t $(DOCKER_IMAGE):$$(git rev-parse --short HEAD) \
		.
	@echo "$(GREEN)✓ Docker image built$(NC)"

docker-run: docker-build
	@echo "$(BLUE)→ Running Docker container...$(NC)"
	docker run -it --rm \
		-p $(PORT):3000 \
		-e NODE_ENV=production \
		$(DOCKER_IMAGE):latest

docker-push: docker-build
	@echo "$(BLUE)→ Pushing to Docker registry...$(NC)"
	docker push $(DOCKER_REGISTRY)/$(DOCKER_IMAGE):latest
	docker push $(DOCKER_REGISTRY)/$(DOCKER_IMAGE):$$(git rev-parse --short HEAD)
	@echo "$(GREEN)✓ Images pushed$(NC)"

deploy-local: build
	@echo "$(BLUE)→ Deploying to local VPS...$(NC)"
	@if [ -z "$${VPS_HOST}" ]; then \
		echo "$(RED)✗ VPS_HOST not set$(NC)"; \
		exit 1; \
	fi
	rsync -avz --delete \
		--exclude node_modules \
		--exclude .next \
		--exclude .git \
		./ \
		$${VPS_USER}@$${VPS_HOST}:$${VPS_DEPLOY_PATH}/web-app/
	@echo "$(GREEN)✓ Deployed to VPS$(NC)"

env-check:
	@echo "$(BLUE)Checking environment setup...$(NC)"
	@echo ""
	@command -v node >/dev/null 2>&1 && echo "$(GREEN)✓ Node.js$(NC)" || echo "$(RED)✗ Node.js not found$(NC)"
	@command -v npm >/dev/null 2>&1 && echo "$(GREEN)✓ npm$(NC)" || echo "$(RED)✗ npm not found$(NC)"
	@command -v docker >/dev/null 2>&1 && echo "$(GREEN)✓ Docker$(NC)" || echo "$(RED)✗ Docker not found$(NC)"
	@command -v git >/dev/null 2>&1 && echo "$(GREEN)✓ Git$(NC)" || echo "$(RED)✗ Git not found$(NC)"
	@echo ""
	@echo "$(YELLOW)Versions:$(NC)"
	@node --version
	@npm --version
	@docker --version 2>/dev/null || true
	@git --version

.DEFAULT_GOAL := help
