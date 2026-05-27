'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ShieldCheck, BarChart2, Settings2, Megaphone, ChevronRight } from 'lucide-react';
import {
  getStoredConsent,
  saveConsent,
  acceptAll,
  rejectNonEssential,
  type CookiePreferences,
} from '@/utils/cookieConsent';
import { cn } from '@/utils/cn';

// ─── Animations ──────────────────────────────────────────────────────────────

const bannerAnim = {
  hidden:  { y: 100, opacity: 0 },
  visible: { y: 0,   opacity: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit:    { y: 100, opacity: 0, transition: { duration: 0.3,  ease: [0.4, 0, 1, 1] } },
};

const modalAnim = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({
  checked, onChange, disabled = false,
}: {
  checked: boolean; onChange: (v: boolean) => void; disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        'relative inline-flex w-10 h-5 rounded-full border-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500',
        checked
          ? 'bg-purple-600 border-purple-600'
          : 'bg-neutral-200 border-neutral-300',
        disabled && 'opacity-60 cursor-not-allowed',
      )}
    >
      <span className={cn(
        'absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform duration-200',
        checked ? 'translate-x-5' : 'translate-x-0',
      )} />
    </button>
  );
}

// ─── Preference row ───────────────────────────────────────────────────────────

function PrefRow({
  icon: Icon, title, description, checked, onChange, disabled,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-start gap-4 py-5 border-b border-neutral-100 last:border-0">
      <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="h-4 w-4 text-purple-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-4">
          <p className="font-bricolage font-semibold text-neutral-900 text-sm">{title}</p>
          <Toggle checked={checked} onChange={onChange} disabled={disabled} />
        </div>
        <p className="font-raleway text-neutral-500 text-xs leading-relaxed mt-1">{description}</p>
        {disabled && (
          <span className="inline-block mt-1 font-worksans text-[0.5rem] tracking-[0.14em] uppercase text-purple-500 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full">
            Always Active
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal,  setShowModal]  = useState(false);
  const [prefs, setPrefs] = useState<Omit<CookiePreferences, 'essential' | 'ts'>>({
    analytics:  true,
    functional: true,
    marketing:  false,
  });

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      // Delay slightly so the welcome modal gets priority visually
      const t = setTimeout(() => setShowBanner(true), 3500);
      return () => clearTimeout(t);
    }
  }, []);

  const onAcceptAll = () => {
    acceptAll();
    setShowBanner(false);
    setShowModal(false);
  };

  const onReject = () => {
    rejectNonEssential();
    setShowBanner(false);
    setShowModal(false);
  };

  const onSavePrefs = () => {
    saveConsent(prefs);
    setShowBanner(false);
    setShowModal(false);
  };

  return (
    <>
      {/* ── Banner ── */}
      <AnimatePresence>
        {showBanner && !showModal && (
          <motion.div
            variants={bannerAnim}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 z-[190] p-4 md:p-5"
            role="region"
            aria-label="Cookie consent"
          >
            <div className="max-w-[1100px] mx-auto bg-white border border-neutral-200 rounded-2xl shadow-[0_-4px_40px_rgba(0,0,0,0.12)] overflow-hidden">
              {/* Purple top accent */}
              <div className="h-[3px] bg-gradient-to-r from-purple-600 via-gold-500 to-purple-600" />

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 px-5 py-4 md:px-6">
                {/* Icon + text */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Cookie className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bricolage font-bold text-neutral-900 text-sm mb-0.5">
                      We use cookies to enhance your experience
                    </p>
                    <p className="font-raleway text-neutral-500 text-xs leading-relaxed">
                      We use essential cookies to make our site work, and optional cookies to improve your experience and analyse traffic.{' '}
                      <Link href="/legal/cookies" className="text-purple-600 hover:underline underline-offset-2">
                        Learn more
                      </Link>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto md:shrink-0">
                  {/* Reject + Customize side by side on mobile */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onReject}
                      className="flex-1 sm:flex-none h-9 px-4 border border-neutral-200 hover:border-neutral-300 text-neutral-600 hover:text-neutral-900 font-worksans text-xs tracking-[0.1em] uppercase rounded-xl transition-all duration-200"
                    >
                      Reject All
                    </button>
                    <button
                      onClick={() => setShowModal(true)}
                      className="flex-1 sm:flex-none h-9 px-4 border border-neutral-200 hover:border-purple-300 text-neutral-600 hover:text-purple-700 font-worksans text-xs tracking-[0.1em] uppercase rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5"
                    >
                      <Settings2 className="h-3 w-3 shrink-0" />
                      Customize
                    </button>
                  </div>
                  {/* Accept All — full width on mobile, auto on sm+ */}
                  <button
                    onClick={onAcceptAll}
                    className="w-full sm:w-auto h-9 px-5 bg-purple-600 hover:bg-purple-500 text-white font-worksans text-xs tracking-[0.1em] uppercase rounded-xl transition-colors duration-200 shadow-[0_2px_12px_rgba(124,58,237,0.3)]"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Preferences Modal ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.15 } }}
            className="fixed inset-0 z-[195] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          >
            <motion.div
              variants={modalAnim}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-md bg-white rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.18)] border border-neutral-100 overflow-hidden"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">
                    <Settings2 className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bricolage font-bold text-neutral-900 text-base">Cookie Preferences</p>
                    <p className="font-worksans text-[0.5rem] tracking-[0.14em] uppercase text-neutral-400">Manage your consent</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-neutral-100 flex items-center justify-center transition-colors"
                >
                  <X className="h-4 w-4 text-neutral-500" />
                </button>
              </div>

              {/* Cookie categories */}
              <div className="px-6">
                <PrefRow
                  icon={ShieldCheck}
                  title="Essential Cookies"
                  description="Required for core site functionality like navigation, shopping cart, and security. Cannot be disabled."
                  checked
                  onChange={() => {}}
                  disabled
                />
                <PrefRow
                  icon={BarChart2}
                  title="Analytics Cookies"
                  description="Help us understand how visitors interact with the site by collecting anonymous usage data. This helps us improve our content."
                  checked={prefs.analytics}
                  onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
                />
                <PrefRow
                  icon={Settings2}
                  title="Functional Cookies"
                  description="Enable enhanced features like remembering your preferences, language settings, and personalised content."
                  checked={prefs.functional}
                  onChange={(v) => setPrefs((p) => ({ ...p, functional: v }))}
                />
                <PrefRow
                  icon={Megaphone}
                  title="Marketing Cookies"
                  description="Used to deliver relevant advertisements and track campaign effectiveness. We do not sell your data to third parties."
                  checked={prefs.marketing}
                  onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
                />
              </div>

              {/* Footer */}
              <div className="px-6 py-5 bg-neutral-50 border-t border-neutral-100 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={onReject}
                  className="flex-1 h-10 border border-neutral-200 hover:border-neutral-300 text-neutral-600 font-worksans text-xs tracking-[0.1em] uppercase rounded-xl transition-all duration-200"
                >
                  Reject Non-Essential
                </button>
                <button
                  onClick={onSavePrefs}
                  className="flex-1 h-10 bg-purple-600 hover:bg-purple-500 text-white font-worksans text-xs tracking-[0.1em] uppercase rounded-xl transition-colors duration-200 flex items-center justify-center gap-1.5"
                >
                  Save Preferences
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="px-6 pb-4 text-center">
                <p className="font-raleway text-neutral-400 text-xs">
                  Read our{' '}
                  <Link href="/legal/cookies" className="text-purple-600 hover:underline underline-offset-2">Cookie Policy</Link>
                  {' '}and{' '}
                  <Link href="/legal/privacy" className="text-purple-600 hover:underline underline-offset-2">Privacy Policy</Link>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
