import { NextResponse } from 'next/server';
import { getBackendBaseUrl } from '@/lib/data/backendConfig';

export async function GET() {
  // Readiness includes the API dependency. Returning 200 while the backend is
  // unreachable hides broken forms from orchestration and monitoring.
  let backend: 'healthy' | 'degraded' | 'unreachable' = 'unknown' as 'unreachable';

  try {
    const apiBase = getBackendBaseUrl();
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 3000);
    const r = await fetch(`${apiBase}/healthz`, { signal: ctrl.signal }).finally(() =>
      clearTimeout(timer)
    );
    backend = r.ok ? 'healthy' : 'degraded';
  } catch {
    backend = 'unreachable';
  }

  const ready = backend === 'healthy';
  return NextResponse.json(
    {
      status: ready ? 'healthy' : 'unhealthy',
      backend,
      timestamp: new Date().toISOString(),
    },
    {
      status: ready ? 200 : 503,
      headers: { 'Cache-Control': 'no-store' },
    }
  );
}
