'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Video, Mic2, Guitar, Users, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';
import { post, BackendError } from '@/lib/data/client';
import { ErrorModal } from '@/components/ui/ErrorModal';
import { SuccessModal } from '@/components/ui/SuccessModal';
import { buttonVariants } from '@/lib/theme/buttons';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { getUserFriendlyError } from '@/lib/utils/errorMessages';
import { cn } from '@/lib/utils/cn';
import {
  FormError,
  FormGrid,
  FormLabel,
  controlClass,
  textareaClass,
} from '@/components/ui/FormField';

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
  { value: 'Media', label: 'Media (Video/Photography)', icon: Video },
  { value: 'Vocalist', label: 'Vocalist (Singing/Worship)', icon: Mic2 },
  { value: 'BackupSinger', label: 'Backup Singer', icon: Guitar },
  { value: 'Protocol', label: 'Protocol (Guest Relations/Ushering)', icon: Users },
  { value: 'Security', label: 'Security', icon: ShieldCheck },
  { value: 'Others', label: 'Other (Please Specify)', icon: Sparkles },
] as const;

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
  const SelectedRoleIcon =
    VOLUNTEER_ROLES.find((r) => r.value === selectedRole)?.icon ?? VOLUNTEER_ROLES[0].icon;

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
          showError(
            'Please Check Your Information',
            'We found some issues with your application. Please review and try again.'
          );
        } else {
          showError('Unable to Submit Application', getUserFriendlyError(err));
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
        title="Application Received!"
        message="Thank you for volunteering! We'll review your application and contact you within 2-3 business days."
        onClose={() => setShowSuccess(false)}
        autoClose={0}
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        {/* Name Row */}
        <FormGrid>
          <div>
            <FormLabel>First name</FormLabel>
            <input
              {...register('firstName', {
                required: 'First name is required',
                minLength: { value: 2, message: 'Must be at least 2 characters' },
              })}
              type="text"
              placeholder="John"
              className={controlClass(errors.firstName)}
            />
            <FormError message={errors.firstName?.message} />
          </div>

          <div>
            <FormLabel>Last name</FormLabel>
            <input
              {...register('lastName', {
                required: 'Last name is required',
                minLength: { value: 2, message: 'Must be at least 2 characters' },
              })}
              type="text"
              placeholder="Doe"
              className={controlClass(errors.lastName)}
            />
            <FormError message={errors.lastName?.message} />
          </div>
        </FormGrid>

        {/* Email */}
        <div>
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
            placeholder="john@example.com"
            className={controlClass(errors.email)}
          />
          <FormError message={errors.email?.message} />
        </div>

        {/* Volunteer Role Selection */}
        <div>
          <FormLabel htmlFor="volunteer-role">Volunteer role</FormLabel>
          <div className="relative">
            <SelectedRoleIcon
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-500"
              aria-hidden="true"
            />
            <select
              id="volunteer-role"
              {...register('role')}
              className={cn(
                controlClass(errors.role),
                'appearance-none pl-11 pr-10 cursor-pointer'
              )}
            >
              {VOLUNTEER_ROLES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400"
              aria-hidden="true"
            />
          </div>
          <FormError message={errors.role?.message} />
        </div>

        {/* Reason / Background */}
        <div>
          <FormLabel>About you</FormLabel>
          <textarea
            {...register('reason', {
              required: 'Please tell us about yourself',
              minLength: { value: 20, message: 'Please provide at least 20 characters' },
            })}
            rows={5}
            placeholder="E.g., I have 5 years of experience in video production, available on weekends, excited to serve the ministry..."
            className={textareaClass(errors.reason)}
          />
          <FormError message={errors.reason?.message} />
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
        {errors.agreeTerms && <p className="text-sm text-red-500">{errors.agreeTerms.message}</p>}

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
          className={buttonVariants({
            variant: 'secondary',
            size: 'xl',
            fullWidth: true,
            uppercase: true,
          })}
        >
          {isSubmitting ? 'Submitting Application…' : 'Submit Application'}
        </button>
      </form>
    </>
  );
}
