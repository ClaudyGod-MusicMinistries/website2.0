'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CalendarDays, Check, ChevronLeft, ChevronRight, Loader2, MapPin, ShieldCheck, Sparkles, UserRound } from 'lucide-react';
import { BackendError, post } from '@/lib/data/client';
import { getUserFriendlyError } from '@/lib/utils/errorMessages';
import { cn } from '@/lib/utils/cn';
import { useCountries } from '@/hooks/useCountries';
import { CountrySelect } from '@/components/ui/CountrySelect';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { ErrorModal } from '@/components/ui/ErrorModal';
import { SuccessModal } from '@/components/ui/SuccessModal';
import { useErrorHandler } from '@/hooks/useErrorHandler';

interface BookingInput {
  firstName: string; lastName: string; email: string; phone: string;
  organization: string; orgType: string; eventType: string; eventTypeOther?: string;
  eventDate: string; eventDetails: string; address1: string; address2?: string;
  city: string; state: string; country: string; agreeTerms: boolean;
}

const steps = [
  { label: 'Your details', short: 'Details', icon: UserRound },
  { label: 'The engagement', short: 'Event', icon: CalendarDays },
  { label: 'Event location', short: 'Location', icon: MapPin },
];
const organizationTypes = ['Church / Ministry', 'University / College', 'Conference Organizer', 'Concert / Festival', 'Corporate Organization', 'Private Host', 'Other'];
const eventTypes = ['Church Service', 'Concert', 'Conference', 'Crusade / Revival', 'Youth / Campus Event', 'Wedding', 'Corporate Event', 'Other'];
const fieldClass = 'h-14 w-full rounded-lg border border-neutral-300 bg-white px-4 text-[15px] text-neutral-950 outline-none transition placeholder:text-neutral-400 hover:border-neutral-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10';
const textAreaClass = `${fieldClass} h-auto min-h-36 resize-y py-4 leading-relaxed`;

function tomorrow() { const date = new Date(); date.setDate(date.getDate() + 1); return date.toISOString().slice(0, 10); }
function Label({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return <label className="mb-2 flex items-center justify-between text-sm font-semibold text-neutral-800"><span>{children}</span>{optional && <span className="text-xs font-normal text-neutral-400">Optional</span>}</label>;
}
function FieldError({ message }: { message?: string }) { return message ? <p role="alert" className="mt-2 text-sm text-red-600">{message}</p> : null; }

export function BookingForm() {
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const { countries } = useCountries();
  const { error, showError, closeError } = useErrorHandler();
  const { register, control, handleSubmit, trigger, setError, reset, watch, formState: { errors, isSubmitting, isValidating } } = useForm<BookingInput>({ mode: 'onTouched', defaultValues: { agreeTerms: false } });
  const eventType = watch('eventType');
  const stepFields: (keyof BookingInput)[][] = [
    ['firstName', 'lastName', 'email', 'phone', 'organization', 'orgType'],
    ['eventType', 'eventTypeOther', 'eventDate', 'eventDetails'],
    ['address1', 'city', 'state', 'country', 'agreeTerms'],
  ];
  const busy = isSubmitting || isValidating;

  const continueToNext = async () => {
    if (await trigger(stepFields[step], { shouldFocus: true })) {
      setStep((current) => Math.min(current + 1, steps.length - 1));
      window.requestAnimationFrame(() => document.getElementById('booking-form-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  };

  const onSubmit = async (data: BookingInput) => {
    const country = countries.find((item) => item.code === data.country);
    try {
      await post('/bookings', {
        firstName: data.firstName.trim(), lastName: data.lastName.trim(), email: data.email.trim().toLowerCase(), phone: data.phone,
        countryCode: data.country, organization: data.organization.trim(), orgType: data.orgType,
        eventType: data.eventType === 'Other' ? data.eventTypeOther?.trim() : data.eventType,
        eventDetails: data.eventDetails.trim(), eventDate: new Date(`${data.eventDate}T12:00:00`).toISOString(),
        addressLine1: data.address1.trim(), addressLine2: data.address2?.trim() || undefined,
        city: data.city.trim(), state: data.state.trim(), country: country?.name ?? data.country,
        agreeTerms: data.agreeTerms,
      });
      reset(); setStep(0); setSuccess(true);
    } catch (caught) {
      if (caught instanceof BackendError && Object.keys(caught.fieldErrors).length) {
        const mapping: Record<string, keyof BookingInput> = { addressLine1: 'address1', addressLine2: 'address2', countryCode: 'country' };
        const formErrors: Record<string, string> = {};
        for (const [field, messages] of Object.entries(caught.fieldErrors)) {
          const mapped = mapping[field] ?? field as keyof BookingInput;
          setError(mapped, { message: messages[0] }); formErrors[mapped] = messages[0];
        }
        const errorStep = stepFields.findIndex((fields) => fields.some((field) => field in formErrors));
        if (errorStep >= 0) setStep(errorStep);
        showError('Please review your information', 'A few details need your attention before we can send this request.', formErrors);
      } else showError('We could not send your request', getUserFriendlyError(caught));
    }
  };

  return <>
    <SuccessModal isOpen={success} title="Your request is with our team" message="Thank you. We’ll review the engagement details and contact you within 3–5 business days. Your event is not confirmed until a formal agreement is completed." onClose={() => setSuccess(false)} autoClose={0} />
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-labelledby="booking-form-heading">
      <div className="mb-8 border-b border-neutral-100 pb-7">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-purple-600"><Sparkles className="h-3.5 w-3.5" /> Private booking enquiry</div>
        <h2 id="booking-form-heading" className="font-display text-2xl font-semibold leading-tight text-neutral-950 sm:text-3xl">Tell us about your engagement</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500">Share the essentials. Our team will personally follow up for technical, travel, and contractual details.</p>
      </div>

      <ol className="mb-9 grid grid-cols-3 gap-2" aria-label="Booking progress">
        {steps.map((item, index) => { const Icon = item.icon; return <li key={item.label} className="relative">
          <button type="button" disabled={index > step} onClick={() => index < step && setStep(index)} className={cn('flex w-full flex-col gap-2 rounded-lg border p-3 text-left transition sm:flex-row sm:items-center', index === step ? 'border-purple-300 bg-purple-50 text-purple-800' : index < step ? 'border-neutral-200 bg-white text-neutral-800' : 'border-neutral-100 bg-neutral-50 text-neutral-400')} aria-current={index === step ? 'step' : undefined}>
            <span className={cn('flex h-7 w-7 items-center justify-center rounded-full', index <= step ? 'bg-purple-600 text-white' : 'bg-neutral-200')} >{index < step ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}</span>
            <span><span className="block text-[10px] font-semibold uppercase tracking-wider opacity-60">Step {index + 1}</span><span className="hidden text-xs font-semibold sm:block">{item.label}</span><span className="text-xs font-semibold sm:hidden">{item.short}</span></span>
          </button>
        </li>; })}
      </ol>

      {step === 0 && <div className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2"><div><Label>First name</Label><input {...register('firstName', { required: 'Enter your first name.', minLength: { value: 2, message: 'Use at least 2 characters.' }, maxLength: 60 })} autoComplete="given-name" className={fieldClass} placeholder="First name" /><FieldError message={errors.firstName?.message} /></div><div><Label>Last name</Label><input {...register('lastName', { required: 'Enter your last name.', minLength: { value: 2, message: 'Use at least 2 characters.' }, maxLength: 60 })} autoComplete="family-name" className={fieldClass} placeholder="Last name" /><FieldError message={errors.lastName?.message} /></div></div>
        <div className="grid gap-5 sm:grid-cols-2"><div><Label>Work email</Label><input {...register('email', { required: 'Enter an email address.', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address.' } })} type="email" autoComplete="email" className={fieldClass} placeholder="name@organisation.com" /><FieldError message={errors.email?.message} /></div><div><Label>Direct phone number</Label><Controller name="phone" control={control} rules={{ required: 'Enter a phone number.', pattern: { value: /^\+[1-9]\d{6,14}$/, message: 'Enter a valid international phone number.' } }} render={({ field }) => <PhoneInput value={field.value ?? ''} onChange={field.onChange} onBlur={field.onBlur} error={errors.phone?.message} inputClass="!h-14 !rounded-lg !border-neutral-300" />} /></div></div>
        <div><Label>Church or organisation</Label><input {...register('organization', { required: 'Enter the hosting organisation.', minLength: { value: 2, message: 'Use at least 2 characters.' }, maxLength: 150 })} autoComplete="organization" className={fieldClass} placeholder="Name of the host organisation" /><FieldError message={errors.organization?.message} /></div>
        <div><Label>Organisation type</Label><select {...register('orgType', { required: 'Select the organisation type.' })} defaultValue="" className={fieldClass}><option value="" disabled>Select the closest match</option>{organizationTypes.map((type) => <option key={type}>{type}</option>)}</select><FieldError message={errors.orgType?.message} /></div>
      </div>}

      {step === 1 && <div className="space-y-6">
        <fieldset><legend className="mb-3 text-sm font-semibold text-neutral-800">What kind of engagement is this?</legend><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{eventTypes.map((type) => <label key={type} className={cn('cursor-pointer rounded-lg border px-3 py-3.5 text-center text-xs font-semibold transition hover:border-purple-400', eventType === type ? 'border-purple-600 bg-purple-50 text-purple-800 ring-2 ring-purple-600/10' : 'border-neutral-200 bg-white text-neutral-700')}><input type="radio" value={type} {...register('eventType', { required: 'Choose an engagement type.' })} className="sr-only" />{type}</label>)}</div><FieldError message={errors.eventType?.message} /></fieldset>
        {eventType === 'Other' && <div><Label>Describe the engagement</Label><input {...register('eventTypeOther', { required: 'Tell us what kind of engagement this is.', minLength: { value: 2, message: 'Use at least 2 characters.' }, maxLength: 100 })} className={fieldClass} placeholder="e.g. Leadership retreat" /><FieldError message={errors.eventTypeOther?.message} /></div>}
        <div><Label>Proposed event date</Label><input {...register('eventDate', { required: 'Choose the proposed event date.', validate: (value) => value >= tomorrow() || 'Choose a future date.' })} type="date" min={tomorrow()} className={fieldClass} /><p className="mt-2 text-xs text-neutral-500">The date remains provisional until confirmed by our team.</p><FieldError message={errors.eventDate?.message} /></div>
        <div><Label>Event brief</Label><textarea {...register('eventDetails', { required: 'Tell us about the event.', minLength: { value: 30, message: 'Please provide at least 30 characters so our team can assess the request.' }, maxLength: { value: 2000, message: 'Keep the event brief under 2,000 characters.' } })} className={textAreaClass} placeholder="Include the event vision, theme, audience, expected attendance, requested ministry format, and any important timing." /><div className="mt-2 flex justify-between text-xs text-neutral-400"><span>Useful detail helps us respond accurately.</span><span>{watch('eventDetails')?.length ?? 0}/2000</span></div><FieldError message={errors.eventDetails?.message} /></div>
      </div>}

      {step === 2 && <div className="space-y-6">
        <div><Label>Venue name or street address</Label><input {...register('address1', { required: 'Enter the venue or event address.', minLength: { value: 3, message: 'Use at least 3 characters.' }, maxLength: 200 })} autoComplete="address-line1" className={fieldClass} placeholder="Venue name and street address" /><FieldError message={errors.address1?.message} /></div>
        <div><Label optional>Additional location details</Label><input {...register('address2', { maxLength: 200 })} autoComplete="address-line2" className={fieldClass} placeholder="Building, hall, landmark or access note" /></div>
        <div className="grid gap-5 sm:grid-cols-2"><div><Label>City</Label><input {...register('city', { required: 'Enter the event city.', minLength: { value: 2, message: 'Use at least 2 characters.' }, maxLength: 100 })} autoComplete="address-level2" className={fieldClass} placeholder="City" /><FieldError message={errors.city?.message} /></div><div><Label>State, province or region</Label><input {...register('state', { required: 'Enter the state, province, or region.', minLength: { value: 2, message: 'Use at least 2 characters.' }, maxLength: 100 })} autoComplete="address-level1" className={fieldClass} placeholder="State / province / region" /><FieldError message={errors.state?.message} /></div></div>
        <div><Label>Country</Label><Controller name="country" control={control} rules={{ required: 'Choose the event country.' }} render={({ field }) => <CountrySelect value={field.value} onChange={field.onChange} onBlur={field.onBlur} error={errors.country?.message} />} /><p className="mt-2 text-xs text-neutral-500">All countries are supported. Calling codes and country data are kept current automatically.</p></div>
        <label className={cn('flex cursor-pointer gap-3 rounded-lg border p-4 transition', errors.agreeTerms ? 'border-red-300 bg-red-50/40' : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300')}><input {...register('agreeTerms', { required: 'Confirm that you understand the booking terms.' })} type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-purple-600" /><span className="text-sm leading-6 text-neutral-600">I agree to the <a href="/legal/terms" target="_blank" className="font-semibold text-purple-700 underline underline-offset-2">booking terms</a> and understand that this enquiry does not confirm the engagement.</span></label><FieldError message={errors.agreeTerms?.message} />
        <div className="flex items-start gap-3 rounded-lg bg-purple-950 px-4 py-4 text-white"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" /><p className="text-xs leading-5 text-white/70"><strong className="block text-sm text-white">Handled confidentially</strong>Your details are shared only with the booking team and used to assess this request.</p></div>
      </div>}

      <ErrorModal isOpen={error?.isOpen ?? false} title={error?.title} message={error?.message ?? ''} onClose={closeError} actions={[{ label: 'Review details', onClick: closeError, variant: 'primary' }]} />
      <div className="mt-9 flex items-center justify-between gap-3 border-t border-neutral-100 pt-6">
        {step > 0 ? <button type="button" disabled={busy} onClick={() => setStep((current) => current - 1)} className="inline-flex h-12 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-neutral-600 hover:bg-neutral-100 disabled:opacity-50"><ChevronLeft className="h-4 w-4" /> Back</button> : <p className="hidden text-xs text-neutral-400 sm:block">Fields are validated before you continue.</p>}
        {step < steps.length - 1 ? <button type="button" disabled={busy} onClick={continueToNext} className="inline-flex h-12 items-center gap-2 rounded-lg bg-purple-700 px-6 text-sm font-semibold text-white shadow-purple-cta transition hover:bg-purple-600 disabled:opacity-50">Continue <ChevronRight className="h-4 w-4" /></button> : <button type="submit" disabled={busy} className="inline-flex h-12 items-center gap-2 rounded-lg bg-purple-700 px-6 text-sm font-semibold text-white shadow-purple-cta transition hover:bg-purple-600 disabled:opacity-50">{isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending securely…</> : <>Send booking request <ChevronRight className="h-4 w-4" /></>}</button>}
      </div>
    </form>
  </>;
}
