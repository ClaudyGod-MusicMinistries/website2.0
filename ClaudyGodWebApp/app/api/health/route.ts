import { ok } from '@/utils/api';
import type { HealthResponse } from '@/types/api';

const START_TIME = Date.now();

export const dynamic = 'force-dynamic';

export function GET(): Response {
  const payload: HealthResponse = {
    status:    'ok',
    version:   process.env.npm_package_version ?? '2.0.0',
    uptime:    Math.floor((Date.now() - START_TIME) / 1000),
    timestamp: new Date().toISOString(),
  };

  return ok(payload);
}
