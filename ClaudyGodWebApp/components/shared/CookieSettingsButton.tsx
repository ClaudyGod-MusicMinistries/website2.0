'use client';

import { openCookieSettings } from '@/lib/utils/cookieConsent';

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="font-sans text-xs uppercase tracking-[0.1em] text-neutral-500 transition-colors hover:text-neutral-300"
    >
      Cookie settings
    </button>
  );
}
