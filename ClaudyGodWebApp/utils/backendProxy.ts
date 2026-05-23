import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.API_BASE_URL ?? 'http://localhost:8080';
const API_PREFIX = '/api/v1.0';

type ProxyOptions = {
  /** Override the backend path. Defaults to the path suffix after /api */
  backendPath?: string;
};

/** Forward a POST request body to the .NET backend and relay the response. */
export async function proxyPost(
  req: NextRequest,
  backendResource: string,
  opts: ProxyOptions = {},
): Promise<NextResponse> {
  try {
    const body = await req.json();
    const backendUrl = `${API_BASE}${API_PREFIX}${opts.backendPath ?? backendResource}`;

    const upstream = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // Forward auth token if present
        ...(req.headers.get('authorization')
          ? { Authorization: req.headers.get('authorization')! }
          : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected proxy error';
    return NextResponse.json(
      { success: false, message, data: null, errors: [message] },
      { status: 502 },
    );
  }
}

/** Forward a GET request (with query params) to the .NET backend and relay the response. */
export async function proxyGet(
  req: NextRequest,
  backendResource: string,
  opts: ProxyOptions = {},
): Promise<NextResponse> {
  try {
    const search = req.nextUrl.searchParams.toString();
    const path = `${API_BASE}${API_PREFIX}${opts.backendPath ?? backendResource}`;
    const backendUrl = search ? `${path}?${search}` : path;

    const upstream = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...(req.headers.get('authorization')
          ? { Authorization: req.headers.get('authorization')! }
          : {}),
      },
    });

    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected proxy error';
    return NextResponse.json(
      { success: false, message, data: null, errors: [message] },
      { status: 502 },
    );
  }
}
