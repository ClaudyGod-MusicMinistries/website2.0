import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiBaseUrl = process.env.API_BASE_URL || 'http://api:8080';
    
    // Use AbortController for timeout instead of fetch timeout option
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const backendResponse = await fetch(`${apiBaseUrl}/healthz`, {
      method: 'GET',
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (!backendResponse.ok) {
      return NextResponse.json(
        { status: 'unhealthy', reason: 'backend_unavailable' },
        { status: 503 }
      );
    }

    return NextResponse.json({ status: 'healthy', timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', reason: error instanceof Error ? error.message : 'unknown_error' },
      { status: 503 }
    );
  }
}
