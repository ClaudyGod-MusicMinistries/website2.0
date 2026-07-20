import type { ApiResponse } from '@/types/api';

// All calls go through /api/* (Next.js server-side proxy routes).
// The backend URL (API_BASE_URL) is server-side only — never exposed to the browser.
const BASE = '/api';

// ─── Error class ────────────────────────────────────────────────────────────

export class BackendError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly errors: string[] = [],
    public readonly fieldErrors: Record<string, string[]> = {},
  ) {
    super(message);
    this.name = 'BackendError';
  }
}

// ─── In-memory access token store ───────────────────────────────────────────
// Access token lives only in JS memory — never localStorage/sessionStorage.
// Refresh token lives in an HTTP-only cookie set by the server.

let _accessToken: string | null = null;
let _tokenExpiry: number | null = null; // unix ms

export function setAccessToken(token: string, expiresAt: string | Date) {
  _accessToken = token;
  _tokenExpiry = new Date(expiresAt).getTime();
}

export function clearAccessToken() {
  _accessToken = null;
  _tokenExpiry = null;
}

export function getAccessToken(): string | null {
  if (!_accessToken || !_tokenExpiry) return null;
  // Treat token as expired 30s before actual expiry to avoid race conditions
  if (Date.now() >= _tokenExpiry - 30_000) return null;
  return _accessToken;
}

export function isAuthenticated(): boolean {
  return getAccessToken() !== null;
}

// ─── Auto-refresh logic ──────────────────────────────────────────────────────

let _refreshPromise: Promise<string> | null = null;
let _refreshInProgress = false;

async function refreshToken(): Promise<string> {
  // Prevent concurrent refresh attempts
  if (_refreshInProgress || _refreshPromise) return _refreshPromise!;

  _refreshInProgress = true;

  _refreshPromise = (async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10-second timeout

      const res = await fetch(`${BASE}/auth/refresh`, {
        method: 'POST',
        credentials: 'include', // send the HTTP-only refresh cookie
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const body = (await res.json()) as ApiResponse<{ accessToken: string; accessTokenExpiresAt: string }>;

      if (!res.ok || !body.success || !body.data) {
        clearAccessToken();
        throw new BackendError(
          body.message || 'Session expired. Please log in again.',
          res.status,
        );
      }

      setAccessToken(body.data.accessToken, body.data.accessTokenExpiresAt);
      return body.data.accessToken;
    } finally {
      _refreshInProgress = false;
      _refreshPromise = null;
    }
  })();

  return _refreshPromise;
}

// Returns a valid access token, refreshing silently if needed.
async function resolveToken(): Promise<string | null> {
  const token = getAccessToken();
  if (token) return token;

  try {
    return await refreshToken();
  } catch {
    return null;
  }
}

// ─── Core fetch helpers ──────────────────────────────────────────────────────

async function handleResponse<T>(res: Response): Promise<T> {
  let body: ApiResponse<T>;

  try {
    body = (await res.json()) as ApiResponse<T>;
  } catch {
    throw new BackendError(`HTTP ${res.status}`, res.status);
  }

  if (!res.ok || !body.success) {
    throw new BackendError(
      body.message || `Request failed (${res.status})`,
      res.status,
      body.errors ?? [],
      body.fieldErrors ?? {},
    );
  }

  return body.data as T;
}

function authHeaders(token: string | null): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function get<T = unknown>(
  path: string,
  params?: Record<string, string | number | undefined>,
  authenticated = false,
): Promise<T> {
  let url = `${BASE}${path}`;
  if (params) {
    const qs = new URLSearchParams(
      Object.entries(params)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)]),
    ).toString();
    if (qs) url += `?${qs}`;
  }

  const token = authenticated ? await resolveToken() : null;

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: { Accept: 'application/json', ...authHeaders(token) },
    next: { revalidate: 0 },
  });

  return handleResponse<T>(res);
}

export async function post<T = unknown>(
  path: string,
  body: unknown,
  authenticated = false,
): Promise<T> {
  const token = authenticated ? await resolveToken() : null;

  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...authHeaders(token),
    },
    body: JSON.stringify(body),
  });

  return handleResponse<T>(res);
}

export async function put<T = unknown>(
  path: string,
  body: unknown,
  authenticated = false,
): Promise<T> {
  const token = authenticated ? await resolveToken() : null;

  const res = await fetch(`${BASE}${path}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...authHeaders(token),
    },
    body: JSON.stringify(body),
  });

  return handleResponse<T>(res);
}

export async function patch<T = unknown>(
  path: string,
  body: unknown,
  authenticated = false,
): Promise<T> {
  const token = authenticated ? await resolveToken() : null;

  const res = await fetch(`${BASE}${path}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...authHeaders(token),
    },
    body: JSON.stringify(body),
  });

  return handleResponse<T>(res);
}

export async function del<T = unknown>(
  path: string,
  authenticated = false,
): Promise<T> {
  const token = authenticated ? await resolveToken() : null;

  const res = await fetch(`${BASE}${path}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { Accept: 'application/json', ...authHeaders(token) },
  });

  return handleResponse<T>(res);
}
