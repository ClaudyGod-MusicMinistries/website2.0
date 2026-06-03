'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Bell, ArrowRight, Music } from 'lucide-react';
import { getCookie, setCookie } from '@/utils/cookies';

r

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
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
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm"
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
            className="relative w-full sm:max-w-lg bg-[#0d0b1a] sm:rounded-2xl rounded-t-2xl overflow-hidden shadow-[0_-8px_40px_rgba(0,0,0,0.5)] sm:shadow-[0_32px_80px_rgba(0,0,0,0.6)] border border-white/[0.07] flex flex-col max-h-[92svh]"
          >
            {/* Close */}
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/[0.08] flex items-center justify-center transition-colors duration-200"
            >
              <X className="h-3.5 w-3.5 text-white/70" />
            </button>

            {/* ── Hero band — shrinks naturally, fixed on mobile ── */}
            <div className="relative h-36 sm:h-52 overflow-hidden shrink-0">
              <Image
                src="/resize_abt.webp"
                alt="ClaudyGod Music Ministries"
                fill
                className="object-cover object-top"
                sizes="576px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b1a] via-[#0d0b1a]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-transparent" />

              {/* Play badge */}
              <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center shadow-[0_4px_18px_rgba(124,58,237,0.55)] cursor-pointer transition-colors duration-200">
                  <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white fill-white ml-0.5" />
                </div>
                <div>
                  <p className="font-worksans text-[0.48rem] sm:text-[0.5rem] tracking-[0.22em] uppercase text-gold-400/80 mb-0.5">Now Streaming</p>
                  <p className="font-bricolage font-bold text-white text-xs sm:text-sm leading-tight">Very Glorious</p>
                </div>
              </div>

              {/* New badge */}
              <div className="absolute top-3 left-4 bg-gold-500/90 text-[#07060f] font-worksans font-bold text-[0.48rem] sm:text-[0.5rem] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full">
                New Release
              </div>
            </div>

            {/* ── Scrollable body ── */}
            <div className="overflow-y-auto flex-1 px-4 pb-4 pt-3 sm:px-6 sm:pb-6">

              {/* Logo + headline */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-gold-500/25 shrink-0">
                  <Image src="/ClaudyGoLogo.webp" alt="ClaudyGod" fill className="object-contain p-1" sizes="40px" />
                </div>
                <div>
                  <p className="font-bricolage font-bold text-white text-sm sm:text-base leading-tight">Welcome to ClaudyGod</p>
                  <p className="font-worksans text-[0.48rem] sm:text-[0.5rem] tracking-[0.2em] uppercase text-gold-500/60">Music Ministries</p>
                </div>
              </div>

              <p className="font-roboto text-neutral-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                Spirit-filled gospel music, worship videos, and ministry content — created to bless your soul and spread the love of God.
              </p>

              {/* Newsletter */}
              <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-xl bg-white/[0.04] border border-white/[0.07]">
                <div className="flex items-center gap-2 mb-2.5">
                  <Bell className="h-3.5 w-3.5 text-gold-400 shrink-0" />
                  <p className="font-bricolage font-semibold text-white text-xs sm:text-sm">Stay Connected</p>
                </div>

                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 py-1.5"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                      <span className="text-green-400 text-[0.6rem]">✓</span>
                    </div>
                    <p className="font-roboto text-neutral-300 text-xs sm:text-sm">
                      You&apos;re subscribed! Welcome to the community.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full h-9 sm:h-10 px-3 bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-neutral-600 font-roboto text-xs sm:text-sm rounded-xl focus:outline-none focus:border-purple-500/60 transition-colors duration-200"
                    />
                    <button
                      type="submit"
                      className="h-9 sm:h-10 w-full bg-purple-600 hover:bg-purple-500 text-white font-worksans text-[0.6rem] tracking-[0.14em] uppercase rounded-xl transition-colors duration-200 flex items-center justify-center gap-1.5"
                    >
                      <Bell className="h-3 w-3 shrink-0" />
                      Subscribe
                    </button>
                  </form>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-2">
                <Link
                  href="/music"
                  onClick={close}
                  className="w-full h-10 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-[#07060f] font-bricolage font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <Music className="h-3.5 w-3.5 shrink-0" />
                  Listen Now
                </Link>
                <button
                  onClick={close}
                  className="w-full h-10 border border-white/[0.1] hover:border-white/[0.25] text-neutral-400 hover:text-white font-worksans text-[0.6rem] tracking-[0.12em] uppercase rounded-xl flex items-center justify-center gap-1.5 transition-all duration-200"
                >
                  Explore the Site
                  <ArrowRight className="h-3 w-3 shrink-0" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
