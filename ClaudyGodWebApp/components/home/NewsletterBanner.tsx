'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Mail, Music, Bell, Users } from 'lucide-react';
import { newsletterSchema, type NewsletterInput } from '@/utils/validators';
import { post } from '@/utils/apiClient';

const benefits = [
  { icon: Music,  text: 'New worship songs & releases' },
  { icon: Bell,   text: 'Event invitations & tour dates' },
  { icon: Users,  text: 'Ministry updates & teachings' },
];

export function NewsletterBanner() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = async (data: NewsletterInput) => {
    try {
      await post('/newsletter', data);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0c0a1a]">
      {/* Purple radial glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.18)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,168,76,0.08)_0%,transparent_65%)] pointer-events-none" />

      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="block w-8 h-px bg-gold-500 opacity-70" />
              <span className="label-eyebrow">Stay Connected</span>
            </div>

            <h2 className="font-raleway font-medium text-white text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.12] tracking-tight mb-5">
              Join the Ministry<br />
              <span className="text-purple-300">Community.</span>
            </h2>

            <p className="font-raleway text-neutral-400 text-base leading-relaxed mb-8 max-w-sm">
              Straight to your inbox — no noise, no spam. Just worship, ministry, and the love of God.
            </p>

            <ul className="space-y-3.5">
              {benefits.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-600/20 border border-purple-500/20 flex items-center justify-center">
                    <Icon className="h-3 w-3 text-purple-400" />
                  </span>
                  <span className="font-raleway text-neutral-400 text-sm">{text}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 font-worksans text-[0.5rem] tracking-[0.15em] uppercase text-neutral-700">
              Unsubscribe at any time. We respect your inbox.
            </p>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:pl-8 lg:border-l lg:border-white/[0.06]"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-5 py-4"
                >
                  <div className="w-14 h-14 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-gold-400" />
                  </div>
                  <div>
                    <p className="font-raleway font-medium text-white text-xl mb-1">
                      You&apos;re in. Welcome!
                    </p>
                    <p className="font-raleway text-neutral-500 text-sm leading-relaxed">
                      Thank you for joining the ministry community. Expect worship, updates, and encouragement in your inbox.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-purple-600/15 border border-purple-500/20 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-raleway font-normal text-white text-base">Subscribe to the newsletter</p>
                      <p className="font-worksans text-[0.48rem] tracking-[0.12em] uppercase text-neutral-600 mt-0.5">Free · No spam · Cancel anytime</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
                    <div>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="your@email.com"
                        className="w-full h-12 px-4 bg-white/[0.04] border border-white/10 text-white placeholder:text-neutral-600 font-raleway text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.06] transition-all duration-300"
                      />
                      {errors.email && (
                        <p className="mt-1.5 font-worksans text-[0.52rem] tracking-[0.1em] uppercase text-red-400/80">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-worksans text-[0.62rem] tracking-[0.22em] uppercase transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      {isSubmitting ? (
                        'Subscribing…'
                      ) : (
                        <>
                          Subscribe
                          <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                        </>
                      )}
                    </button>

                    {status === 'error' && (
                      <p className="font-worksans text-[0.52rem] tracking-[0.1em] uppercase text-red-400/80">
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
    </section>
  );
}
