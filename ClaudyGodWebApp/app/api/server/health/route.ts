import { NextResponse } from 'next/server';

interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  services: {
    backend: 'up' | 'down';
    database: 'up' | 'down';
    redis: 'up' | 'down';
    frontend: 'up' | 'down';
  };
  metrics: {
    responseTime: number;
    memoryUsage: number;
    cpuUsage: number;
  };
}

/**
 * GET /api/server/health
 * Comprehensive server health check
 */
export async function GET(): Promise<NextResponse<HealthCheck>> {
  const startTime = Date.now();

  try {
    // Check backend connectivity
    let backendStatus: 'up' | 'down' = 'down';
    try {
      const backendResponse = await fetch(
        `${process.env.API_BASE_URL ?? 'http://localhost:8080'}/healthz`,
        { signal: AbortSignal.timeout(5000) },
      );
      backendStatus = backendResponse.ok ? 'up' : 'down';
    } catch (err) {
      console.error('[health] Backend check failed:', err instanceof Error ? err.message : 'Unknown error');
    }

    const responseTime = Date.now() - startTime;

    // Determine overall status
    const allServicesUp = backendStatus === 'up';
    const status = allServicesUp ? 'healthy' : 'degraded';

    const health: HealthCheck = {
      status,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        backend: backendStatus,
        database: backendStatus === 'up' ? 'up' : 'down', // Database health determined by backend health check
        redis: backendStatus === 'up' ? 'up' : 'down', // Redis health determined by backend health check
        frontend: 'up', // Frontend is always up if this endpoint responds
      },
      metrics: {
        responseTime,
        memoryUsage: Math.round(process.memoryUsage().heapUsed / 1024 / 1024), // MB
        cpuUsage: 0, // Would require native module in production
      },
    };

    return NextResponse.json(health, {
      status: status === 'healthy' ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Health-Status': status,
      },
    });
  } catch (error) {
    console.error('[health] Error:', error instanceof Error ? error.message : 'Unknown error');

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        services: {
          backend: 'down',
          database: 'down',
          redis: 'down',
          frontend: 'up',
        },
        metrics: {
          responseTime: Date.now() - startTime,
          memoryUsage: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          cpuUsage: 0,
        },
      },
      { status: 503 },
    );
  }
}
