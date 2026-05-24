'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/utils/cn';
import { post, BackendError } from '@/utils/apiClient';

interface BookingInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  organization: string;
  orgType: string;
  eventType: string;
  eventDate: string;
  eventDetails?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode?: string;
  country: string;
  agreeTerms: boolean;
}

const steps = ['Contact', 'Event', 'Location'] as const;

const orgTypeOptions = [
  { value: 'church',     label: 'Church' },
  { value: 'university', label: 'University / College' },
  { value: 'conference', label: 'Conference' },
  { value: 'concert',    label: 'Concert / Festival' },
  { value: 'private',    label: 'Private Event' },
  { value: 'other',      label: 'Other' },
];

const countryOptions = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'GH', label: 'Ghana' },
];

const countryNames: Record<string, string> = {
  US: 'United States',
  CA: 'Canada',
  UK: 'United Kingdom',
  NG: 'Nigeria',
  GH: 'Ghana',
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-2 text-sm text-red-500 flex items-center gap-1.5">
      <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
      {message}
    </p>
  );
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="font-bricolage font-semibold text-neutral-800 text-sm block mb-2">
      {children}
      {required && <span className="text-purple-500 ml-0.5">*</span>}
    </label>
  );
}

const inputClass =
  'w-full h-12 px-4 bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 font-raleway text-sm rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/10 transition-all duration-200';

const selectClass =
  'w-full h-12 px-4 bg-neutral-50 border border-neutral-200 text-neutral-900 font-raleway text-sm rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/10 transition-all duration-200 appearance-none cursor-pointer';

const textareaClass =
  'w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 font-raleway text-sm rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/10 transition-all duration-200 resize-none';

export function BookingForm() {
  const [step, setStep]           = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError]   = useState('');

  const {
    register,
    handleSubmit,
    setError,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({ mode: 'onTouched' });

  const stepFields: (keyof BookingInput)[][] = [
    ['firstName', 'lastName', 'email', 'phone', 'organization', 'orgType'],
    ['eventType', 'eventDate', 'eventDetails'],
    ['address1', 'address2', 'city', 'state', 'zipCode', 'country', 'agreeTerms'],
  ];

  const next = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = async (data: BookingInput) => {
    setApiError('');
    try {
      await post('/bookings', {
        firstName:    data.firstName,
        lastName:     data.lastName,
        email:        data.email,
        phone:        data.phone,
        countryCode:  data.country,
        organization: data.organization,
        orgType:      data.orgType,
        eventType:    data.eventType,
        eventDetails: data.eventDetails,
        eventDate:    new Date(data.eventDate).toISOString(),
        addressLine1: data.address1,
        addressLine2: data.address2,
        city:         data.city,
        state:        data.state,
        zipCode:      data.zipCode,
        country:      countryNames[data.country] ?? data.country,
        agreeTerms:   data.agreeTerms,
      });
      setSubmitted(true);
    } catch (err) {
      if (err instanceof BackendError) {
        // Map backend field errors — some fields use different names between form and backend
        const fieldMap: Record<string, keyof BookingInput> = {
          addressLine1: 'address1',
          addressLine2: 'address2',
          countryCode: 'country',
        };
        Object.entries(err.fieldErrors).forEach(([field, messages]) => {
          const mapped = (fieldMap[field] ?? field) as keyof BookingInput;
          setError(mapped, { message: messages[0] });
        });
        if (Object.keys(err.fieldErrors).length === 0) {
          setApiError(err.message || 'Something went wrong. Please try again.');
        }
        // Jump back to step 0 if contact-step fields have errors
        const step0Fields = ['firstName', 'lastName', 'email', 'phone', 'organization', 'orgType'];
        if (Object.keys(err.fieldErrors).some(f => step0Fields.includes(f))) setStep(0);
      } else {
        setApiError('Something went wrong. Please try again.');
      }
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-5 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <p className="font-bricolage font-bold text-neutral-900 text-2xl mb-2">
            Request Received!
          </p>
          <p className="font-raleway text-neutral-500 text-base leading-relaxed max-w-sm">
            Thank you for reaching out. Our team will review your request and contact you within 3–5 business days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>

      {/* Step indicator */}
      <div className="flex items-center mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-3">
              {/* Circle */}
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bricolage font-bold text-sm transition-all duration-300',
                i < step
                  ? 'bg-purple-600 text-white'
                  : i === step
                  ? 'bg-purple-600 text-white ring-4 ring-purple-600/20'
                  : 'bg-neutral-100 text-neutral-400'
              )}>
                {i < step ? '✓' : i + 1}
              </div>
              {/* Label */}
              <span className={cn(
                'font-bricolage font-semibold text-sm hidden sm:block transition-colors duration-300',
                i <= step ? 'text-neutral-900' : 'text-neutral-400'
              )}>
                {s}
              </span>
            </div>
            {/* Connector */}
            {i < steps.length - 1 && (
              <div className={cn(
                'flex-1 h-0.5 mx-4 transition-colors duration-300',
                i < step ? 'bg-purple-600' : 'bg-neutral-200'
              )} />
            )}
          </div>
        ))}
      </div>

      {/* ── Step 1: Contact ── */}
      {step === 0 && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label required>First Name</Label>
              <input {...register('firstName')} placeholder="First name" className={inputClass} />
              <FieldError message={errors.firstName?.message} />
            </div>
            <div>
              <Label required>Last Name</Label>
              <input {...register('lastName')} placeholder="Last name" className={inputClass} />
              <FieldError message={errors.lastName?.message} />
            </div>
          </div>
          <div>
            <Label required>Email Address</Label>
            <input {...register('email')} type="email" placeholder="your@email.com" className={inputClass} />
            <FieldError message={errors.email?.message} />
          </div>
          <div>
            <Label>Phone Number</Label>
            <input {...register('phone')} type="tel" placeholder="+1 (555) 000-0000" className={inputClass} />
            <FieldError message={errors.phone?.message} />
          </div>
          <div>
            <Label required>Organization / Church Name</Label>
            <input {...register('organization')} placeholder="Organization name" className={inputClass} />
            <FieldError message={errors.organization?.message} />
          </div>
          <div>
            <Label required>Organization Type</Label>
            <div className="relative">
              <select {...register('orgType')} defaultValue="" className={selectClass}>
                <option value="" disabled>Select organization type…</option>
                {orgTypeOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 rotate-90 pointer-events-none" />
            </div>
            <FieldError message={errors.orgType?.message} />
          </div>
        </div>
      )}

      {/* ── Step 2: Event ── */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <Label required>Event Type</Label>
            <input {...register('eventType')} placeholder="e.g. Sunday service, Concert, Conference…" className={inputClass} />
            <FieldError message={errors.eventType?.message} />
          </div>
          <div>
            <Label required>Event Date</Label>
            <input {...register('eventDate')} type="date" className={inputClass} />
            <FieldError message={errors.eventDate?.message} />
          </div>
          <div>
            <Label>Event Details <span className="font-normal text-neutral-400">(optional)</span></Label>
            <textarea
              {...register('eventDetails')}
              rows={5}
              placeholder="Tell us more about your event — theme, expected attendance, set duration…"
              className={textareaClass}
            />
            <FieldError message={errors.eventDetails?.message} />
          </div>
        </div>
      )}

      {/* ── Step 3: Location ── */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <Label required>Address Line 1</Label>
            <input {...register('address1')} placeholder="Street address" className={inputClass} />
            <FieldError message={errors.address1?.message} />
          </div>
          <div>
            <Label>Address Line 2 <span className="font-normal text-neutral-400">(optional)</span></Label>
            <input {...register('address2')} placeholder="Suite, building, etc." className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label required>City</Label>
              <input {...register('city')} placeholder="City" className={inputClass} />
              <FieldError message={errors.city?.message} />
            </div>
            <div>
              <Label required>State / Province</Label>
              <input {...register('state')} placeholder="State" className={inputClass} />
              <FieldError message={errors.state?.message} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label required>Zip / Postal Code</Label>
              <input {...register('zipCode')} placeholder="00000" className={inputClass} />
              <FieldError message={errors.zipCode?.message} />
            </div>
            <div>
              <Label required>Country</Label>
              <div className="relative">
                <select {...register('country')} defaultValue="" className={selectClass}>
                  <option value="" disabled>Select country…</option>
                  {countryOptions.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 rotate-90 pointer-events-none" />
              </div>
              <FieldError message={errors.country?.message} />
            </div>
          </div>

          {/* Terms */}
          <div className="pt-1">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                {...register('agreeTerms')}
                type="checkbox"
                className="mt-0.5 w-4 h-4 accent-purple-600 cursor-pointer flex-shrink-0"
              />
              <span className="font-raleway text-neutral-600 text-sm leading-relaxed">
                I agree to the{' '}
                <a href="/legal/terms" target="_blank" className="text-purple-600 hover:text-purple-800 underline underline-offset-2 transition-colors">
                  terms and conditions
                </a>{' '}
                and understand this is a booking inquiry, not a confirmed booking.
              </span>
            </label>
            <FieldError message={errors.agreeTerms?.message} />
          </div>
        </div>
      )}

      {apiError && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="font-worksans text-[0.6rem] tracking-[0.1em] uppercase text-red-500">{apiError}</p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-neutral-100 gap-4">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex items-center gap-2 h-12 px-6 border border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 font-bricolage font-semibold text-sm rounded-xl transition-all duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
        ) : (
          <div />
        )}

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center gap-2 h-12 px-8 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bricolage font-bold text-sm rounded-xl transition-all duration-200 shadow-[0_4px_14px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.45)]"
          >
            Continue
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 h-12 px-8 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed active:bg-purple-700 text-white font-bricolage font-bold text-sm rounded-xl transition-all duration-200 shadow-[0_4px_14px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.45)]"
          >
            {isSubmitting ? 'Submitting…' : 'Submit Request'}
          </button>
        )}
      </div>
    </form>
  );
}
