import { type NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.API_BASE_URL ?? 'http://localhost:8080';

export async function POST(req: NextRequest) {
  try {
    const upstream = await fetch(`${API_BASE}/api/v1.0/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Cookie: req.headers.get('cookie') ?? '',
      },
    });

    const data = await upstream.json().catch(() => ({ success: true, message: 'Logged out.' }));

    // Relay Set-Cookie (backend clears the cgm_rt cookie)
    const res = NextResponse.json(data, { status: upstream.status });
    const setCookie = upstream.headers.get('set-cookie');
    if (setCookie) res.headers.set('set-cookie', setCookie);

    return res;
  } catch (err) {
    console.error('[auth/logout]', err);
    return NextResponse.json({ success: true, message: 'Logged out.' });
  }
}
