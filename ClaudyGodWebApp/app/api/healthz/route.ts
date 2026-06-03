import { NextResponse } from 'next/server';

export async function GET() {
  // Web container health — always returns 200 if Next.js is alive.
  // Backend connectivity is reported separately but never fails this check.
  let backend: 'healthy' | 'degraded' | 'unreachable' = 'unknown' as 'unreachable';

  try {
    const apiBase = process.env.API_BASE_URL ?? 'http://api:8080';
    const ctrl    = new AbortController();
    const timer   = setTimeout(() => ctrl.abort(), 3000);
    const r       = await fetch(`${apiBase}/healthz`, { signal: ctrl.signal })
                         .finally(() => clearTimeout(timer));
    backend = r.ok ? 'healthy' : 'degraded';
  } catch {
    backend = 'unreachable';
  }

  return NextResponse.json({
    status:    'healthy',
    backend,
    timestamp: new Date().toISOString(),
  });
}
