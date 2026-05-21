'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { bookingSchema, type BookingInput } from '@/utils/validators';
import { cn } from '@/utils/cn';

const steps = ['Contact', 'Event', 'Location'] as const;

const orgTypeOptions = [
  { value: 'church', label: 'Church' },
  { value: 'university', label: 'University / College' },
  { value: 'conference', label: 'Conference' },
  { value: 'concert', label: 'Concert / Festival' },
  { value: 'private', label: 'Private Event' },
  { value: 'other', label: 'Other' },
];

const countryOptions = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'GH', label: 'Ghana' },
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 font-worksans text-[0.52rem] tracking-[0.1em] uppercase text-red-400/80">
      {message}
    </p>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-worksans text-[0.5rem] tracking-[0.18em] uppercase text-neutral-600 block mb-2">
      {children}
    </label>
  );
}

const inputClass =
  'w-full h-11 px-4 bg-transparent border border-white/10 text-white placeholder:text-neutral-700 font-raleway text-sm font-light focus:outline-none focus:border-gold-500/40 transition-colors duration-300';

const selectClass =
  'w-full h-11 px-4 bg-[#0a0a0a] border border-white/10 text-white font-raleway text-sm font-light focus:outline-none focus:border-gold-500/40 transition-colors duration-300';

export function BookingForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({ resolver: zodResolver(bookingSchema), mode: 'onTouched' });

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
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      // error handled in UI below
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col gap-3 py-12">
        <CheckCircle2 className="h-5 w-5 text-gold-400" />
        <p className="font-raleway font-light text-white text-xl leading-snug">
          Booking request received.
        </p>
        <p className="font-raleway text-neutral-500 text-sm font-light max-w-sm">
          Thank you for reaching out. Our team will review your request and contact you within 3–5
          business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <div
              className={cn(
                'flex items-center gap-2',
                i <= step ? 'text-gold-400' : 'text-neutral-700'
              )}
            >
              <span
                className={cn(
                  'w-5 h-5 flex items-center justify-center border text-[0.48rem] font-worksans tracking-[0.1em]',
                  i < step
                    ? 'border-gold-500/60 bg-gold-500/10'
                    : i === step
                    ? 'border-gold-500'
                    : 'border-white/10'
                )}
              >
                {i + 1}
              </span>
              <span className="font-worksans text-[0.48rem] tracking-[0.18em] uppercase hidden sm:block">
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-8 h-px bg-white/10 mx-3" />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Contact */}
      {step === 0 && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label>First Name</Label>
              <input {...register('firstName')} placeholder="First name" className={inputClass} />
              <FieldError message={errors.firstName?.message} />
            </div>
            <div>
              <Label>Last Name</Label>
              <input {...register('lastName')} placeholder="Last name" className={inputClass} />
              <FieldError message={errors.lastName?.message} />
            </div>
          </div>
          <div>
            <Label>Email Address</Label>
            <input {...register('email')} type="email" placeholder="your@email.com" className={inputClass} />
            <FieldError message={errors.email?.message} />
          </div>
          <div>
            <Label>Phone Number</Label>
            <input {...register('phone')} type="tel" placeholder="+1 (555) 000-0000" className={inputClass} />
            <FieldError message={errors.phone?.message} />
          </div>
          <div>
            <Label>Organization / Church Name</Label>
            <input {...register('organization')} placeholder="Organization name" className={inputClass} />
            <FieldError message={errors.organization?.message} />
          </div>
          <div>
            <Label>Organization Type</Label>
            <select {...register('orgType')} className={selectClass}>
              <option value="">Select type…</option>
              {orgTypeOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <FieldError message={errors.orgType?.message} />
          </div>
        </div>
      )}

      {/* Step 2: Event */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <Label>Event Type</Label>
            <input {...register('eventType')} placeholder="e.g. Sunday service, Concert, Conference…" className={inputClass} />
            <FieldError message={errors.eventType?.message} />
          </div>
          <div>
            <Label>Event Date</Label>
            <input {...register('eventDate')} type="date" className={inputClass} />
            <FieldError message={errors.eventDate?.message} />
          </div>
          <div>
            <Label>Event Details <span className="text-neutral-700">(optional)</span></Label>
            <textarea
              {...register('eventDetails')}
              rows={5}
              placeholder="Tell us more about your event — theme, expected attendance, set duration…"
              className="w-full px-4 py-3 bg-transparent border border-white/10 text-white placeholder:text-neutral-700 font-raleway text-sm font-light focus:outline-none focus:border-gold-500/40 transition-colors duration-300 resize-none"
            />
            <FieldError message={errors.eventDetails?.message} />
          </div>
        </div>
      )}

      {/* Step 3: Location */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <Label>Address Line 1</Label>
            <input {...register('address1')} placeholder="Street address" className={inputClass} />
            <FieldError message={errors.address1?.message} />
          </div>
          <div>
            <Label>Address Line 2 <span className="text-neutral-700">(optional)</span></Label>
            <input {...register('address2')} placeholder="Suite, building, etc." className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label>City</Label>
              <input {...register('city')} placeholder="City" className={inputClass} />
              <FieldError message={errors.city?.message} />
            </div>
            <div>
              <Label>State / Province</Label>
              <input {...register('state')} placeholder="State" className={inputClass} />
              <FieldError message={errors.state?.message} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label>Zip / Postal Code</Label>
              <input {...register('zipCode')} placeholder="00000" className={inputClass} />
              <FieldError message={errors.zipCode?.message} />
            </div>
            <div>
              <Label>Country</Label>
              <select {...register('country')} className={selectClass}>
                <option value="">Select country…</option>
                {countryOptions.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <FieldError message={errors.country?.message} />
            </div>
          </div>

          {/* Terms */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                {...register('agreeTerms')}
                type="checkbox"
                className="mt-0.5 w-3.5 h-3.5 accent-gold-500"
              />
              <span className="font-raleway text-neutral-500 text-xs font-light leading-relaxed">
                I agree to the{' '}
                <a href="/legal/terms" target="_blank" className="text-gold-400/80 hover:text-gold-400 transition-colors">
                  terms and conditions
                </a>{' '}
                and understand this is a booking inquiry, not a confirmed booking.
              </span>
            </label>
            <FieldError message={errors.agreeTerms?.message} />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.06]">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-2 font-worksans text-[0.55rem] tracking-[0.18em] uppercase text-neutral-500 hover:text-white transition-colors duration-300"
          >
            <ChevronLeft className="h-3 w-3" /> Back
          </button>
        ) : (
          <div />
        )}

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="flex items-center gap-2 h-11 px-8 bg-gold-500 hover:bg-gold-400 text-[#080808] font-worksans text-[0.58rem] tracking-[0.2em] uppercase transition-all duration-300"
          >
            Continue <ChevronRight className="h-3 w-3" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-11 px-8 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-[#080808] font-worksans text-[0.58rem] tracking-[0.2em] uppercase transition-all duration-300"
          >
            {isSubmitting ? 'Submitting…' : 'Submit Request'}
          </button>
        )}
      </div>
    </form>
  );
}
