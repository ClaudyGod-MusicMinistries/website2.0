'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { BackendError, post } from '@/lib/data/client';
import { ErrorModal } from '@/components/ui/ErrorModal';
import { SuccessModal } from '@/components/ui/SuccessModal';
import {
  FormError,
  FormField,
  FormGrid,
  FormLabel,
  controlClass,
  textareaClass,
} from '@/components/ui/FormField';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { getUserFriendlyError } from '@/lib/utils/errorMessages';

interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { error, showError, closeError } = useErrorHandler();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    mode: 'onTouched',
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = async (data: ContactInput) => {
    try {
      await post('/contacts', {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        message: data.message.trim(),
      });
      reset();
      setShowSuccess(true);
    } catch (caught) {
      if (caught instanceof BackendError && Object.keys(caught.fieldErrors).length) {
        Object.entries(caught.fieldErrors).forEach(([field, messages]) =>
          setError(field as keyof ContactInput, { message: messages[0] })
        );
        showError('Review your information', 'Correct the highlighted details and try again.');
      } else showError('Unable to send message', getUserFriendlyError(caught));
    }
  };

  return (
    <>
      <SuccessModal
        isOpen={showSuccess}
        title="Message received"
        message="Thank you. Our team will respond as soon as possible."
        onClose={() => setShowSuccess(false)}
        autoClose={5000}
      />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <FormGrid>
          <FormField>
            <FormLabel>Full name</FormLabel>
            <input
              {...register('name', {
                required: 'Enter your full name.',
                minLength: { value: 2, message: 'Use at least 2 characters.' },
                maxLength: { value: 100, message: 'Keep your name under 100 characters.' },
              })}
              autoComplete="name"
              className={controlClass(errors.name)}
              placeholder="Full name"
            />
            <FormError message={errors.name?.message} />
          </FormField>
          <FormField>
            <FormLabel>Email address</FormLabel>
            <input
              {...register('email', {
                required: 'Enter an email address.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address.',
                },
              })}
              type="email"
              autoComplete="email"
              className={controlClass(errors.email)}
              placeholder="name@example.com"
            />
            <FormError message={errors.email?.message} />
          </FormField>
        </FormGrid>
        <FormField>
          <FormLabel>Message</FormLabel>
          <textarea
            {...register('message', {
              required: 'Enter your message.',
              minLength: { value: 10, message: 'Use at least 10 characters.' },
              maxLength: { value: 2000, message: 'Keep your message under 2,000 characters.' },
            })}
            rows={5}
            className={textareaClass(errors.message)}
            placeholder="How can we help?"
          />
          <FormError message={errors.message?.message} />
        </FormField>
        <ErrorModal
          isOpen={error?.isOpen ?? false}
          title={error?.title}
          message={error?.message ?? ''}
          onClose={closeError}
          actions={[{ label: 'Review message', onClick: closeError, variant: 'primary' }]}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-purple-700 px-6 text-sm font-semibold text-white shadow-purple-cta transition hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Sending…' : 'Send message'}
        </button>
      </form>
    </>
  );
}
