import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.API_BASE_URL ?? 'http://localhost:8080';

// Warn at startup if using the insecure default — visible in container logs
if (!process.env.API_BASE_URL) {
  console.warn('[backendProxy] API_BASE_URL is not set — falling back to http://localhost:8080. Set API_BASE_URL=http://api:8080 in the container environment.');
}
const API_PREFIX = '/api/v1.0';

type ProxyOptions = {
  backendPath?: string;
};

function authHeader(req: NextRequest): Record<string, string> {
  const token = req.headers.get('authorization');
  return token ? { Authorization: token } : {};
}

async function readUpstream(upstream: Response, backendUrl: string): Promise<NextResponse> {
  const contentType = upstream.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    const text = await upstream.text();
    console.error(`[proxy] Non-JSON response from ${backendUrl}: ${text.slice(0, 200)}`);
    return NextResponse.json(
      { success: false, message: 'Backend returned an unexpected response', data: null, errors: [] },
      { status: 502 },
    );
  }
  const data = await upstream.json();
  const res = NextResponse.json(data, { status: upstream.status });

  // Relay Set-Cookie so HTTP-only auth cookies reach the browser
  const setCookie = upstream.headers.get('set-cookie');
  if (setCookie) res.headers.set('set-cookie', setCookie);

  return res;
}

async function proxyWithBody(
  method: 'POST' | 'PUT' | 'PATCH',
  req: NextRequest,
  backendResource: string,
  opts: ProxyOptions = {},
): Promise<NextResponse> {
  try {
    const body = await req.json();
    const backendUrl = `${API_BASE}${API_PREFIX}${opts.backendPath ?? backendResource}`;
    const cookieHeader = req.headers.get('cookie');
    const upstream = await fetch(backendUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...authHeader(req),
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      body: JSON.stringify(body),
    });
    return readUpstream(upstream, backendUrl);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected proxy error';
    const backendUrl = `${API_BASE}${API_PREFIX}${backendResource}`;
    console.error(`[proxy ${method} ${backendUrl}]`, message);
    return NextResponse.json(
      { success: false, message: `Backend unreachable (${backendUrl}): ${message}`, data: null, errors: [message] },
      { status: 502 },
    );
  }
}

export async function proxyPost(
  req: NextRequest,
  backendResource: string,
  opts: ProxyOptions = {},
): Promise<NextResponse> {
  return proxyWithBody('POST', req, backendResource, opts);
}

export async function proxyPut(
  req: NextRequest,
  backendResource: string,
  opts: ProxyOptions = {},
): Promise<NextResponse> {
  return proxyWithBody('PUT', req, backendResource, opts);
}

export async function proxyPatch(
  req: NextRequest,
  backendResource: string,
  opts: ProxyOptions = {},
): Promise<NextResponse> {
  return proxyWithBody('PATCH', req, backendResource, opts);
}

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
      headers: { Accept: 'application/json', ...authHeader(req) },
    });
    return readUpstream(upstream, backendUrl);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected proxy error';
    console.error(`[proxy GET ${API_BASE}${API_PREFIX}${backendResource}]`, message);
    return NextResponse.json(
      { success: false, message, data: null, errors: [message] },
      { status: 502 },
    );
  }
}

export async function proxyDelete(
  req: NextRequest,
  backendResource: string,
  opts: ProxyOptions = {},
): Promise<NextResponse> {
  try {
    const backendUrl = `${API_BASE}${API_PREFIX}${opts.backendPath ?? backendResource}`;
    const upstream = await fetch(backendUrl, {
      method: 'DELETE',
      headers: { Accept: 'application/json', ...authHeader(req) },
    });
    return readUpstream(upstream, backendUrl);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected proxy error';
    console.error(`[proxy DELETE ${API_BASE}${API_PREFIX}${backendResource}]`, message);
    return NextResponse.json(
      { success: false, message, data: null, errors: [message] },
      { status: 502 },
    );
  }
}
