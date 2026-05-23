'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Bell, ArrowRight, Music } from 'lucide-react';
import { getCookie, setCookie } from '@/utils/cookies';

// Session cookie — no expires = browser-session lifetime
const SESSION_KEY = 'cgm_welcome';

const backdrop = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit:    { opacity: 0, transition: { duration: 0.25, delay: 0.1 } },
};

const panel = {
  hidden:  { opacity: 0, y: 32, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.05 } },
  exit:    { opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};

export function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (getCookie(SESSION_KEY)) return;
    const t = setTimeout(() => setOpen(true), 1800);
    return () => clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    // Session cookie — expires when browser is closed (no `expires` option)
    setCookie(SESSION_KEY, '1');
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Fire-and-forget newsletter subscription
    fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).catch(() => {});
    setSubscribed(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to ClaudyGod Music Ministries"
        >
          <motion.div
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-lg bg-[#0d0b1a] rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)] border border-white/[0.07]"
          >
            {/* Close */}
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/[0.08] flex items-center justify-center transition-colors duration-200"
            >
              <X className="h-4 w-4 text-white/70" />
            </button>

            {/* ── Hero band ── */}
            <div className="relative h-52 overflow-hidden">
              <Image
                src="/resize_abt.webp"
                alt="ClaudyGod Music Ministries"
                fill
                className="object-cover object-top"
                sizes="576px"
              />
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b1a] via-[#0d0b1a]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-transparent" />

              {/* Play badge */}
              <div className="absolute bottom-4 left-5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center shadow-[0_4px_18px_rgba(124,58,237,0.55)] cursor-pointer transition-colors duration-200 group">
                  <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                </div>
                <div>
                  <p className="font-worksans text-[0.5rem] tracking-[0.22em] uppercase text-gold-400/80 mb-0.5">Now Streaming</p>
                  <p className="font-bricolage font-bold text-white text-sm leading-tight">Very Glorious</p>
                </div>
              </div>

              {/* New badge */}
              <div className="absolute top-4 left-5 bg-gold-500/90 text-[#07060f] font-worksans font-bold text-[0.5rem] tracking-[0.2em] uppercase px-3 py-1 rounded-full">
                New Release
              </div>
            </div>

            {/* ── Body ── */}
            <div className="px-6 pb-6 pt-4">
              {/* Logo + headline */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gold-500/25 shrink-0">
                  <Image src="/ClaudyGoLogo.webp" alt="ClaudyGod" fill className="object-contain p-1" sizes="40px" />
                </div>
                <div>
                  <p className="font-bricolage font-bold text-white text-base leading-tight">Welcome to ClaudyGod</p>
                  <p className="font-worksans text-[0.5rem] tracking-[0.2em] uppercase text-gold-500/60">Music Ministries</p>
                </div>
              </div>

              <p className="font-raleway text-neutral-400 text-sm leading-relaxed mb-5">
                Spirit-filled gospel music, worship videos, and ministry content — created to bless your soul and spread the love of God.
              </p>

              {/* Newsletter */}
              <div className="mb-5 p-4 rounded-xl bg-white/[0.04] border border-white/[0.07]">
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="h-4 w-4 text-gold-400" />
                  <p className="font-bricolage font-semibold text-white text-sm">Stay Connected</p>
                </div>

                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 py-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                      <span className="text-green-400 text-xs">✓</span>
                    </div>
                    <p className="font-raleway text-neutral-300 text-sm">
                      You&apos;re subscribed! Welcome to the community.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 h-10 px-3.5 bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-neutral-600 font-raleway text-sm rounded-xl focus:outline-none focus:border-purple-500/60 transition-colors duration-200"
                    />
                    <button
                      type="submit"
                      className="h-10 px-4 bg-purple-600 hover:bg-purple-500 text-white font-worksans text-xs tracking-[0.12em] uppercase rounded-xl transition-colors duration-200 shrink-0"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <Link
                  href="/music"
                  onClick={close}
                  className="flex-1 h-11 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-[#07060f] font-bricolage font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <Music className="h-4 w-4" />
                  Listen Now
                </Link>
                <button
                  onClick={close}
                  className="flex-1 h-11 border border-white/[0.1] hover:border-white/[0.25] text-neutral-400 hover:text-white font-worksans text-xs tracking-[0.12em] uppercase rounded-xl flex items-center justify-center gap-1.5 transition-all duration-200"
                >
                  Explore the Site
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
