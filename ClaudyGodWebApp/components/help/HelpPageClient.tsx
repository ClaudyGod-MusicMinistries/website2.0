'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Search,
  Music,
  Calendar,
  ShoppingCart,
  Users,
  Heart,
  Mail,
  Phone,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { useFAQs } from '@/hooks/useFAQs';
import { PageHero } from '@/components/shared/PageHero';
import { cn } from '@/lib/utils/cn';

const ICON_MAP: Record<string, React.ReactNode> = {
  'Music & Albums': <Music className="h-5 w-5" />,
  'Events & Attendance': <Calendar className="h-5 w-5" />,
  'Bookings & Services': <Calendar className="h-5 w-5" />,
  'Store & Purchases': <ShoppingCart className="h-5 w-5" />,
  Volunteering: <Users className="h-5 w-5" />,
  'Support & Donations': <Heart className="h-5 w-5" />,
  'Technical Support': <Mail className="h-5 w-5" />,
};

export function HelpPageClient() {
  const { faqs, loading, error } = useFAQs();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const categories =
    faqs.length > 0 ? ['All', ...Array.from(new Set(faqs.map((f) => f.category)))] : ['All'];

  const filtered = faqs.filter((faq) => {
    const matchCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <main>
      <PageHero
        eyebrow="Support"
        title="Help & FAQ"
        subtitle="Find answers to common questions about our music, events, bookings, store, and support."
      />

      {/* Content Section */}
      <section className="bg-white section-py">
        <div className="container-site max-w-4xl mx-auto">
          {/* Search */}
          <div className="relative max-w-2xl mx-auto mb-10 sm:mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-6 bg-cream-100 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 rounded-xl font-sans text-sm focus:outline-none focus:border-purple-400 transition-colors duration-300"
            />
          </div>
          {/* Category Filter */}
          {!loading && (
            <div className="mb-10">
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      'px-5 py-2.5 rounded-xl font-sans text-[0.65rem] tracking-[0.12em] uppercase transition-all duration-300',
                      activeCategory === cat
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-8 w-8 text-purple-600 animate-spin mb-4" />
              <p className="font-sans text-neutral-600">Loading FAQs...</p>
            </div>
          )}

          {/* Error State — only when there's truly nothing to show; `error`
              alone doesn't hide the list since useFAQs falls back to real
              curated answers on a failed fetch (see data/fallback.ts). */}
          {!loading && error && faqs.length === 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
              <p className="font-sans text-red-700">{error}</p>
            </div>
          )}

          {/* FAQ List */}
          {!loading && faqs.length > 0 && (
            <div className="space-y-3">
              <AnimatePresence mode="wait">
                {filtered.length > 0 ? (
                  filtered.map((faq, idx) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="border border-neutral-200 rounded-xl overflow-hidden hover:border-purple-300 transition-colors duration-300"
                    >
                      <button
                        onClick={() => toggleExpand(faq.id)}
                        className="w-full px-6 py-5 flex items-center gap-4 hover:bg-neutral-50 transition-colors duration-300"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                          {ICON_MAP[faq.category] || <Mail className="h-5 w-5" />}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-display font-semibold text-neutral-900 text-sm leading-snug">
                            {faq.question}
                          </p>
                          <p className="font-sans text-[0.58rem] tracking-[0.08em] uppercase text-neutral-500 mt-1">
                            {faq.category}
                          </p>
                        </div>
                        <ChevronDown
                          className={cn(
                            'h-5 w-5 text-neutral-400 transition-transform duration-300 shrink-0',
                            expanded === faq.id && 'rotate-180'
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {expanded === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 py-5 border-t border-neutral-100 bg-neutral-50">
                              <p className="font-sans text-neutral-700 text-sm leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <p className="font-sans text-neutral-500">
                      No FAQs match your search. Try different keywords.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Contact / Support Section */}
      <section className="bg-cream-100 section-py border-t border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-raleway font-light text-neutral-900 text-3xl md:text-4xl tracking-normal mb-4">
              Didn&apos;t Find Your Answer?
            </h2>
            <p className="font-sans text-neutral-600 text-lg">
              Our team is here to help. Reach out through multiple channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Technical Support — direct email, not routed through the
                general contact form, since a site bug/error needs someone
                who can actually act on it. */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-display font-bold text-neutral-900 mb-2">Technical Support</h3>
              <p className="font-sans text-neutral-600 text-sm mb-5">
                Found a bug or something not working right on the site? Email it directly.
              </p>
              <a
                href="mailto:peter4tech@gmail.com"
                className="inline-flex items-center gap-2 font-sans text-[0.65rem] tracking-[0.14em] uppercase text-purple-600 hover:text-purple-700 font-semibold"
              >
                peter4tech@gmail.com <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Live Chat */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <MessageCircleIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-display font-bold text-neutral-900 mb-2">AI Assistant</h3>
              <p className="font-sans text-neutral-600 text-sm mb-5">
                Chat with our AI assistant for instant answers. Available 24/7 at bottom right.
              </p>
              <button
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center gap-2 font-sans text-[0.65rem] tracking-[0.14em] uppercase text-purple-600 hover:text-purple-700 font-semibold"
              >
                Open Chat <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* General Inquiries */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-display font-bold text-neutral-900 mb-2">General Inquiries</h3>
              <p className="font-sans text-neutral-600 text-sm mb-5">
                Bookings, partnerships, or anything else — reach the team directly.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-sans text-[0.65rem] tracking-[0.14em] uppercase text-purple-600 hover:text-purple-700 font-semibold"
              >
                Get in Touch <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function MessageCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
