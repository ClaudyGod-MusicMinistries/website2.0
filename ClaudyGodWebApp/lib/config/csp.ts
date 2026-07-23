/**
 * Single source of truth for the Content-Security-Policy.
 *
 * Previously this policy was hand-maintained in two places — `middleware.ts`
 * and `nginx.conf` — and they had drifted apart (nginx's script-src was
 * missing cdn.jsdelivr.net/s.ytimg.com, its connect-src was missing the
 * broader `https:`/`wss:` allowance). `middleware.ts` now imports and
 * applies this object directly; `scripts/generate-nginx-csp.mjs` renders
 * the same object into the `add_header Content-Security-Policy` line nginx
 * needs, so nginx.conf is generated, not hand-edited, and the two can never
 * disagree again.
 */

export const CSP_DIRECTIVES: Record<string, string[]> = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'https://cdn.jsdelivr.net',
    'https://www.youtube.com',
    'https://s.ytimg.com',
    'https://js.paystack.co',
    'https://static.cloudflareinsights.com',
  ],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'img-src': ["'self'", 'data:', 'blob:', 'https:'],
  'font-src': ["'self'", 'https://fonts.gstatic.com'],
  'connect-src': ["'self'", 'https:', 'wss:'],
  'frame-src': [
    "'self'",
    'https://www.youtube.com',
    'https://www.paystack.co',
    'https://js.paystack.co',
  ],
  'media-src': ["'self'", 'https:'],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
};

export function buildCsp(): string {
  return Object.entries(CSP_DIRECTIVES)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');
}

export const PERMISSIONS_POLICY =
  'geolocation=(), microphone=(), camera=(), payment=(self "https://www.paystack.co")';
