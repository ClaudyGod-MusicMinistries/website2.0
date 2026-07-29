'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { post, BackendError } from '@/lib/data/client';
import { ErrorModal } from '@/components/ui/ErrorModal';
import { SuccessModal } from '@/components/ui/SuccessModal';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { getUserFriendlyError } from '@/lib/utils/errorMessages';
import { buttonVariants } from '@/lib/theme/buttons';
import type { SubmitPrayerRequestRequest } from '@/types/api';
import {
  FormCheckbox,
  FormError,
  FormField,
  FormGrid,
  FormLabel,
  controlClass,
  textareaClass,
} from '@/components/ui/FormField';

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
          showError(
            'Please Check Your Information',
            'We found some issues with your request. Please review and try again.'
          );
        } else {
          showError('Unable to Submit Request', getUserFriendlyError(err));
        }
      } else {
        showError('Connection Problem', getUserFriendlyError(err));
      }
    }
  };

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
        <FormGrid>
          <FormField>
            <FormLabel>Name</FormLabel>
            <input
              {...register('name', {
                required: 'Name is required',
                maxLength: { value: 100, message: 'Must be under 100 characters' },
              })}
              type="text"
              placeholder="Jane Doe"
              className={controlClass(errors.name)}
            />
            <FormError message={errors.name?.message} />
          </FormField>

          <FormField>
            <FormLabel>Email address</FormLabel>
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
              className={controlClass(errors.email)}
            />
            <FormError message={errors.email?.message} />
          </FormField>
        </FormGrid>

        <FormField>
          <FormLabel>Subject</FormLabel>
          <input
            {...register('subject', {
              required: 'Subject is required',
              maxLength: { value: 300, message: 'Must be under 300 characters' },
            })}
            type="text"
            placeholder="E.g., Healing, Guidance, Thanksgiving"
            className={controlClass(errors.subject)}
          />
          <FormError message={errors.subject?.message} />
        </FormField>

        <FormField>
          <FormLabel>Prayer request</FormLabel>
          <textarea
            {...register('requestText', {
              required: 'Please share your prayer request',
              maxLength: { value: 5000, message: 'Must be under 5000 characters' },
            })}
            rows={6}
            placeholder="Share what's on your heart. Our prayer team will hold this in confidence and intercede for you..."
            className={textareaClass(errors.requestText)}
          />
          <FormError message={errors.requestText?.message} />
        </FormField>

        <FormCheckbox id="isConfidential" {...register('isConfidential')}>
          Keep this request confidential and share it only with the prayer team.
        </FormCheckbox>

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
          className={buttonVariants({
            variant: 'secondary',
            size: 'xl',
            fullWidth: true,
            uppercase: true,
          })}
        >
          {isSubmitting ? 'Submitting Request…' : 'Submit Prayer Request'}
        </button>
      </form>
    </>
  );
}
