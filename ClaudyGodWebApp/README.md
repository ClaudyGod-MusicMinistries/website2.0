# ClaudyGod Music Ministries — Web Application

The Next.js frontend for ClaudyGod Music Ministries — a gospel music artist and worship ministry site: music/discography, tour dates, store, bookings, donations, and ministry content.

The backend (.NET API + SQL Server) lives in a separate repository and is not part of this codebase. This app talks to it exclusively through its own `/api/*` route handlers, which proxy to the backend server-side (see `lib/data/backendProxy.ts`) — the backend URL is never exposed to the browser.

> **Status**: mid-rebuild (see `rebuild/v2`) — the site is being restructured from the ground up (architecture, design system, information architecture). Don't trust status claims in older docs; this file reflects the current state of the code, not aspirations.

---

## Getting started

**Prerequisites**: Node.js 20+, npm.

```bash
git clone <repo-url>
cd ClaudyGodWebApp
npm install
cp .env.example .env.local   # fill in API_BASE_URL and any local secrets
npm run dev                  # http://localhost:3000
```

To run against the real backend locally, set `API_BASE_URL` in `.env.local` to wherever that service is running (default fallback is `http://localhost:8080`).

## Scripts

| Command                      | What it does                                                                                         |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| `npm run dev`                | Local dev server                                                                                     |
| `npm run build`              | Production build                                                                                     |
| `npm run lint` / `lint:fix`  | ESLint                                                                                               |
| `npm run type-check`         | `tsc --noEmit`                                                                                       |
| `npm run format`             | Prettier                                                                                             |
| `npm run generate:nginx-csp` | Regenerates `nginx.conf`'s CSP header from `lib/config/csp.ts` (the single source of truth for both) |
| `npm test`                   | Runs the Node/TypeScript test suite, including server-authoritative commerce pricing checks          |

## Project structure

```
app/
  (pages)/            marketing/content pages (route group)
  api/                thin proxy route handlers → .NET backend
  layout.tsx           root layout, fonts, JSON-LD
components/
  ui/                 the design-system component library — see /dev/design-system
  layout/             Navbar, Footer
  <feature>/           page-specific components (music/, store/, ministry/, ...)
data/                 static content (bio, ministry copy, legal pages) — see COMPONENT_MIGRATION_CHECKLIST.md for what's still static vs backend-driven
hooks/                client-side data hooks, all built on hooks/useApiResource.ts
lib/
  config/             site.ts (domain/socials/contact) and csp.ts — single sources of truth
  data/               client.ts (the one HTTP client), backendProxy.ts (server-side proxy helpers), types.ts
  fonts.ts             next/font setup (Montserrat + Raleway + Open Sans)
middleware.ts         security headers + CSP
nginx.conf            production reverse-proxy config (generated CSP block, see script above)
```

## Design system

The typography system uses Montserrat for substantial headings, Raleway for lighter statement copy, and Open Sans for body/UI, plus the token set in `tailwind.config.ts` (color scales, spacing, motion, z-index). Every component in `components/ui/` is rendered at `/dev/design-system` (not indexed, not linked publicly) so it's visible and gets reused instead of re-invented per page. A `no-restricted-syntax` ESLint rule (currently `warn`) flags raw hex colors and arbitrary shadow values outside `components/ui/` and `data/` — the exact drift that made the pre-rebuild version inconsistent.

## Data fetching

`lib/data/client.ts` exports `get`/`post`/`put`/`patch`/`del`, all typed and going through `/api/*` (never the backend directly from the browser). Client hooks in `hooks/` wrap `get()` via the shared `useApiResource` helper. Prefer fetching directly in a Server Component over a client hook when the content doesn't need to be interactive — it means less client JS and better SEO.

## Security

- CSP, HSTS, and other security headers: `middleware.ts` (app layer) and `nginx.conf` (edge layer), both generated from `lib/config/csp.ts`.
- Report security issues to security@claudygod.org — do not post publicly.
- Production secrets must be supplied by the deployment secret store or an ignored `.env` file. Never commit `.env.production` or live Paystack/API keys.
- Store checkout prices products and shipping on the server, initializes Paystack server-side, and only creates an order after transaction verification.

## Deployment

Docker multi-stage build (`Dockerfile`) behind nginx (`nginx.conf`), deployed via the GitHub Actions workflow at the repo root (`.github/workflows/build-push.yml`): lint + type-check + build gate, then Docker build/push to GHCR, then SSH deploy on merge to `main`.

## License

Proprietary © 2026 ClaudyGod Music Ministries. All rights reserved.
