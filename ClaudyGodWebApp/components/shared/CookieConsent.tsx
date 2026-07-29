'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Cookie, Settings2, ShieldCheck, SlidersHorizontal, X } from 'lucide-react';
import { Dialog } from '@/components/ui/Dialog';
import {
  acceptAll,
  getStoredConsent,
  OPEN_COOKIE_SETTINGS_EVENT,
  rejectNonEssential,
  saveConsent,
} from '@/lib/utils/cookieConsent';
import { cn } from '@/lib/utils/cn';

function ConsentSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-6 w-11 shrink-0 rounded-full transition focus:outline-none focus:ring-4 focus:ring-purple-600/15',
        checked ? 'bg-purple-700' : 'bg-neutral-300'
      )}
    >
      <span
        className={cn(
          'absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
          checked && 'translate-x-5'
        )}
      />
    </button>
  );
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    setPreferences(stored?.preferences ?? false);
    if (!stored) {
      const timer = window.setTimeout(() => setShowBanner(true), 600);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const open = () => {
      setPreferences(getStoredConsent()?.preferences ?? false);
      setShowBanner(false);
      setShowSettings(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
  }, []);

  const finish = (choice: 'necessary' | 'all' | 'custom') => {
    if (choice === 'necessary') rejectNonEssential();
    else if (choice === 'all') acceptAll();
    else saveConsent({ preferences });
    setShowBanner(false);
    setShowSettings(false);
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.aside
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            className="fixed inset-x-3 bottom-3 z-sticky mx-auto max-w-4xl rounded-xl border border-neutral-200 bg-white shadow-card-light-lg sm:inset-x-5 sm:bottom-5"
            aria-labelledby="cookie-banner-title"
          >
            <div className="flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-center">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-50 text-purple-700">
                <Cookie className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <h2
                  id="cookie-banner-title"
                  className="font-display text-base font-semibold text-neutral-950"
                >
                  Your privacy choices
                </h2>
                <p className="mt-1 max-w-2xl font-sans text-xs leading-5 text-neutral-600 sm:text-sm">
                  Necessary cookies keep the site secure and working. With your permission,
                  preference cookies remember helpful choices.{' '}
                  <Link
                    href="/legal/cookies"
                    className="font-medium text-purple-700 underline underline-offset-2"
                  >
                    Cookie policy
                  </Link>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:flex md:shrink-0">
                <button
                  type="button"
                  onClick={() => finish('necessary')}
                  className="h-10 rounded-lg border border-neutral-300 px-3 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50"
                >
                  Necessary only
                </button>
                <button
                  type="button"
                  onClick={() => setShowSettings(true)}
                  className="h-10 rounded-lg border border-neutral-300 px-3 text-xs font-semibold text-neutral-700 transition hover:border-purple-300 hover:text-purple-700"
                >
                  Settings
                </button>
                <button
                  type="button"
                  onClick={() => finish('all')}
                  className="col-span-2 h-10 rounded-lg bg-purple-700 px-4 text-xs font-semibold text-white transition hover:bg-purple-600 sm:col-auto"
                >
                  Allow preferences
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <Dialog.Content
          title="Privacy settings"
          hideTitle
          description="Choose which optional storage the site may use."
          className="max-w-lg overflow-hidden border-neutral-200 bg-white p-0 text-neutral-950 shadow-popup"
          showClose={false}
        >
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-50 text-purple-700">
                <SlidersHorizontal className="h-4 w-4" />
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold">Privacy settings</h2>
                <p className="text-xs text-neutral-500">You can change this at any time.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowSettings(false)}
              aria-label="Close privacy settings"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="divide-y divide-neutral-100 px-5 sm:px-6">
            <div className="flex gap-3 py-5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold">Necessary</h3>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700">
                    <Check className="h-3.5 w-3.5" />
                    Always on
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-neutral-500">
                  Required for security, consent choices, checkout, and core site features.
                </p>
              </div>
            </div>
            <div className="flex gap-3 py-5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-50 text-purple-700">
                <Settings2 className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold">Preferences</h3>
                  <ConsentSwitch
                    checked={preferences}
                    onChange={setPreferences}
                    label="Allow preference cookies"
                  />
                </div>
                <p className="mt-1 text-xs leading-5 text-neutral-500">
                  Remembers optional choices such as welcome messages and media caching.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-100 bg-neutral-50 px-5 py-4 sm:px-6">
            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => finish('necessary')}
                className="h-11 rounded-lg border border-neutral-300 bg-white text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
              >
                Use necessary only
              </button>
              <button
                type="button"
                onClick={() => finish('custom')}
                className="h-11 rounded-lg bg-purple-700 text-sm font-semibold text-white hover:bg-purple-600"
              >
                Save choices
              </button>
            </div>
            <p className="mt-3 text-center text-xs text-neutral-500">
              <Link href="/legal/cookies" className="hover:text-purple-700 hover:underline">
                Cookie policy
              </Link>
              <span className="mx-2">·</span>
              <Link href="/legal/privacy" className="hover:text-purple-700 hover:underline">
                Privacy policy
              </Link>
            </p>
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
