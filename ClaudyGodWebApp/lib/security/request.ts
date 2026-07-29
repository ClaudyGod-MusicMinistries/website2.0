import { NextRequest, NextResponse } from 'next/server';

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function clientAddress(req: NextRequest): string {
  return (
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  );
}

export function enforceSameOrigin(req: NextRequest): NextResponse | null {
  const origin = req.headers.get('origin');
  if (!origin) return null;

  const normalizeOrigin = (value: string): string | null => {
    try {
      return new URL(value).origin.toLowerCase();
    } catch {
      return null;
    }
  };

  // nextUrl.origin can contain the container's internal host behind a reverse
  // proxy. The canonical site URL and the explicit allowlist are the trusted
  // production configuration; nextUrl remains useful for local development.
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    ...(process.env.CORS_ALLOWED_ORIGINS ?? '').split(','),
    req.nextUrl.origin,
  ];
  const allowed = new Set(
    candidates
      .filter((value): value is string => Boolean(value?.trim()))
      .map((value) => normalizeOrigin(value.trim()))
      .filter((value): value is string => value !== null)
  );
  const normalizedRequestOrigin = normalizeOrigin(origin);

  if (normalizedRequestOrigin && allowed.has(normalizedRequestOrigin)) return null;

  return NextResponse.json(
    {
      success: false,
      code: 'ORIGIN_NOT_ALLOWED',
      message: 'We could not verify this request. Refresh the page and try again.',
      errors: [],
      fieldErrors: {},
    },
    { status: 403 }
  );
}

export function enforceRateLimit(
  req: NextRequest,
  scope: string,
  options: { limit?: number; windowMs?: number } = {}
): NextResponse | null {
  if (process.env.RATE_LIMIT_ENABLED === 'false') return null;

  const limit = options.limit ?? 20;
  const windowMs = options.windowMs ?? 60_000;
  const now = Date.now();
  const key = `${scope}:${clientAddress(req)}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  current.count += 1;
  if (current.count <= limit) return null;

  const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
  return NextResponse.json(
    { success: false, message: 'Too many requests. Please try again shortly.' },
    { status: 429, headers: { 'Retry-After': String(retryAfter) } }
  );
}

export function guardPublicMutation(
  req: NextRequest,
  scope: string,
  options?: { limit?: number; windowMs?: number }
): NextResponse | null {
  return enforceSameOrigin(req) ?? enforceRateLimit(req, scope, options);
}
