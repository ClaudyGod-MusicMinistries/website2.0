'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Music, Calendar, ShoppingCart, Users, Heart, Mail, Phone, ExternalLink, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  'Music & Albums': <Music className="h-5 w-5" />,
  'Events & Attendance': <Calendar className="h-5 w-5" />,
  'Bookings & Services': <Calendar className="h-5 w-5" />,
  'Store & Purchases': <ShoppingCart className="h-5 w-5" />,
  'Volunteering': <Users className="h-5 w-5" />,
  'Support & Donations': <Heart className="h-5 w-5" />,
  'Technical Support': <Mail className="h-5 w-5" />,
};

export function HelpPageClient() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/faqs');

        if (!response.ok) {
          throw new Error('Failed to fetch FAQs');
        }

        const data = await response.json();

        // Handle both ApiResponse and direct array formats
        const faqList = data.data || data;
        setFaqs(Array.isArray(faqList) ? faqList : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError('Failed to load FAQs. Please try again later.');
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const categories = faqs.length > 0
    ? ['All', ...Array.from(new Set(faqs.map(f => f.category)))]
    : ['All'];

  const filtered = faqs.filter(faq => {
    const matchCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-neutral-900 via-purple-900/40 to-neutral-900/80 pt-32 pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="font-bricolage font-bold text-white text-4xl md:text-5xl tracking-tight mb-4">
            Help & FAQ
          </h1>
          <p className="font-roboto text-neutral-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Find answers to common questions about our music, events, bookings, store, and support.
          </p>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/10 border border-white/20 text-white placeholder:text-neutral-400 rounded-xl focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        {/* Category Filter */}
        {!loading && (
          <div className="mb-10">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-5 py-2.5 rounded-xl font-worksans text-[0.65rem] tracking-[0.12em] uppercase transition-all duration-300',
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
            <p className="font-roboto text-neutral-600">Loading FAQs...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <p className="font-roboto text-red-700">{error}</p>
          </div>
        )}

        {/* FAQ List */}
        {!loading && !error && (
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
                        <p className="font-bricolage font-semibold text-neutral-900 text-sm leading-snug">
                          {faq.question}
                        </p>
                        <p className="font-worksans text-[0.58rem] tracking-[0.08em] uppercase text-neutral-500 mt-1">
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
                            <p className="font-roboto text-neutral-700 text-sm leading-relaxed">
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
                  <p className="font-roboto text-neutral-500">
                    No FAQs match your search. Try different keywords.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Contact / Support Section */}
      <section className="bg-gradient-to-r from-purple-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-12 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bricolage font-bold text-neutral-900 text-3xl md:text-4xl tracking-tight mb-4">
              Didn't Find Your Answer?
            </h2>
            <p className="font-roboto text-neutral-600 text-lg">
              Our team is here to help. Reach out through multiple channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bricolage font-bold text-neutral-900 mb-2">Email Support</h3>
              <p className="font-roboto text-neutral-600 text-sm mb-5">
                Send us a detailed message and we'll respond within 24-48 hours.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-worksans text-[0.65rem] tracking-[0.14em] uppercase text-purple-600 hover:text-purple-700 font-semibold"
              >
                Contact Us <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Live Chat */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <MessageCircleIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bricolage font-bold text-neutral-900 mb-2">AI Assistant</h3>
              <p className="font-roboto text-neutral-600 text-sm mb-5">
                Chat with our AI assistant for instant answers. Available 24/7 at bottom right.
              </p>
              <button
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center gap-2 font-worksans text-[0.65rem] tracking-[0.14em] uppercase text-blue-600 hover:text-blue-700 font-semibold"
              >
                Open Chat <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bricolage font-bold text-neutral-900 mb-2">Quick Contact</h3>
              <p className="font-roboto text-neutral-600 text-sm mb-5">
                For urgent matters, reach out through our main contact page.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-worksans text-[0.65rem] tracking-[0.14em] uppercase text-green-600 hover:text-green-700 font-semibold"
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
