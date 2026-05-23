import { type NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.API_BASE_URL ?? 'http://localhost:8080';

export async function POST(req: NextRequest) {
  try {
    // Forward the HTTP-only refresh cookie to the backend
    const upstream = await fetch(`${API_BASE}/api/v1.0/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // Forward the cookie header so the backend can read cgm_rt
        Cookie: req.headers.get('cookie') ?? '',
      },
    });

    const contentType = upstream.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { success: false, message: 'Session expired. Please log in again.' },
        { status: 401 },
      );
    }

    const data = await upstream.json();

    // Relay the response — including Set-Cookie so the browser updates the refresh token cookie
    const res = NextResponse.json(data, { status: upstream.status });
    const setCookie = upstream.headers.get('set-cookie');
    if (setCookie) res.headers.set('set-cookie', setCookie);

    return res;
  } catch (err) {
    console.error('[auth/refresh]', err);
    return NextResponse.json(
      { success: false, message: 'Session expired. Please log in again.' },
      { status: 401 },
    );
  }
}
