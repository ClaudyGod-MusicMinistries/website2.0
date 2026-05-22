/**
 * Lightweight cookie utility — works in browser only.
 * On the server (SSR), reads are no-ops; writes queue until hydration.
 */

export interface CookieOptions {
  /** Days until expiry. Omit for session cookie (expires when browser closes). */
  expires?: number;
  path?: string;
  sameSite?: 'Strict' | 'Lax' | 'None';
  secure?: boolean;
}

function isBrowser() {
  return typeof document !== 'undefined';
}

/** Write a cookie. */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  if (!isBrowser()) return;
  const { expires, path = '/', sameSite = 'Lax', secure = false } = options;

  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (expires !== undefined) {
    const date = new Date();
    date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
    cookie += `; Expires=${date.toUTCString()}`;
  }

  cookie += `; Path=${path}`;
  cookie += `; SameSite=${sameSite}`;
  if (secure || (isBrowser() && location.protocol === 'https:')) {
    cookie += '; Secure';
  }

  document.cookie = cookie;
}

/** Read a cookie value, or null if absent. */
export function getCookie(name: string): string | null {
  if (!isBrowser()) return null;
  const key = encodeURIComponent(name);
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${key}=`));
  if (!match) return null;
  try {
    return decodeURIComponent(match.split('=').slice(1).join('='));
  } catch {
    return null;
  }
}

/** Delete a cookie by setting it expired. */
export function deleteCookie(name: string, path = '/'): void {
  setCookie(name, '', { expires: -1, path });
}

/** Check if a cookie exists. */
export function hasCookie(name: string): boolean {
  return getCookie(name) !== null;
}
