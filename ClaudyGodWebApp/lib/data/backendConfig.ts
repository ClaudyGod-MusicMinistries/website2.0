const API_PREFIX = '/api/v1.0';
const LOCAL_API_BASE = 'http://localhost:8080';

export function getBackendBaseUrl(): string {
  return (process.env.API_BASE_URL || LOCAL_API_BASE).replace(/\/$/, '');
}

export function getBackendUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getBackendBaseUrl()}${API_PREFIX}${normalizedPath}`;
}

/** Headers used only by Next.js server code when calling the private API. */
export function getBackendServiceHeaders(): Record<string, string> {
  const apiKey = process.env.INTERNAL_API_KEY?.trim();
  return apiKey ? { 'x-api-key': apiKey } : {};
}

export function isAbortError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.name === 'AbortError' || /abort|timeout/i.test(error.message))
  );
}
