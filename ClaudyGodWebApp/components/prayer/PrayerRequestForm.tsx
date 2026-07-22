'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { post, BackendError } from '@/lib/data/client';
import { ErrorModal } from '@/components/ui/ErrorModal';
import { SuccessModal } from '@/components/ui/SuccessModal';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { getUserFriendlyError } from '@/lib/utils/errorMessages';
import type { SubmitPrayerRequestRequest } from '@/types/api';

interface PrayerRequestFormData {
  name: string;
  email: string;
  subject: string;
  requestText: string;
  isConfidential: boolean;
}

export function PrayerRequestForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { error, showError, closeError } = useErrorHandler();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<PrayerRequestFormData>({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      requestText: '',
      isConfidential: false,
    },
  });

  const onSubmit = async (data: PrayerRequestFormData) => {
    try {
      const payload: SubmitPrayerRequestRequest = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        requestText: data.requestText,
        isConfidential: data.isConfidential,
      };
      await post('/prayer-requests', payload);
      setShowSuccess(true);
      reset();
    } catch (err) {
      if (err instanceof BackendError) {
        if (Object.keys(err.fieldErrors).length > 0) {
          Object.entries(err.fieldErrors).forEach(([field, messages]) => {
            setError(field as keyof PrayerRequestFormData, { message: messages[0] });
          });
          showError('Please Check Your Information', 'We found some issues with your request. Please review and try again.');
        } else {
          showError('Unable to Submit Request', getUserFriendlyError(err));
        }
      } else {
        showError('Connection Problem', getUserFriendlyError(err));
      }
    }
  };

  const inputClass =
    'w-full h-12 px-4 bg-white border text-neutral-900 placeholder:text-neutral-400 font-sans text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all duration-200 rounded-xl';

  const textareaClass =
    'w-full px-4 py-3 bg-white border text-neutral-900 placeholder:text-neutral-400 font-sans text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all duration-200 resize-none rounded-xl';

  return (
    <>
      <SuccessModal
        isOpen={showSuccess}
        title="Prayer Request Received!"
        message="Thank you for reaching out. Our prayer team will intercede for you, and you'll receive a confirmation by email."
        onClose={() => setShowSuccess(false)}
        autoClose={0}
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-display font-semibold text-neutral-800 text-sm block mb-2">
              Name <span className="text-purple-500">*</span>
            </label>
            <input
              {...register('name', {
                required: 'Name is required',
                maxLength: { value: 100, message: 'Must be under 100 characters' },
              })}
              type="text"
              placeholder="Jane Doe"
              className={`${inputClass} ${errors.name ? 'border-red-400 bg-red-50' : 'border-neutral-200'}`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="font-display font-semibold text-neutral-800 text-sm block mb-2">
              Email <span className="text-purple-500">*</span>
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email',
                },
              })}
              type="email"
              placeholder="jane@example.com"
              className={`${inputClass} ${errors.email ? 'border-red-400 bg-red-50' : 'border-neutral-200'}`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <label className="font-display font-semibold text-neutral-800 text-sm block mb-2">
            Subject <span className="text-purple-500">*</span>
          </label>
          <input
            {...register('subject', {
              required: 'Subject is required',
              maxLength: { value: 300, message: 'Must be under 300 characters' },
            })}
            type="text"
            placeholder="E.g., Healing, Guidance, Thanksgiving"
            className={`${inputClass} ${errors.subject ? 'border-red-400 bg-red-50' : 'border-neutral-200'}`}
          />
          {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
        </div>

        <div>
          <label className="font-display font-semibold text-neutral-800 text-sm block mb-2">
            Your Prayer Request <span className="text-purple-500">*</span>
          </label>
          <textarea
            {...register('requestText', {
              required: 'Please share your prayer request',
              maxLength: { value: 5000, message: 'Must be under 5000 characters' },
            })}
            rows={6}
            placeholder="Share what's on your heart. Our prayer team will hold this in confidence and intercede for you..."
            className={`${textareaClass} ${errors.requestText ? 'border-red-400 bg-red-50' : 'border-neutral-200'}`}
          />
          {errors.requestText && <p className="mt-1 text-sm text-red-500">{errors.requestText.message}</p>}
        </div>

        <div className="flex items-start gap-3">
          <input
            {...register('isConfidential')}
            type="checkbox"
            id="isConfidential"
            className="mt-1 w-4 h-4 rounded border-neutral-300 text-purple-600 cursor-pointer"
          />
          <label htmlFor="isConfidential" className="text-sm text-neutral-700">
            Keep this request confidential — only share it with the prayer team, not the wider congregation.
          </label>
        </div>

        <ErrorModal
          isOpen={error?.isOpen ?? false}
          title={error?.title}
          message={error?.message ?? ''}
          onClose={closeError}
          actions={[{ label: 'Edit Request', onClick: closeError, variant: 'primary' }]}
        />

        <button
          type="submit"
          disabled={isSubmitting || isValidating || Object.keys(errors).length > 0}
          className="w-full h-12 px-8 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-300 disabled:cursor-not-allowed text-white font-display font-bold text-sm rounded-xl transition-all duration-200 shadow-[0_4px_14px_rgba(97,73,145,0.35)]"
        >
          {isSubmitting ? 'Submitting Request…' : 'Submit Prayer Request'}
        </button>
      </form>
    </>
  );
}
