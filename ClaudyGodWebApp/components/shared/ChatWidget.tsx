'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, X, Music2, CalendarDays, Heart, Mail,
  ChevronRight, ChevronDown, Phone, ExternalLink,
} from 'lucide-react';
import { cn } from '@/utils/cn';

// ─── Data ────────────────────────────────────────────────────────────────────

const quickLinks = [
  { icon: Music2,      label: 'Listen to Music',   href: '/music',    color: 'text-purple-400' },
  { icon: CalendarDays,label: 'Book ClaudyGod',     href: '/bookings', color: 'text-gold-400'   },
  { icon: Heart,       label: 'Support & Donate',   href: '/donate',   color: 'text-red-400'    },
  { icon: Mail,        label: 'Contact Us',         href: '/contact',  color: 'text-blue-400'   },
];

const faqs = [
  {
    q: 'How do I book ClaudyGod for an event?',
    a: 'Visit our Bookings page to fill out a request form. Our team reviews all requests and will respond within 3–5 business days.',
  },
  {
    q: 'Where can I stream the latest music?',
    a: 'The latest album "Very Glorious" is available on Spotify, Apple Music, YouTube, Deezer, Amazon Music and more.',
  },
  {
    q: 'How can I support the ministry financially?',
    a: 'You can make a secure donation on our Donate page. We accept cards, bank transfer, and mobile money via Paystack.',
  },
  {
    q: 'How do I volunteer with the ministry?',
    a: 'We\'d love to have you! Visit our Ministry page and fill out the Volunteer Interest form.',
  },
  {
    q: 'How do I get the ClaudyGod mobile app?',
    a: 'Search "ClaudyGod" on the App Store or Google Play. The app gives you access to music, devotionals and live events.',
  },
];

// ─── Panel animation ──────────────────────────────────────────────────────────

const panel = {
  hidden:  { opacity: 0, y: 16, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: 12, scale: 0.97, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};

// ─── FAQ item ─────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-3 py-3.5 text-left"
      >
        <span className="font-bricolage font-semibold text-white/85 text-xs leading-snug flex-1">
          {q}
        </span>
        <ChevronDown className={cn('h-3.5 w-3.5 text-neutral-500 shrink-0 mt-0.5 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.25 } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
            className="overflow-hidden"
          >
            <p className="font-raleway text-neutral-400 text-xs leading-relaxed pb-3.5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ChatWidget() {
  const [open, setOpen]         = useState(false);
  const [unread, setUnread]     = useState(1);
  const panelRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => {
    setOpen((o) => !o);
    setUnread(0);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <div ref={panelRef} className="fixed bottom-6 right-6 z-[180] flex flex-col items-end gap-3">

      {/* ── Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-[340px] max-h-[580px] bg-[#0d0b1a] border border-white/[0.08] rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.55)] overflow-hidden flex flex-col"
            role="dialog"
            aria-label="Quick help panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07] bg-gradient-to-r from-purple-700/80 to-purple-800/80">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-bricolage font-bold text-white text-sm leading-tight">Quick Help</p>
                  <p className="font-worksans text-[0.48rem] tracking-[0.16em] uppercase text-purple-200 mt-0.5">ClaudyGod Ministry</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5 text-white/70" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 scrollbar-thin">

              {/* Quick links */}
              <div className="px-4 pt-4 pb-3">
                <p className="font-worksans text-[0.52rem] tracking-[0.18em] uppercase text-neutral-500 mb-3">
                  Quick Navigation
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickLinks.map(({ icon: Icon, label, href, color }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.05] hover:border-purple-500/30 transition-all duration-200 group"
                    >
                      <Icon className={cn('h-4 w-4 shrink-0', color)} />
                      <span className="font-bricolage font-semibold text-white/80 group-hover:text-white text-xs leading-tight transition-colors">
                        {label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="mx-4 h-px bg-white/[0.06]" />

              {/* FAQ */}
              <div className="px-4 pt-3 pb-2">
                <p className="font-worksans text-[0.52rem] tracking-[0.18em] uppercase text-neutral-500 mb-2">
                  Frequently Asked
                </p>
                {faqs.map((f) => (
                  <FaqItem key={f.q} q={f.q} a={f.a} />
                ))}
              </div>

              {/* Divider */}
              <div className="mx-4 h-px bg-white/[0.06]" />

              {/* Contact options */}
              <div className="px-4 py-4 flex gap-2">
                <a
                  href="mailto:info@claudygod.com"
                  className="flex-1 flex items-center justify-center gap-2 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.07] text-neutral-400 hover:text-white transition-all duration-200"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span className="font-worksans text-[0.52rem] tracking-[0.1em] uppercase">Email</span>
                </a>
                <a
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 h-9 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/25 text-purple-300 hover:text-white transition-all duration-200"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="font-worksans text-[0.52rem] tracking-[0.1em] uppercase">Contact Page</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB ── */}
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 shadow-[0_4px_24px_rgba(109,40,217,0.55)] hover:shadow-[0_6px_32px_rgba(109,40,217,0.65)] flex items-center justify-center transition-shadow duration-300"
        aria-label="Open quick help"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="h-6 w-6 text-white" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="h-6 w-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        {unread > 0 && !open && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-[#0d0b1a] flex items-center justify-center font-bricolage font-bold text-white text-[0.5rem]"
          >
            {unread}
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}
