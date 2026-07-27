/**
 * Single source of truth for the Content-Security-Policy. `middleware.ts`
 * imports and applies this object directly. There used to be a second,
 * hand-maintained copy of this policy in an nginx.conf — nginx was never
 * actually part of the deployed image (the Dockerfile runs `node server.js`
 * directly), so that file only ever drifted out of sync with no runtime
 * effect. It's been removed; this object is the only copy now.
 */

export const CSP_DIRECTIVES: Record<string, string[]> = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    ...(process.env.NODE_ENV === 'development' ? ["'unsafe-eval'"] : []),
    'https://cdn.jsdelivr.net',
    'https://www.youtube.com',
    'https://s.ytimg.com',
    'https://js.paystack.co',
    'https://static.cloudflareinsights.com',
  ],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'img-src': ["'self'", 'data:', 'blob:', 'https:'],
  'font-src': ["'self'", 'https://fonts.gstatic.com'],
  'connect-src': [
    "'self'",
    'https://api.paystack.co',
    'https://*.paystack.co',
    'https://www.youtube.com',
    'https://*.googlevideo.com',
    'https://cloudflareinsights.com',
  ],
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
