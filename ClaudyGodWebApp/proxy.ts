import { NextResponse, type NextRequest } from 'next/server';
import { buildCsp, PERMISSIONS_POLICY } from '@/lib/config/csp';
import { guardPublicMutation } from '@/lib/security/request';

export function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith('/api/') &&
    !['GET', 'HEAD', 'OPTIONS'].includes(request.method)
  ) {
    const length = Number(request.headers.get('content-length') ?? 0);
    if (length > 1_000_000) {
      return NextResponse.json(
        { success: false, message: 'Request body is too large.' },
        { status: 413 }
      );
    }
    const denied = guardPublicMutation(request, 'api-mutation', { limit: 60, windowMs: 60_000 });
    if (denied) return denied;
  }

  const response = NextResponse.next();
  const requestId = request.headers.get('x-request-id') ?? crypto.randomUUID();

  // ─── Security Headers ──────────────────────────────────────────────────────
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  response.headers.set('X-Request-Id', requestId);

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
