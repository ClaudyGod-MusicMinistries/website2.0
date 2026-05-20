'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { newsletterSchema, type NewsletterInput } from '@/utils/validators';
import { Section, Container } from '@/components/ui/Layout';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

export function NewsletterBanner() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = async (data: NewsletterInput) => {
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <Section
      bg="base"
      py="lg"
      className="bg-gradient-to-r from-surface-base via-surface-elevated to-surface-base border-y border-gold-500/20"
    >
      <Container>
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
          <div>
            <span className="font-worksans uppercase tracking-widest text-gold-400 text-xs">
              Stay Connected
            </span>
            <Heading level={2} className="mt-2">
              Join the Ministry Community
            </Heading>
            <Text color="muted" className="mt-3">
              Get worship songs, ministry updates, and event invitations delivered to your inbox.
            </Text>
          </div>

          {status === 'success' ? (
            <div className="flex items-center justify-center gap-2 text-status-success bg-status-successBg border border-status-success/30 rounded-xl px-6 py-4">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <Text size="sm" color="success">
                You&apos;re subscribed! Thank you for joining us.
              </Text>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full h-11 px-4 rounded-lg bg-surface-elevated border border-surface-border text-white placeholder:text-neutral-500 text-sm font-bricolage focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-status-error text-left">{errors.email.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="shrink-0"
                >
                  {isSubmitting ? <Spinner size="sm" /> : 'Subscribe'}
                </Button>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 mt-3 text-status-error">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <Text size="xs" color="error">
                    Something went wrong. Please try again.
                  </Text>
                </div>
              )}
            </form>
          )}

          <Text size="xs" color="dim">
            No spam, ever. Unsubscribe at any time.
          </Text>
        </div>
      </Container>
    </Section>
  );
}
