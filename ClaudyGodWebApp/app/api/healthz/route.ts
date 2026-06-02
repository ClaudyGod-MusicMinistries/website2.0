import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Try to reach the backend API
    const apiBaseUrl = process.env.API_BASE_URL || 'http://api:8080';
    const backendResponse = await fetch(`${apiBaseUrl}/healthz`, {
      method: 'GET',
      timeout: 5000,
    });

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
