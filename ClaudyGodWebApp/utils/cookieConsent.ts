export const CONSENT_KEY = 'cgm_cookie_consent';
export const CONSENT_EXPIRY_DAYS = 365;

export interface CookiePreferences {
  essential: true;    // always on, cannot be toggled
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  timestamp: number;
}

export type ConsentStatus = 'accepted_all' | 'rejected' | 'custom' | null;

export function getStoredConsent(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed: CookiePreferences = JSON.parse(raw);
    // Expire after 365 days
    const age = Date.now() - (parsed.timestamp ?? 0);
    if (age > CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(prefs: Omit<CookiePreferences, 'timestamp' | 'essential'>) {
  const full: CookiePreferences = {
    essential: true,
    analytics: prefs.analytics,
    functional: prefs.functional,
    marketing: prefs.marketing,
    timestamp: Date.now(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(full));
  return full;
}

export function acceptAll() {
  return saveConsent({ analytics: true, functional: true, marketing: true });
}

export function rejectNonEssential() {
  return saveConsent({ analytics: false, functional: false, marketing: false });
}
