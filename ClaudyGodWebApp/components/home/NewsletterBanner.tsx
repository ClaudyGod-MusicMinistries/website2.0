'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Mail, Music, Bell, Users, X } from 'lucide-react';
import { post, BackendError } from '@/lib/data/client';
import { buttonVariants } from '@/lib/theme/buttons';
import { AmbientGlow } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { ErrorModal } from '@/components/ui/ErrorModal';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { darkFormControlClass, FormError } from '@/components/ui/FormField';

interface NewsletterInput {
  name: string;
  email: string;
}

const benefits = [
  { icon: Music, text: 'New worship songs & releases' },
  { icon: Bell, text: 'Event invitations & tour dates' },
  { icon: Users, text: 'Ministry updates & teachings' },
];

export function NewsletterBanner() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { error, handleApiError, closeError } = useErrorHandler();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>();

  const onSubmit = async (data: NewsletterInput) => {
    try {
      await post('/subscribers', { name: data.name, email: data.email });
      setStatus('success');
      reset();
    } catch (err) {
      if (err instanceof BackendError && Object.keys(err.fieldErrors).length > 0) {
        Object.entries(err.fieldErrors).forEach(([field, messages]) => {
          setError(field as keyof NewsletterInput, { message: messages[0] });
        });
      } else {
        handleApiError(err, 'Unable to Subscribe');
      }
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-surface-raised">
        {/* Purple radial glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AmbientGlow
            color="purple"
            size={600}
            opacity={0.18}
            animate={false}
            className="-top-[300px] -right-[300px]"
          />
          <AmbientGlow
            color="gold"
            size={400}
            opacity={0.08}
            animate={false}
            className="-bottom-[200px] -left-[200px]"
          />
        </div>

        {/* Top accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

        <div className="container-site py-12 sm:py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">
            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="block w-8 h-px bg-gold-500 opacity-70" />
                <span className="label-eyebrow">Stay Connected</span>
              </div>

              <h2 className="font-raleway font-light text-white text-2xl sm:text-3xl md:text-4xl leading-[1.08] tracking-normal mb-3 sm:mb-5">
                Join the Ministry
                <br />
                <span className="text-purple-300">Community.</span>
              </h2>

              <p className="font-sans text-neutral-400 text-sm sm:text-base leading-relaxed mb-5 sm:mb-8 max-w-sm">
                Straight to your inbox — no noise, no spam. Just worship, ministry, and the love of
                God.
              </p>

              <ul className="space-y-3 sm:space-y-3.5">
                {benefits.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-600/20 border border-purple-500/20 flex items-center justify-center">
                      <Icon className="h-3 w-3 text-purple-400" />
                    </span>
                    <span className="font-sans text-neutral-400 text-sm">{text}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 font-sans text-xs text-neutral-500">
                Unsubscribe at any time. We respect your inbox.
              </p>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full lg:pl-8 lg:border-l lg:border-white/[0.06]"
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
                      <p className="font-display font-bold text-white text-xl mb-1">
                        You&apos;re in. Welcome!
                      </p>
                      <p className="font-sans text-neutral-500 text-sm leading-relaxed">
                        Thank you for joining the ministry community. Expect worship, updates, and
                        encouragement in your inbox.
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
                        <p className="font-display font-semibold text-white text-base">
                          Subscribe to the newsletter
                        </p>
                        <p className="font-sans text-xs text-neutral-500 mt-0.5">
                          Free · No spam · Cancel anytime
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
                      <div>
                        <input
                          {...register('name', {
                            required: 'Enter your name.',
                            minLength: { value: 2, message: 'Use at least 2 characters.' },
                            maxLength: {
                              value: 100,
                              message: 'Keep your name under 100 characters.',
                            },
                          })}
                          type="text"
                          placeholder="Your name"
                          className={darkFormControlClass}
                        />
                        <FormError message={errors.name?.message} tone="dark" />
                      </div>
                      <div>
                        <input
                          {...register('email', {
                            required: 'Enter an email address.',
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: 'Enter a valid email address.',
                            },
                          })}
                          type="email"
                          placeholder="your@email.com"
                          className={darkFormControlClass}
                        />
                        <FormError message={errors.email?.message} tone="dark" />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                          buttonVariants({
                            variant: 'secondary',
                            size: 'lg',
                            fullWidth: true,
                            uppercase: true,
                          }),
                          'h-12 group whitespace-nowrap'
                        )}
                      >
                        {isSubmitting ? (
                          'Subscribing…'
                        ) : (
                          <>
                            Subscribe
                            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                              →
                            </span>
                          </>
                        )}
                      </button>
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

      {/* Success modal */}
      <AnimatePresence>
        {status === 'success' && (
          <>
            <motion.div
              key="nl-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-sm"
              onClick={() => setStatus('idle')}
              aria-hidden="true"
            />
            <motion.div
              key="nl-modal"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Subscription confirmed"
              className="fixed inset-0 z-[301] flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-sm bg-surface-raised border border-white/[0.09] rounded-xl shadow-popup overflow-hidden">
                {/* Gold top bar */}
                <div className="h-1 bg-gradient-to-r from-gold-500/60 via-gold-400 to-gold-500/60" />

                <div className="p-7 text-center">
                  {/* Animated check */}
                  <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/25 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="h-8 w-8 text-gold-400" aria-hidden="true" />
                  </div>

                  <h3 className="font-display font-bold text-white text-xl mb-2">
                    You&apos;re in. Welcome!
                  </h3>
                  <p className="font-sans text-neutral-400 text-sm leading-relaxed mb-6">
                    Thank you for joining the ministry community. Expect worship, updates, and
                    encouragement straight to your inbox.
                  </p>

                  <button
                    onClick={() => setStatus('idle')}
                    className="w-full h-11 bg-purple-600 hover:bg-purple-500 text-white font-sans text-[0.68rem] tracking-[0.18em] uppercase rounded-xl transition-colors duration-200"
                  >
                    Continue
                  </button>
                </div>

                <button
                  onClick={() => setStatus('idle')}
                  aria-label="Close"
                  className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-neutral-500 hover:text-white transition-all duration-200"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ErrorModal
        isOpen={error?.isOpen ?? false}
        title={error?.title}
        message={error?.message ?? ''}
        onClose={closeError}
      />
    </>
  );
}
