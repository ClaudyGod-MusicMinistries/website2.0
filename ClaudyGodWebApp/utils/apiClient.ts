import type { ApiResponse } from '@/types/api';

// All calls hit /api/* (Next.js proxy routes), which forward to the .NET backend.
// The backend URL (API_BASE_URL) is kept server-side only — never exposed to the browser.
const BASE = '/api';

// ─── Error class ────────────────────────────────────────────────────────────

export class BackendError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly errors: string[] = [],
  ) {
    super(message);
    this.name = 'BackendError';
  }
}

// ─── Core fetch helpers ─────────────────────────────────────────────────────

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
    );
  }

  return body.data as T;
}

export async function get<T = unknown>(
  path: string,
  params?: Record<string, string | number | undefined>,
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

  const res = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    next: { revalidate: 0 }, // always fresh — adjust per-route if needed
  });

  return handleResponse<T>(res);
}

export async function post<T = unknown>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });

  return handleResponse<T>(res);
}

export async function put<T = unknown>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });

  return handleResponse<T>(res);
}

export async function del<T = unknown>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  });

  return handleResponse<T>(res);
}
