'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { contactSchema, type ContactInput } from '@/utils/validators';
import { post } from '@/utils/apiClient';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    try {
      await post('/contact', data);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-3 py-12">
        <CheckCircle2 className="h-5 w-5 text-gold-400" />
        <p className="font-bricolage font-bold text-neutral-900 text-xl leading-snug">
          Message received.
        </p>
        <p className="font-raleway text-neutral-500 text-sm font-light">
          Thank you for reaching out. We&apos;ll be in touch shortly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 font-worksans text-[0.55rem] tracking-[0.2em] uppercase text-neutral-500 hover:text-purple-600 transition-colors duration-300 w-fit border-b border-neutral-200 hover:border-purple-400 pb-px"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="font-worksans text-xs tracking-[0.15em] uppercase text-neutral-600 block mb-2">
            Full Name
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="Your full name"
            className="w-full h-11 px-4 bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 font-raleway text-sm font-light focus:outline-none focus:border-purple-400 transition-colors duration-300 rounded-xl"
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
            {...register('email')}
            type="email"
            placeholder="your@email.com"
            className="w-full h-11 px-4 bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 font-raleway text-sm font-light focus:outline-none focus:border-purple-400 transition-colors duration-300 rounded-xl"
          />
          {errors.email && (
            <p className="mt-1.5 font-worksans text-[0.52rem] tracking-[0.1em] uppercase text-red-400/80">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="font-worksans text-[0.5rem] tracking-[0.18em] uppercase text-neutral-600 block mb-2">
          Phone <span className="text-neutral-700">(optional)</span>
        </label>
        <input
          {...register('phone')}
          type="tel"
          placeholder="+1 (555) 000-0000"
          className="w-full h-11 px-4 bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 font-raleway text-sm font-light focus:outline-none focus:border-purple-400 transition-colors duration-300 rounded-xl"
        />
        {errors.phone && (
          <p className="mt-1.5 font-worksans text-[0.52rem] tracking-[0.1em] uppercase text-red-400/80">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label className="font-worksans text-[0.5rem] tracking-[0.18em] uppercase text-neutral-600 block mb-2">
          Subject <span className="text-neutral-700">(optional)</span>
        </label>
        <input
          {...register('subject')}
          type="text"
          placeholder="What is this about?"
          className="w-full h-11 px-4 bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 font-raleway text-sm font-light focus:outline-none focus:border-purple-400 transition-colors duration-300 rounded-xl"
        />
      </div>

      {/* Message */}
      <div>
        <label className="font-worksans text-[0.5rem] tracking-[0.18em] uppercase text-neutral-600 block mb-2">
          Message
        </label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Write your message here…"
          className="w-full px-4 py-3 bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 font-raleway text-sm font-light focus:outline-none focus:border-purple-400 transition-colors duration-300 resize-none rounded-xl"
        />
        {errors.message && (
          <p className="mt-1.5 font-worksans text-[0.52rem] tracking-[0.1em] uppercase text-red-400/80">
            {errors.message.message}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p className="font-worksans text-[0.52rem] tracking-[0.1em] uppercase text-red-400/80">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 px-8 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-worksans text-[0.58rem] tracking-[0.2em] uppercase transition-all duration-300 rounded-xl"
      >
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
