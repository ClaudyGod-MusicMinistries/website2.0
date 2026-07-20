# 📚 ClaudyGod Documentation Index

> Documentation for the ClaudyGod Music Ministries web application

## Getting started

```bash
git clone <repo-url>
cd ClaudyGodWebApp
npm install
cp .env.example .env.local   # edit with your local API URL
npm run dev                  # http://localhost:3000
```

See [README.md](../README.md) for the full setup, scripts, and deployment reference.

## Architecture

This is a **hybrid** data model, not a purely backend-driven one — see
`COMPONENT_MIGRATION_CHECKLIST.md` for the live status of which pages still
read from static `data/*.ts` files versus the backend:

```
Browser
  → React Components (Next.js App Router)
  → Custom hooks (useEvents, useAlbums, ...) — client-side reads
    — or —
  → Server Components fetching directly — preferred for new pages
  ↓
Next.js API routes (/api/*) — thin proxies, see lib/data/backendProxy.ts
  ↓
.NET Backend API (separate repo) → SQL Server
```

The one consolidated HTTP client lives at `lib/data/client.ts`; shared types
at `lib/data/types.ts`. Site identity (domain, socials, contact) is centralized
in `lib/config/site.ts`; the CSP in `lib/config/csp.ts`.

## Design system

`components/ui/` is the component library — buttons, cards, typography,
dialogs, etc. Every primitive is rendered at `/dev/design-system` (not
indexed, not linked publicly) so it's easy to see what exists before
hand-rolling markup in a page.

## Adding a new page

1. `app/(pages)/newpage/page.tsx` (or the relevant route group)
2. Use `PageHero` for the hero, `components/ui/*` for everything else
3. Fetch data via `lib/data/client.ts` — prefer a Server Component fetch over a client hook when the content doesn't need interactivity

## Testing

There is no automated test suite yet (`npm test` is a stub). See the rebuild
plan for the testing strategy (Vitest for units, Playwright for a handful of
critical e2e flows) — not implemented yet, don't trust any doc or script that
implies otherwise.

## Security

Report issues to security@claudygod.org — do not post publicly.
