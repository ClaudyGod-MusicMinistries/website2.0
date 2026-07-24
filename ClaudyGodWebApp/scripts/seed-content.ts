/**
 * One-time content seeding script — run manually, never as part of the app
 * build. Logs in as the bootstrapped admin (see Phase 0 in the plan) and
 * POSTs the curated content from data/fallback.ts to the real backend via
 * its admin-authorized create endpoints, so the live site's real fetches
 * return this content directly instead of only seeing it as a fetch-failure
 * fallback.
 *
 * The backend requires BOTH an `x-api-key` header (ApiKeyMiddleware, every
 * non-[PublicEndpoint] route) and, for these create calls, a Bearer JWT from
 * an Admin/SuperAdmin account.
 *
 * Two ways to point this at a target:
 *
 *   1. Direct to the .NET backend (needs the backend's own public origin and
 *      a real x-api-key):
 *        SEED_API_BASE_URL=http://localhost:5278 \
 *        SEED_API_KEY=... \
 *        SEED_ADMIN_EMAIL=you@example.com SEED_ADMIN_PASSWORD=... \
 *        npx tsx scripts/seed-content.ts
 *
 *   2. Through the Next.js frontend's own /api/* proxy routes (useful when
 *      the backend's public origin isn't directly reachable — e.g. it sits
 *      behind an edge/CDN with its own TLS quirks — but the frontend's own
 *      domain already proxies to it server-side without issue). The proxy
 *      adds x-api-key itself, so SEED_API_KEY is unnecessary here, and the
 *      frontend's routes have no /v1.0 segment (that's added internally by
 *      lib/data/backendProxy.ts before it reaches the real backend):
 *        SEED_API_BASE_URL=https://claudygod.org \
 *        SEED_API_PREFIX=/api \
 *        SEED_ADMIN_EMAIL=you@example.com SEED_ADMIN_PASSWORD=... \
 *        npx tsx scripts/seed-content.ts
 *
 * Defaults match this repo's .env.local (local dev backend on :5278, the
 * backend's own placeholder API key, direct-to-backend prefix).
 *
 * FAQs require CGM-Backend's CreateFAQCommand/FAQController POST endpoint
 * to be built and deployed first (added alongside this script — FAQ.Create()
 * existed on the domain entity but nothing called it until now). If that
 * backend hasn't been redeployed yet, seedFAQs() below will fail with a
 * clear "FAIL" line per FAQ rather than silently doing nothing.
 */
import {
  fallbackAlbums,
  fallbackVideos,
  fallbackStoreProducts,
  fallbackFAQs,
} from '../data/fallback';

const API_BASE_URL = process.env.SEED_API_BASE_URL ?? 'http://localhost:5278';
const API_KEY = process.env.SEED_API_KEY ?? 'CHANGE-ME-api-key-1';
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;
const API_PREFIX = process.env.SEED_API_PREFIX ?? '/api/v1.0';

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD are required. See the header comment.');
  process.exit(1);
}

type ApiEnvelope<T> = {
  success: boolean;
  message?: string;
  data: T | null;
  errors: string[];
  fieldErrors: Record<string, string[]>;
};

async function login(): Promise<string> {
  const res = await fetch(`${API_BASE_URL}${API_PREFIX}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  const body = (await res.json()) as ApiEnvelope<{ accessToken: string; role: string }>;
  if (!res.ok || !body.success || !body.data) {
    throw new Error(`Login failed: ${body.message ?? res.statusText}`);
  }
  if (body.data.role !== 'Admin' && body.data.role !== 'SuperAdmin') {
    throw new Error(
      `Logged in, but role is '${body.data.role}' — not Admin/SuperAdmin. ` +
        'Run the Phase 0 SQL bootstrap step first.'
    );
  }
  return body.data.accessToken;
}

async function post(token: string, path: string, body: unknown): Promise<ApiEnvelope<unknown>> {
  const res = await fetch(`${API_BASE_URL}${API_PREFIX}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return (await res.json()) as ApiEnvelope<unknown>;
}

async function seedAlbums(token: string) {
  console.log(`\n— Albums (${fallbackAlbums.length} in data/fallback.ts) —`);
  for (const a of fallbackAlbums) {
    const result = await post(token, '/albums', {
      title: a.title,
      imageUrl: a.imageUrl,
      spotifyUrl: a.spotifyUrl,
      appleUrl: a.appleUrl,
      youtubeUrl: a.youtubeUrl,
      deezerUrl: a.deezerUrl,
      amazonUrl: a.amazonUrl,
      sortOrder: a.sortOrder,
    });
    console.log(
      result.success ? `  OK    "${a.title}"` : `  FAIL  "${a.title}" — ${result.message}`
    );
  }
}

async function seedVideos(token: string) {
  console.log(`\n— Videos (${fallbackVideos.length} in data/fallback.ts) —`);
  for (const v of fallbackVideos) {
    const result = await post(token, '/media/link', {
      title: v.title,
      type: 'Video',
      externalUrl: v.publicUrl,
      thumbnailUrl: v.publicUrl.replace('youtu.be/', 'img.youtube.com/vi/') + '/hqdefault.jpg',
    });
    console.log(
      result.success ? `  OK    "${v.title}"` : `  FAIL  "${v.title}" — ${result.message}`
    );
  }
}

async function seedProducts(token: string) {
  console.log(`\n— Store products (${fallbackStoreProducts.length} in data/fallback.ts) —`);
  for (const p of fallbackStoreProducts) {
    const result = await post(token, '/store/products', {
      title: p.title,
      description: p.description,
      price: p.price,
      image: p.image,
      category: p.category,
      inStock: p.inStock,
      rating: p.rating,
    });
    console.log(
      result.success ? `  OK    "${p.title}"` : `  FAIL  "${p.title}" — ${result.message}`
    );
  }
}

async function seedFAQs(token: string) {
  console.log(`\n— FAQs (${fallbackFAQs.length} in data/fallback.ts) —`);
  for (const f of fallbackFAQs) {
    const result = await post(token, '/faqs', {
      question: f.question,
      answer: f.answer,
      category: f.category,
      order: f.order,
    });
    console.log(
      result.success ? `  OK    "${f.question}"` : `  FAIL  "${f.question}" — ${result.message}`
    );
  }
}

async function main() {
  console.log(`Logging in as ${ADMIN_EMAIL}...`);
  const token = await login();
  console.log('Logged in with Admin/SuperAdmin role.');

  await seedAlbums(token);
  await seedVideos(token);
  await seedProducts(token);
  await seedFAQs(token);

  console.log(
    '\nDone. Events were not seeded — time-sensitive content stays out of the static ' +
      'fallback/seed set by design (see data/fallback.ts) so a stale date is never shown.'
  );
}

main().catch((err) => {
  console.error('\nSeed script failed:', err instanceof Error ? err.message : err);
  process.exit(1);
});
