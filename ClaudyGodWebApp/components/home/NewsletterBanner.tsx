'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Mail, Music, Bell, Users, X } from 'lucide-react';
import { post, BackendError } from '@/lib/data/client';
import { Button } from '@/components/ui/Button';
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
      <section className="relative overflow-hidden bg-white py-16 sm:py-24 border-t border-neutral-200/70">
        <div className="container-site relative">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-gold-300/40 shadow-card-light-lg p-7 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">
              {/* Left — copy */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full"
              >
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <span className="h-px w-6 bg-gold-500" />
                  <span className="label-eyebrow text-gold-700 font-semibold">Stay Connected</span>
                </div>

                <h2 className="font-raleway font-light text-neutral-900 text-3xl sm:text-4xl md:text-5xl leading-[1.12] tracking-tight mb-4">
                  Join the Ministry
                  <br />
                  <span className="font-medium text-purple-900">Community.</span>
                </h2>

                <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-md">
                  Receive inspirational worship, direct event invites, and ministry updates straight
                  to your inbox.
                </p>

                <ul className="space-y-3 sm:space-y-3.5">
                  {benefits.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-50 border border-purple-200/60 flex items-center justify-center text-purple-700">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="font-sans text-neutral-700 text-sm font-medium">{text}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 font-sans text-xs text-neutral-400">
                  We respect your privacy. Unsubscribe at any time with one click.
                </p>
              </motion.div>

              {/* Right — form */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full lg:pl-10 lg:border-l lg:border-neutral-100"
              >
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col gap-4 py-4"
                    >
                      <div className="w-13 h-13 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-700">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-neutral-900 text-xl mb-1">
                          You&apos;re subscribed!
                        </p>
                        <p className="font-sans text-neutral-600 text-sm leading-relaxed">
                          Welcome to the ministry family. Anointed worship and timely updates are on
                          their way.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-purple-50 border border-purple-200/60 flex items-center justify-center text-purple-700">
                          <Mail className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-display font-semibold text-neutral-900 text-base">
                            Subscribe to the Newsletter
                          </p>
                          <p className="font-sans text-xs text-neutral-500 mt-0.5">
                            Free &bull; No spam &bull; Cancel anytime
                          </p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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
                            placeholder="Your full name"
                            className="w-full px-5 py-3 rounded-full border border-neutral-200 bg-neutral-50/60 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 focus:bg-white text-sm transition-all"
                          />
                          <FormError message={errors.name?.message} />
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
                            placeholder="your.email@example.com"
                            className="w-full px-5 py-3 rounded-full border border-neutral-200 bg-neutral-50/60 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 focus:bg-white text-sm transition-all"
                          />
                          <FormError message={errors.email?.message} />
                        </div>

                        {/* Modern sleek button — never forces full-screen stretch on mobile */}
                        <div className="pt-2">
                          <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            uppercase
                            isLoading={isSubmitting}
                            rightIcon={<CheckCircle2 className="h-4 w-4" />}
                          >
                            Join Community
                          </Button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
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
              className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm"
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
              <div className="relative w-full max-w-sm bg-white border border-neutral-200/90 rounded-2xl shadow-xl overflow-hidden">
                {/* Gold top bar */}
                <div className="h-1 bg-gradient-to-r from-gold-500/60 via-gold-400 to-gold-500/60" />

                <div className="p-7 text-center">
                  {/* Animated check */}
                  <div className="w-16 h-16 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="h-8 w-8 text-gold-600" aria-hidden="true" />
                  </div>

                  <h3 className="font-display font-bold text-neutral-900 text-xl mb-2">
                    You&apos;re in. Welcome!
                  </h3>
                  <p className="font-sans text-neutral-600 text-sm leading-relaxed mb-6">
                    Thank you for joining the ministry community. Expect worship, updates, and
                    encouragement straight to your inbox.
                  </p>

                  <Button
                    onClick={() => setStatus('idle')}
                    variant="secondary"
                    size="md"
                    uppercase
                    fullWidth
                  >
                    Continue
                  </Button>
                </div>

                <button
                  onClick={() => setStatus('idle')}
                  aria-label="Close"
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-all duration-200"
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
