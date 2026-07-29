import { NextRequest, NextResponse } from 'next/server';
import { getBackendServiceHeaders, getBackendUrl, isAbortError } from './backendConfig';

type ProxyOptions = {
  backendPath?: string;
  body?: unknown;
};

function authHeader(req: NextRequest): Record<string, string> {
  const token = req.headers.get('authorization');
  return token ? { Authorization: token } : {};
}

async function readUpstream(upstream: Response, backendUrl: string): Promise<NextResponse> {
  const contentType = upstream.headers.get('content-type') ?? '';
  // Matches "application/json" AND ASP.NET's "application/problem+json" (used
  // by [ApiController]'s automatic ModelState-invalid responses) — checking
  // only for the literal "application/json" substring missed every +json
  // suffix, silently swallowing real validation error details from the
  // backend into a generic "server error" message.
  if (!contentType.includes('json')) {
    const text = await upstream.text();
    console.error(
      `[proxy] Non-JSON response from ${backendUrl} (${upstream.status}): ${text.slice(0, 500)}`
    );

    // If it's a 5xx error, provide specific message
    if (upstream.status >= 500) {
      return NextResponse.json(
        {
          success: false,
          message: 'Our servers are temporarily unavailable. Please try again in a moment.',
          data: null,
          errors: ['Server error. Our team has been notified.'],
          fieldErrors: {},
        },
        { status: 503 }
      );
    }

    // For other errors, provide more helpful message
    return NextResponse.json(
      {
        success: false,
        message: 'There was a problem processing your request. Please try again.',
        data: null,
        errors: [`Server error (${upstream.status})`],
        fieldErrors: {},
      },
      { status: upstream.status === 0 ? 502 : upstream.status }
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
  opts: ProxyOptions = {}
): Promise<NextResponse> {
  try {
    const body = opts.body ?? (await req.json());
    const backendUrl = getBackendUrl(opts.backendPath ?? backendResource);
    const cookieHeader = req.headers.get('cookie');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30-second timeout

    const upstream = await fetch(backendUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...getBackendServiceHeaders(),
        ...authHeader(req),
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    return readUpstream(upstream, backendUrl);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected proxy error';
    const backendUrl = getBackendUrl(backendResource);

    if (isAbortError(err)) {
      console.error(`[proxy ${method} ${backendUrl}] Timeout after 30 seconds`);
      return NextResponse.json(
        {
          success: false,
          message: 'Request took too long. Please try again.',
          data: null,
          errors: ['Request timeout'],
          fieldErrors: {},
        },
        { status: 504 }
      );
    }

    console.error(`[proxy ${method} ${backendUrl}]`, message);
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to reach the server. Please check your connection and try again.',
        data: null,
        errors: [message],
        fieldErrors: {},
      },
      { status: 502 }
    );
  }
}

export async function proxyPost(
  req: NextRequest,
  backendResource: string,
  opts: ProxyOptions = {}
): Promise<NextResponse> {
  return proxyWithBody('POST', req, backendResource, opts);
}

export async function proxyPut(
  req: NextRequest,
  backendResource: string,
  opts: ProxyOptions = {}
): Promise<NextResponse> {
  return proxyWithBody('PUT', req, backendResource, opts);
}

export async function proxyPatch(
  req: NextRequest,
  backendResource: string,
  opts: ProxyOptions = {}
): Promise<NextResponse> {
  return proxyWithBody('PATCH', req, backendResource, opts);
}

export async function proxyGet(
  req: NextRequest,
  backendResource: string,
  opts: ProxyOptions = {}
): Promise<NextResponse> {
  try {
    const search = req.nextUrl.searchParams.toString();
    const path = getBackendUrl(opts.backendPath ?? backendResource);
    // This always forwards the incoming request's own query string — a
    // caller passing a resource path that already has one baked in (e.g.
    // '/media?type=video') would get it appended a second time, producing
    // a malformed '?type=video?type=video' the backend can't parse. Every
    // route.ts caller now passes a clean path for exactly this reason;
    // this guard makes that the enforced contract, not just convention.
    if (path.includes('?')) {
      throw new Error(
        `proxyGet: backendResource must not include a query string (got "${backendResource}") — proxyGet always forwards the request's own search params`
      );
    }
    const backendUrl = search ? `${path}?${search}` : path;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const upstream = await fetch(backendUrl, {
      method: 'GET',
      headers: { Accept: 'application/json', ...getBackendServiceHeaders(), ...authHeader(req) },
      signal: controller.signal,
    });

    clearTimeout(timeout);
    return readUpstream(upstream, backendUrl);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected proxy error';
    const backendUrl = getBackendUrl(backendResource);

    if (isAbortError(err)) {
      console.error(`[proxy GET ${backendUrl}] Timeout after 30 seconds`);
      return NextResponse.json(
        {
          success: false,
          message: 'Request took too long. Please try again.',
          data: null,
          errors: ['Request timeout'],
          fieldErrors: {},
        },
        { status: 504 }
      );
    }

    console.error(`[proxy GET ${backendUrl}]`, message);
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to reach the server. Please check your connection and try again.',
        data: null,
        errors: [message],
        fieldErrors: {},
      },
      { status: 502 }
    );
  }
}

export async function proxyDelete(
  req: NextRequest,
  backendResource: string,
  opts: ProxyOptions = {}
): Promise<NextResponse> {
  try {
    const backendUrl = getBackendUrl(opts.backendPath ?? backendResource);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const upstream = await fetch(backendUrl, {
      method: 'DELETE',
      headers: { Accept: 'application/json', ...getBackendServiceHeaders(), ...authHeader(req) },
      signal: controller.signal,
    });

    clearTimeout(timeout);
    return readUpstream(upstream, backendUrl);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected proxy error';
    const backendUrl = getBackendUrl(backendResource);

    if (isAbortError(err)) {
      console.error(`[proxy DELETE ${backendUrl}] Timeout after 30 seconds`);
      return NextResponse.json(
        {
          success: false,
          message: 'Request took too long. Please try again.',
          data: null,
          errors: ['Request timeout'],
          fieldErrors: {},
        },
        { status: 504 }
      );
    }

    console.error(`[proxy DELETE ${backendUrl}]`, message);
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to reach the server. Please check your connection and try again.',
        data: null,
        errors: [message],
        fieldErrors: {},
      },
      { status: 502 }
    );
  }
}
