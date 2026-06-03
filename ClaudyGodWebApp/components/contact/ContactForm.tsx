'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CheckCircle2 } from 'lucide-react';
import { post, BackendError } from '@/utils/apiClient';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { ErrorModal } from '@/components/ui/ErrorModal';
import { SuccessModal } from '@/components/ui/SuccessModal';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { getUserFriendlyError } from '@/utils/errorMessages';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
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
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await post('/contacts', {
        name: data.name,
        email: data.email,
        message: data.message,
      });
      setShowSuccess(true);
      reset();
    } catch (err) {
      if (err instanceof BackendError) {
        if (Object.keys(err.fieldErrors).length > 0) {
          Object.entries(err.fieldErrors).forEach(([field, messages]) => {
            setError(field as keyof FormData, { message: messages[0] });
          });
          showError('Please Check Your Information', 'We found some issues with your message. Please review and try again.');
        } else {
          showError('Unable to Send Message', getUserFriendlyError(err));
        }
      } else {
        showError('Connection Problem', getUserFriendlyError(err));
      }
    }
  };

  return (
    <>
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        title="Message Received!"
        message="Thank you for reaching out. We've received your message and our team will get back to you shortly."
        onClose={() => setShowSuccess(false)}
        autoClose={5000}
      />

    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="font-worksans text-xs tracking-[0.15em] uppercase text-neutral-600 block mb-2">
            Full Name
          </label>
          <input
            {...register('name', {
              required: 'Full name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
              maxLength: { value: 100, message: 'Name must be less than 100 characters' },
            })}
            type="text"
            placeholder="Your full name"
            className={`w-full h-11 px-4 bg-white border text-neutral-900 placeholder:text-neutral-400 font-raleway text-sm font-light focus:outline-none focus:border-purple-400 transition-colors duration-300 rounded-xl ${
              errors.name ? 'border-red-400 bg-red-50' : 'border-neutral-200'
            }`}
          />
          {errors.name && (
            <p className="mt-1.5 font-worksans text-[0.52rem] tracking-[0.1em] uppercase text-red-400/80">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label className="font-worksans text-xs tracking-[0.15em] uppercase text-neutral-600 block mb-2">
            Email Address
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address',
              },
            })}
            type="email"
            placeholder="your@email.com"
            className={`w-full h-11 px-4 bg-white border text-neutral-900 placeholder:text-neutral-400 font-raleway text-sm font-light focus:outline-none focus:border-purple-400 transition-colors duration-300 rounded-xl ${
              errors.email ? 'border-red-400 bg-red-50' : 'border-neutral-200'
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 font-worksans text-[0.52rem] tracking-[0.1em] uppercase text-red-400/80">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="font-worksans text-[0.5rem] tracking-[0.18em] uppercase text-neutral-600 block mb-2">
          Phone <span className="text-neutral-400">(optional)</span>
        </label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="800 000 0000"
            />
          )}
        />
      </div>

      <div>
        <label className="font-worksans text-[0.5rem] tracking-[0.18em] uppercase text-neutral-600 block mb-2">
          Subject <span className="text-neutral-400">(optional)</span>
        </label>
        <input
          {...register('subject')}
          type="text"
          placeholder="What is this about?"
          className="w-full h-11 px-4 bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 font-raleway text-sm font-light focus:outline-none focus:border-purple-400 transition-colors duration-300 rounded-xl"
        />
      </div>

      <div>
        <label className="font-worksans text-[0.5rem] tracking-[0.18em] uppercase text-neutral-600 block mb-2">
          Message
        </label>
        <textarea
          {...register('message', {
            required: 'Message is required',
            minLength: { value: 10, message: 'Message must be at least 10 characters' },
            maxLength: { value: 2000, message: 'Message must be less than 2000 characters' },
          })}
          rows={5}
          placeholder="Write your message here…"
          className={`w-full px-4 py-3 bg-white border text-neutral-900 placeholder:text-neutral-400 font-raleway text-sm font-light focus:outline-none focus:border-purple-400 transition-colors duration-300 resize-none rounded-xl ${
            errors.message ? 'border-red-400 bg-red-50' : 'border-neutral-200'
          }`}
        />
        {errors.message && (
          <p className="mt-1.5 font-worksans text-[0.52rem] tracking-[0.1em] uppercase text-red-400/80">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Error Modal */}
      <ErrorModal
        isOpen={error?.isOpen ?? false}
        title={error?.title}
        message={error?.message ?? ''}
        onClose={closeError}
        actions={[
          {
            label: 'Edit Message',
            onClick: closeError,
            variant: 'primary',
          },
        ]}
      />

      <button
        type="submit"
        disabled={isSubmitting || Object.keys(errors).length > 0}
        className="h-11 px-8 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-worksans text-[0.58rem] tracking-[0.2em] uppercase transition-all duration-300 rounded-xl"
      >
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
    </>
  );
}
