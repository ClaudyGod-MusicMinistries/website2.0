import { deleteCookie, getCookie, setCookie } from './cookies';

export const CONSENT_COOKIE = 'cgm_consent';
export const CONSENT_EXPIRY_DAYS = 180;
export const CONSENT_VERSION = 2;
export const CONSENT_CHANGED_EVENT = 'cgm:consent-changed';
export const OPEN_COOKIE_SETTINGS_EVENT = 'cgm:open-cookie-settings';

export interface CookiePreferences {
  version: typeof CONSENT_VERSION;
  necessary: true;
  preferences: boolean;
  decidedAt: number;
}

export type ConsentChoice = Pick<CookiePreferences, 'preferences'>;

function isValidConsent(value: unknown): value is CookiePreferences {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<CookiePreferences>;
  return (
    item.version === CONSENT_VERSION &&
    item.necessary === true &&
    typeof item.preferences === 'boolean' &&
    typeof item.decidedAt === 'number' &&
    Number.isFinite(item.decidedAt)
  );
}

export function getStoredConsent(): CookiePreferences | null {
  return parseConsent(getCookie(CONSENT_COOKIE));
}

export function parseConsent(raw: string | null): CookiePreferences | null {
  try {
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isValidConsent(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function clearPreferenceStorage() {
  deleteCookie('cgm_welcome');
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem('cg_visitor_token');
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith('youtube_embed_cache_'))
      .forEach((key) => window.localStorage.removeItem(key));
  } catch {
    // Storage may be unavailable in private browsing; the cookie choice still saves.
  }
}

export function saveConsent(choice: ConsentChoice): CookiePreferences {
  const consent: CookiePreferences = {
    version: CONSENT_VERSION,
    necessary: true,
    preferences: choice.preferences,
    decidedAt: Date.now(),
  };
  setCookie(CONSENT_COOKIE, JSON.stringify(consent), {
    expires: CONSENT_EXPIRY_DAYS,
    sameSite: 'Lax',
  });
  if (!choice.preferences) clearPreferenceStorage();
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent<CookiePreferences>(CONSENT_CHANGED_EVENT, { detail: consent })
    );
  }
  return consent;
}

export function acceptAll() {
  return saveConsent({ preferences: true });
}

export function rejectNonEssential() {
  return saveConsent({ preferences: false });
}

export function hasConsent(category: 'necessary' | 'preferences') {
  if (category === 'necessary') return true;
  return getStoredConsent()?.preferences === true;
}

export function openCookieSettings() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}

export function clearConsent() {
  deleteCookie(CONSENT_COOKIE);
  clearPreferenceStorage();
}
