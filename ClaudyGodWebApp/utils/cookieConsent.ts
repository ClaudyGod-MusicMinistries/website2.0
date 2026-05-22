import { getCookie, setCookie, deleteCookie } from './cookies';

export const CONSENT_COOKIE   = 'cgm_consent';
export const CONSENT_EXPIRY   = 365; // days

export interface CookiePreferences {
  essential:  true;
  analytics:  boolean;
  functional: boolean;
  marketing:  boolean;
  ts:         number;
}

/** Read stored consent from cookie. Returns null if not set or expired. */
export function getStoredConsent(): CookiePreferences | null {
  try {
    const raw = getCookie(CONSENT_COOKIE);
    if (!raw) return null;
    return JSON.parse(raw) as CookiePreferences;
  } catch {
    return null;
  }
}

/** Persist consent to a first-party 365-day cookie (no localStorage). */
export function saveConsent(prefs: Omit<CookiePreferences, 'essential' | 'ts'>): CookiePreferences {
  const full: CookiePreferences = {
    essential:  true,
    analytics:  prefs.analytics,
    functional: prefs.functional,
    marketing:  prefs.marketing,
    ts:         Date.now(),
  };
  setCookie(CONSENT_COOKIE, JSON.stringify(full), { expires: CONSENT_EXPIRY, sameSite: 'Lax' });
  return full;
}

export function acceptAll()          { return saveConsent({ analytics: true,  functional: true,  marketing: true  }); }
export function rejectNonEssential() { return saveConsent({ analytics: false, functional: false, marketing: false }); }
export function clearConsent()       { deleteCookie(CONSENT_COOKIE); }
