import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.API_BASE_URL ?? 'http://localhost:8080';
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
  return NextResponse.json(data, { status: upstream.status });
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
    const upstream = await fetch(backendUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...authHeader(req),
      },
      body: JSON.stringify(body),
    });
    return readUpstream(upstream, backendUrl);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected proxy error';
    console.error(`[proxy ${method}]`, err);
    return NextResponse.json(
      { success: false, message, data: null, errors: [message] },
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
    console.error('[proxy GET]', err);
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
    console.error('[proxy DELETE]', err);
    return NextResponse.json(
      { success: false, message, data: null, errors: [message] },
      { status: 502 },
    );
  }
}
