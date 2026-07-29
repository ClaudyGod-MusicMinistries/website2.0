import { type NextRequest, NextResponse } from 'next/server';
import { getBackendServiceHeaders, getBackendUrl } from '@/lib/data/backendConfig';

export async function POST(req: NextRequest) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const upstream = await fetch(getBackendUrl('/auth/logout'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        ...getBackendServiceHeaders(),
        Cookie: req.headers.get('cookie') ?? '',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

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
