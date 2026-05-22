'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { newsletterSchema, type NewsletterInput } from '@/utils/validators';
import { post } from '@/utils/apiClient';

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
    <section className="bg-[#0a0a0a] section-py border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="rule-gold" />
            <span className="label-eyebrow">Stay Connected</span>
          </div>

          <h2 className="font-raleway font-extralight text-white text-3xl md:text-4xl tracking-tight leading-snug mb-4">
            Join the Ministry Community
          </h2>
          <p className="font-raleway text-neutral-500 text-sm leading-relaxed mb-8 font-light">
            Worship songs, ministry updates, and event invitations — straight to your inbox.
            No noise. Unsubscribe anytime.
          </p>

          {status === 'success' ? (
            <div className="flex items-center gap-3 text-gold-400">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span className="font-worksans text-[0.65rem] tracking-[0.15em] uppercase">
                You&apos;re subscribed — thank you.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="flex gap-0">
                <div className="flex-1">
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full h-11 px-4 bg-transparent border border-white/10 border-r-0 text-white placeholder:text-neutral-700 font-raleway text-sm font-light focus:outline-none focus:border-gold-500/40 transition-colors duration-300"
                  />
                  {errors.email && (
                    <p className="mt-1.5 font-worksans text-[0.58rem] tracking-[0.1em] uppercase text-red-400/80">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="shrink-0 h-11 px-6 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-worksans text-[0.6rem] tracking-[0.2em] uppercase transition-all duration-300"
                >
                  {isSubmitting ? '…' : 'Subscribe'}
                </button>
              </div>
              {status === 'error' && (
                <p className="mt-2 font-worksans text-[0.58rem] tracking-[0.1em] uppercase text-red-400/80">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
