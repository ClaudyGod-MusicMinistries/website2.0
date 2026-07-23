/**
 * One-time content seeding script — run manually, never as part of the app
 * build. Logs in as the bootstrapped admin (see Phase 0 in the plan) and
 * POSTs the recovered static content (data/events.ts, data/featured.ts,
 * data/store.ts, data/videos.ts) to the real backend via its new/existing
 * admin-authorized create endpoints.
 *
 * The backend requires BOTH an `x-api-key` header (ApiKeyMiddleware, every
 * non-[PublicEndpoint] route) and, for these create calls, a Bearer JWT from
 * an Admin/SuperAdmin account.
 *
 * Usage:
 *   SEED_API_BASE_URL=http://localhost:5278 \
 *   SEED_API_KEY=CHANGE-ME-api-key-1 \
 *   SEED_ADMIN_EMAIL=you@example.com \
 *   SEED_ADMIN_PASSWORD=your-password \
 *   npx tsx scripts/seed-content.ts
 *
 * Defaults match this repo's .env.local (local dev backend on :5278, the
 * backend's own placeholder API key) — only SEED_ADMIN_EMAIL/PASSWORD are
 * required, for the account you bootstrapped to SuperAdmin per the plan.
 */
import { placeholderEvents } from '../data/events';
import { featuredVideos } from '../data/featured';
import { products } from '../data/store';
import { videos } from '../data/videos';

const API_BASE_URL = process.env.SEED_API_BASE_URL ?? 'http://localhost:5278';
const API_KEY = process.env.SEED_API_KEY ?? 'CHANGE-ME-api-key-1';
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;
const API_PREFIX = '/api/v1.0';

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

async function seedEvents(token: string) {
  console.log(`\n— Events (${placeholderEvents.length} in data/events.ts) —`);
  for (const e of placeholderEvents) {
    const startDate = new Date(e.date);
    if (startDate <= new Date()) {
      console.log(
        `  SKIP  "${e.title}" — date ${e.date} is in the past (CreateEventCommand requires a future date). Update the date before seeding.`
      );
      continue;
    }
    const result = await post(token, '/events', {
      title: e.title,
      description: e.fullDescription,
      venue: e.location,
      startDate: startDate.toISOString(),
      totalCapacity: e.attendees ?? 200,
      isFree: true,
    });
    console.log(
      result.success ? `  OK    "${e.title}"` : `  FAIL  "${e.title}" — ${result.message}`
    );
  }
}

async function seedVideos(token: string) {
  // featured.ts and videos.ts overlap on a few YouTube IDs (e.g. xY4508hwPfw,
  // uro0EWsYdxc, d7qZ32829gg) — dedupe by ID rather than seed the same video
  // twice, preferring videos.ts's entry since it carries a category.
  const seen = new Map<string, { title: string; youtubeId: string; thumbnailUrl?: string }>();

  for (const v of featuredVideos) {
    const id = v.youtubeUrl.match(/(?:youtu\.be\/|v=)([^?&]+)/)?.[1];
    if (id) seen.set(id, { title: v.title, youtubeId: id, thumbnailUrl: v.thumbnailUrl });
  }
  for (const v of videos) {
    seen.set(v.youtubeId, { title: v.title, youtubeId: v.youtubeId });
  }

  console.log(`\n— Videos (${seen.size} unique, from data/featured.ts + data/videos.ts) —`);
  for (const v of Array.from(seen.values())) {
    const result = await post(token, '/media/link', {
      title: v.title,
      type: 'Video',
      externalUrl: `https://youtu.be/${v.youtubeId}`,
      thumbnailUrl: v.thumbnailUrl ?? `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`,
    });
    console.log(
      result.success ? `  OK    "${v.title}"` : `  FAIL  "${v.title}" — ${result.message}`
    );
  }
}

async function seedProducts(token: string) {
  console.log(`\n— Store products (${products.length} in data/store.ts) —`);
  for (const p of products) {
    const result = await post(token, '/store/products', {
      title: p.name,
      description: p.description,
      price: p.price,
      image: p.image,
      category: p.category,
      inStock: true,
      rating: p.rating,
    });
    console.log(result.success ? `  OK    "${p.name}"` : `  FAIL  "${p.name}" — ${result.message}`);
  }
}

// No album seed function: data/music.tsx only has flat streaming-platform
// link lists (one URL per platform), not per-album objects with a title +
// cover image + individual streaming links the way `Album.Create()` needs.
// Add real albums by hand once you have that data — POST /api/v1.0/albums
// with { title, imageUrl, spotifyUrl, appleUrl, youtubeUrl, deezerUrl,
// amazonUrl, sortOrder, releasedAt }.

async function main() {
  console.log(`Logging in as ${ADMIN_EMAIL}...`);
  const token = await login();
  console.log('Logged in with Admin/SuperAdmin role.');

  await seedEvents(token);
  await seedVideos(token);
  await seedProducts(token);

  console.log('\nDone. Albums were not seeded — see the comment above main() for why.');
}

main().catch((err) => {
  console.error('\nSeed script failed:', err instanceof Error ? err.message : err);
  process.exit(1);
});
