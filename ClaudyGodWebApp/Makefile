################################################################################
#                    CLAUDYGODWEBAPP - DEVELOPMENT MAKEFILE                    #
################################################################################
#
# Release checks are defined once in package.json and enforced by
# .github/workflows/quality.yml on main, develop, and pull requests.
# Production deployment remains outside this developer Makefile; use the
# infrastructure repository's reviewed deployment workflow.

.PHONY: help install dev build start check test lint format type-check clean env-check contract-check

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m

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
	@echo "  make check             Run the complete release quality gate"
	@echo "  make contract-check    Verify a running backend's public contracts"
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
	npm run lint
	@echo "$(GREEN)✓ Lint check complete$(NC)"

format:
	@echo "$(BLUE)→ Formatting code...$(NC)"
	npm run format --if-present || npm run prettier --if-present || true
	@echo "$(GREEN)✓ Code formatted$(NC)"

type-check:
	@echo "$(BLUE)→ Running TypeScript type check...$(NC)"
	npm run type-check
	@echo "$(GREEN)✓ Type check complete$(NC)"

test:
	@echo "$(BLUE)→ Running tests...$(NC)"
	npm test
	@echo "$(GREEN)✓ Tests complete$(NC)"

check:
	npm run check

contract-check:
	npm run contract:backend

clean:
	@echo "$(BLUE)→ Cleaning build artifacts...$(NC)"
	rm -rf .next build dist coverage
	rm -rf node_modules
	@echo "$(GREEN)✓ Cleanup complete$(NC)"

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
