const STORAGE_KEY = 'cg_visitor_token';

// Only used if localStorage throws (private browsing, etc.) — cached here so
// repeated calls within the same page load still return the same value
// instead of a fresh UUID each time, which would break like-dedup within a
// single visit even without persistence across visits.
let fallbackToken: string | null = null;

/**
 * A random, anonymous per-browser identifier used only to dedupe post likes
 * (the site has no visitor accounts) — generated once and persisted in
 * localStorage, not tied to any personal information. Returns '' during SSR
 * (no localStorage) since like state is inherently a client-only concern.
 */
export function getVisitorToken(): string {
  if (typeof window === 'undefined') return '';

  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;

    const token = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, token);
    return token;
  } catch {
    fallbackToken ??= crypto.randomUUID();
    return fallbackToken;
  }
}
