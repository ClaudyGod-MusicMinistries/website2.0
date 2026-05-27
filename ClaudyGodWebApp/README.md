# 🎵 ClaudyGod Web App

[![CI](https://github.com/ClaudyGod-MusicMinistries/website2.0/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/ClaudyGod-MusicMinistries/website2.0/actions/workflows/ci.yml)
[![Build & Push](https://github.com/ClaudyGod-MusicMinistries/website2.0/actions/workflows/build-and-push.yml/badge.svg?branch=main)](https://github.com/ClaudyGod-MusicMinistries/website2.0/actions/workflows/build-and-push.yml)
[![Deploy](https://github.com/ClaudyGod-MusicMinistries/website2.0/actions/workflows/deploy-production.yml/badge.svg?branch=main)](https://github.com/ClaudyGod-MusicMinistries/website2.0/actions/workflows/deploy-production.yml)

A modern, production-ready Next.js application for ClaudyGod Music Ministries. Built with enterprise-grade security, CI/CD automation, and comprehensive backend integration.

## ⚡ Key Features

### Frontend
- **Next.js 14.2.5** – Modern React framework with App Router
- **TypeScript** – Full type safety across the application
- **React 18.3.1** – Concurrent rendering and hooks
- **Tailwind CSS** – Utility-first CSS framework
- **React Hook Form** – Performant form handling
- **Zod** – Runtime type validation
- **Zustand** – Lightweight state management
- **Framer Motion** – Smooth animations
- **Lucide React** – Beautiful icon library

### Security
- **Security Headers** – HSTS, CSP, X-Frame-Options via middleware
- **HTTP-Only Cookies** – Secure session management with refresh tokens
- **Access Token in Memory** – Never stored in localStorage/sessionStorage
- **API Proxy Routes** – Backend credentials never exposed to browser
- **Content Security Policy** – Strict CSP for YouTube, Paystack integration
- **Permissions Policy** – Restricted browser APIs (geolocation, camera, microphone)

### Backend Integration
- **RESTful API** – Fully integrated with backend services
- **Authentication** – Cookie-based auth with auto-refresh tokens
- **AI Integration** – Claude AI chat and prayer companion
- **Payment Processing** – Paystack integration with verification
- **Form Submissions** – Contact, booking, volunteer, and newsletter forms

### DevOps & CI/CD
- **GitHub Actions** – Automated CI/CD pipelines
- **Docker** – Multi-stage production builds
- **Nginx** – Reverse proxy and caching
- **Docker Compose** – Local and production orchestration
- **Native Git Hooks** – Pre-commit linting, pre-push type-checking
- **Conventional Commits** – Enforced commit message format
- **Slack Notifications** – Build and deployment status updates

## 🛠️ Tech Stack

| Category | Tools |
|----------|-------|
| **Framework** | Next.js 14.2.5, React 18.3.1 |
| **Language** | TypeScript 5.5.3 |
| **Styling** | Tailwind CSS 3.4.6, Class Variance Authority |
| **Forms** | React Hook Form 7.52.1, Zod 3.23.8 |
| **State** | Zustand 4.5.4 |
| **UI** | Lucide React, Framer Motion 11.3.8, React Slick |
| **HTTP** | Native Fetch API with custom middleware |
| **Build** | Next.js Standalone Output, Webpack 5 |
| **Testing** | Jest (configured, ready) |
| **Linting** | ESLint 8.57.0, Prettier 3.3.3 |
| **Package Manager** | npm (Node.js 18 LTS) |
| **CI/CD** | GitHub Actions |
| **Containerization** | Docker, Docker Compose |
| **Deployment** | SSH-based VPS deployment |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (LTS)
- npm 9+
- Docker & Docker Compose (for local production builds)

### Installation

```bash
# Clone the repository
git clone https://github.com/ClaudyGod-MusicMinistries/website2.0.git
cd ClaudyGodWebApp

# Install dependencies
npm ci --frozen-lockfile

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API endpoints
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Test production build locally
npm run start

# Or use Docker
docker build -t claudygod-web:latest .
docker run -p 3000:3000 claudygod-web:latest
```

## 📋 Environment Variables

Create a `.env.local` file:

```env
# Backend API
NEXT_PUBLIC_API_URL=https://api.claudygod.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://claudygod.com
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxx
```

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run type-check   # TypeScript type checking
npm test             # Run tests
npm run setup-hooks  # Configure git hooks
```

## 🔒 Security Features

- **Middleware Security Headers** – Automatically adds HSTS, CSP, and frame deny headers
- **Token Management** – Access tokens in memory, refresh tokens in HTTP-only cookies
- **API Proxy** – All backend calls go through `/api/*` proxy routes
- **Environment Isolation** – Secrets never exposed to client-side code
- **Rate Limiting** – Ready for production rate limiting via Traefik
- **CORS** – Properly configured for cross-origin requests

## 📦 Docker Deployment

### Local Production Build

```bash
docker-compose up --build
```

Services:
- **Web** (Next.js) – http://localhost
- **Nginx** – Reverse proxy with caching

### VPS Deployment

Automatic deployment on push to `main` branch via GitHub Actions.

```bash
# Manual deployment
git push origin main
# Monitor at: https://github.com/ClaudyGod-MusicMinistries/website2.0/actions
```

## 🔄 Git Hooks

Pre-configured native git hooks:

```bash
# Pre-commit: ESLint + Prettier on staged files
.githooks/pre-commit

# Pre-push: TypeScript type checking
.githooks/pre-push

# Commit-msg: Conventional commit validation
.githooks/commit-msg
```

Enable hooks:
```bash
npm run setup-hooks
```

## 📊 CI/CD Workflows

### CI Workflow (`.github/workflows/ci.yml`)
Runs on every push and PR:
- ESLint & Prettier checks
- TypeScript type checking
- Next.js build test
- Docker build verification
- Security scanning (npm audit, Snyk)

### Build & Push (`.github/workflows/build-and-push.yml`)
Runs on push to `main`:
- Docker image build
- Push to GitHub Container Registry (GHCR)
- Image tagging and caching
- Slack notifications

### Deploy Production (`.github/workflows/deploy-production.yml`)
Runs after successful build:
- SSH deployment to VPS
- Docker container orchestration
- Health checks
- Slack notifications

### Nightly Health Check (`.github/workflows/nightly-health-check.yml`)
Runs daily at 2 AM UTC:
- Full build verification
- Security audit
- Docker image build
- Health status reporting

## 🚨 Troubleshooting

### Build Failures
1. Check Node.js version: `node -v` (should be 18+)
2. Clear cache: `npm ci --frozen-lockfile`
3. Rebuild: `npm run build`

### TypeScript Errors
```bash
npm run type-check
```

### ESLint Issues
```bash
npm run lint:fix
```

### Docker Build Issues
```bash
docker build --no-cache -t claudygod-web:latest .
```

## 📝 Commit Convention

All commits must follow Conventional Commit format:

```
<type>(<scope>): <message>

feat(auth): add login page
fix(cart): resolve empty cart bug
docs: update README
```

Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`, `revert`

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit: `git commit -m "feat(feature): description"`
3. Push and create a pull request
4. Ensure CI/CD workflows pass
5. Request code review

## 📄 License

Proprietary © 2024-2026 ClaudyGod Music Ministries. All rights reserved.

## 📞 Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/ClaudyGod-MusicMinistries/website2.0/issues)
- Email: peter4tech@gmail.com

---

**Last Updated**: May 26, 2026  
**Status**: Production Ready ✅
