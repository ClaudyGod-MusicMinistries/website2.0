'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { post, BackendError } from '@/utils/apiClient';
import { ErrorModal } from '@/components/ui/ErrorModal';
import { SuccessModal } from '@/components/ui/SuccessModal';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { getUserFriendlyError } from '@/utils/errorMessages';

interface VolunteerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'BackupSinger' | 'Protocol' | 'Media' | 'Security' | 'Vocalist' | 'Others';
  reason: string;
  agreeTerms: boolean;
}

const VOLUNTEER_ROLES = [
  { value: 'Media', label: '📹 Media (Video/Photography)' },
  { value: 'Vocalist', label: '🎵 Vocalist (Singing/Worship)' },
  { value: 'BackupSinger', label: '🎸 Backup Singer' },
  { value: 'Protocol', label: '👋 Protocol (Guest Relations/Ushering)' },
  { value: 'Security', label: '🛡️ Security' },
  { value: 'Others', label: '✨ Other (Please Specify)' },
];

export function VolunteerForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { error, showError, closeError } = useErrorHandler();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<VolunteerFormData>({
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'Media',
      reason: '',
      agreeTerms: false,
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: VolunteerFormData) => {
    try {
      await post('/volunteers', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        reason: data.reason,
      });
      setShowSuccess(true);
      reset();
    } catch (err) {
      if (err instanceof BackendError) {
        if (Object.keys(err.fieldErrors).length > 0) {
          Object.entries(err.fieldErrors).forEach(([field, messages]) => {
            setError(field as keyof VolunteerFormData, { message: messages[0] });
          });
          showError('Please Check Your Information', 'We found some issues with your application. Please review and try again.');
        } else {
          showError('Unable to Submit Application', getUserFriendlyError(err));
        }
      } else {
        showError('Connection Problem', getUserFriendlyError(err));
      }
    }
  };

  const inputClass =
    'w-full h-12 px-4 bg-white border text-neutral-900 placeholder:text-neutral-400 font-roboto text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all duration-200 rounded-xl';

  const selectClass =
    'w-full h-12 px-4 bg-white border text-neutral-900 font-roboto text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all duration-200 rounded-xl appearance-none cursor-pointer';

  const textareaClass =
    'w-full px-4 py-3 bg-white border text-neutral-900 placeholder:text-neutral-400 font-roboto text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all duration-200 resize-none rounded-xl';

  return (
    <>
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        title="Application Received!"
        message="Thank you for volunteering! We'll review your application and contact you within 2-3 business days."
        onClose={() => setShowSuccess(false)}
        autoClose={0}
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        {/* Name Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-bricolage font-semibold text-neutral-800 text-sm block mb-2">
              First Name <span className="text-purple-500">*</span>
            </label>
            <input
              {...register('firstName', {
                required: 'First name is required',
                minLength: { value: 2, message: 'Must be at least 2 characters' },
              })}
              type="text"
              placeholder="John"
              className={`${inputClass} ${
                errors.firstName ? 'border-red-400 bg-red-50' : 'border-neutral-200'
              }`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="font-bricolage font-semibold text-neutral-800 text-sm block mb-2">
              Last Name <span className="text-purple-500">*</span>
            </label>
            <input
              {...register('lastName', {
                required: 'Last name is required',
                minLength: { value: 2, message: 'Must be at least 2 characters' },
              })}
              type="text"
              placeholder="Doe"
              className={`${inputClass} ${
                errors.lastName ? 'border-red-400 bg-red-50' : 'border-neutral-200'
              }`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="font-bricolage font-semibold text-neutral-800 text-sm block mb-2">
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
            placeholder="john@example.com"
            className={`${inputClass} ${
              errors.email ? 'border-red-400 bg-red-50' : 'border-neutral-200'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Volunteer Role Selection */}
        <div>
          <label className="font-bricolage font-semibold text-neutral-800 text-sm block mb-2">
            Volunteer Role <span className="text-purple-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {VOLUNTEER_ROLES.map((r) => (
              <label
                key={r.value}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedRole === r.value
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-neutral-200 bg-white hover:border-purple-300'
                }`}
              >
                <input
                  {...register('role')}
                  type="radio"
                  value={r.value}
                  className="mr-2"
                />
                <span className="text-sm font-raleway">{r.label}</span>
              </label>
            ))}
          </div>
          {errors.role && (
            <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>

        {/* Reason / Background */}
        <div>
          <label className="font-bricolage font-semibold text-neutral-800 text-sm block mb-2">
            Tell Us About Yourself <span className="text-purple-500">*</span>
            <span className="text-neutral-500 text-xs font-normal block mt-1">
              Share your experience, skills, availability, and why you want to volunteer
            </span>
          </label>
          <textarea
            {...register('reason', {
              required: 'Please tell us about yourself',
              minLength: { value: 20, message: 'Please provide at least 20 characters' },
            })}
            rows={5}
            placeholder="E.g., I have 5 years of experience in video production, available on weekends, excited to serve the ministry..."
            className={`${textareaClass} ${
              errors.reason ? 'border-red-400 bg-red-50' : 'border-neutral-200'
            }`}
          />
          {errors.reason && (
            <p className="mt-1 text-sm text-red-500">{errors.reason.message}</p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3">
          <input
            {...register('agreeTerms', { required: 'You must agree to the terms' })}
            type="checkbox"
            id="agreeTerms"
            className="mt-1 w-4 h-4 rounded border-neutral-300 text-purple-600 cursor-pointer"
          />
          <label htmlFor="agreeTerms" className="text-sm text-neutral-700">
            I agree to volunteer and abide by the ministry&apos;s guidelines and code of conduct
            <span className="text-purple-500 ml-1">*</span>
          </label>
        </div>
        {errors.agreeTerms && (
          <p className="text-sm text-red-500">{errors.agreeTerms.message}</p>
        )}

        {/* Error Modal */}
        <ErrorModal
          isOpen={error?.isOpen ?? false}
          title={error?.title}
          message={error?.message ?? ''}
          onClose={closeError}
          actions={[
            {
              label: 'Edit Application',
              onClick: closeError,
              variant: 'primary',
            },
          ]}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || isValidating || Object.keys(errors).length > 0}
          className="w-full h-12 px-8 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-300 disabled:cursor-not-allowed text-white font-bricolage font-bold text-sm rounded-xl transition-all duration-200 shadow-[0_4px_14px_rgba(124,58,237,0.35)]"
        >
          {isSubmitting ? 'Submitting Application…' : 'Submit Application'}
        </button>
      </form>
    </>
  );
}
