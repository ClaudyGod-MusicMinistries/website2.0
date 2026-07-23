import { NextResponse, type NextRequest } from 'next/server';
import { buildCsp, PERMISSIONS_POLICY } from '@/lib/config/csp';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // ─── Security Headers ──────────────────────────────────────────────────────
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Strict-Transport-Security (HSTS)
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // Content Security Policy — single source of truth in lib/config/csp.ts,
  // also used to generate nginx.conf's CSP header (see scripts/generate-nginx-csp.mjs)
  // so the two layers can't drift apart again.
  response.headers.set('Content-Security-Policy', buildCsp());

  // Permissions Policy (formerly Feature Policy)
  response.headers.set('Permissions-Policy', PERMISSIONS_POLICY);

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)'],
};
