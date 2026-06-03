'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mic2, Camera, ShieldCheck, Users, CheckCircle2, ChevronRight, Mic } from 'lucide-react';
import { cn } from '@/utils/cn';
import { post, BackendError } from '@/utils/apiClient';
import type { VolunteerRole } from '@/types/api';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  role: VolunteerRole;
  reason: string;
}

// ─── Role definitions (map to backend VolunteerRole enum) ─────────────────

const roles: { id: VolunteerRole; icon: React.FC<{ className?: string }>; label: string; desc: string }[] = [
  { id: 'Vocalist',    icon: Mic,        label: 'Worship / Vocals', desc: 'Lead & worship singers' },
  { id: 'BackupSinger', icon: Mic2,      label: 'Backup Vocals',    desc: 'Harmony & background singers' },
  { id: 'Media',       icon: Camera,     label: 'Media & Tech',     desc: 'Video, audio & photography' },
  { id: 'Protocol',    icon: Users,      label: 'Protocol Team',    desc: 'Ushers & hospitality' },
  { id: 'Security',    icon: ShieldCheck, label: 'Security',        desc: 'Safety & crowd management' },
  { id: 'Others',      icon: ChevronRight, label: 'Other',          desc: 'Any other area of service' },
];

// ─── Component ────────────────────────────────────────────────────────────

export function VolunteersSection() {
  const [done, setDone]       = useState(false);
  const [selected, setSelected] = useState<VolunteerRole | ''>('');
  const [apiError, setApiError] = useState('');

  const { register, handleSubmit, setError, setValue, formState: { errors, isSubmitting } } =
    useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setApiError('');
    try {
      await post('/volunteers', {
        firstName: data.firstName,
        lastName:  data.lastName,
        email:     data.email,
        role:      data.role,
        reason:    data.reason,
      });
      setDone(true);
    } catch (err) {
      if (err instanceof BackendError) {
        Object.entries(err.fieldErrors).forEach(([field, messages]) => {
          setError(field as keyof FormData, { message: messages[0] });
        });
        if (Object.keys(err.fieldErrors).length === 0) {
          setApiError(err.message || 'Something went wrong. Please try again.');
        }
      } else {
        setApiError('Something went wrong. Please try again.');
      }
    }
  };

  const pick = (id: VolunteerRole) => {
    setSelected(id);
    setValue('role', id, { shouldValidate: true });
  };

  return (
    <section className="relative bg-[#07060f] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.12)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(201,168,76,0.06)_0%,transparent_65%)]" />
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — heading + role picker */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="block w-8 h-px bg-gold-500 opacity-70" />
              <span className="label-eyebrow">Get Involved</span>
            </div>
            <h2 className="font-bricolage font-extrabold text-white text-3xl md:text-4xl tracking-tight leading-tight mb-4">
              Serve With the Ministry
            </h2>
            <p className="font-roboto text-neutral-400 text-sm leading-relaxed max-w-sm mb-8">
              Every gift matters. Join a team of passionate believers advancing the Kingdom
              through music, media, and community outreach.
            </p>

            <p className="font-worksans text-[0.56rem] tracking-[0.18em] uppercase text-neutral-600 mb-4">
              Choose your area *
            </p>
            <div className="grid grid-cols-2 gap-3">
              {roles.map(({ id, icon: Icon, label, desc }) => {
                const active = selected === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => pick(id)}
                    className={cn(
                      'flex flex-col gap-2 p-4 rounded-xl border text-left transition-all duration-200',
                      active
                        ? 'bg-purple-600/20 border-purple-500/50 ring-1 ring-purple-500/20'
                        : 'bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.14]'
                    )}
                  >
                    <Icon className={cn('h-4 w-4', active ? 'text-purple-300' : 'text-neutral-500')} />
                    <p className={cn('font-bricolage font-semibold text-sm', active ? 'text-white' : 'text-white/65')}>
                      {label}
                    </p>
                    <p className="font-roboto text-neutral-600 text-xs">{desc}</p>
                  </button>
                );
              })}
            </div>
            {errors.role && (
              <p className="mt-2 font-worksans text-[0.58rem] text-red-400">{errors.role.message}</p>
            )}
          </div>

          {/* Right — form */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 md:p-8">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center text-center py-10 gap-4"
                >
                  <div className="w-14 h-14 rounded-full bg-green-500/15 flex items-center justify-center">
                    <CheckCircle2 className="h-7 w-7 text-green-400" />
                  </div>
                  <div>
                    <p className="font-bricolage font-bold text-white text-lg mb-1">Welcome to the Team!</p>
                    <p className="font-roboto text-neutral-400 text-sm leading-relaxed max-w-xs">
                      We&apos;ll review your application and be in touch within 3–5 business days.
                    </p>
                  </div>
                  <p className="font-worksans text-[0.52rem] tracking-[0.18em] uppercase text-gold-400">
                    God bless you.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                >
                  <div>
                    <p className="font-bricolage font-bold text-white text-base mb-1">Volunteer Interest</p>
                    <p className="font-roboto text-neutral-500 text-xs">Select a role, then fill in your details.</p>
                  </div>

                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-worksans text-[0.6rem] tracking-[0.18em] uppercase text-neutral-500">
                        First Name *
                      </label>
                      <input
                        type="text"
                        placeholder="First"
                        {...register('firstName')}
                        className="h-11 px-4 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white placeholder:text-neutral-600 font-roboto text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.07] transition-colors duration-200"
                      />
                      {errors.firstName && (
                        <p className="font-worksans text-[0.58rem] text-red-400">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-worksans text-[0.6rem] tracking-[0.18em] uppercase text-neutral-500">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Last"
                        {...register('lastName')}
                        className="h-11 px-4 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white placeholder:text-neutral-600 font-roboto text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.07] transition-colors duration-200"
                      />
                      {errors.lastName && (
                        <p className="font-worksans text-[0.58rem] text-red-400">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-worksans text-[0.6rem] tracking-[0.18em] uppercase text-neutral-500">
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      {...register('email')}
                      className="h-11 px-4 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white placeholder:text-neutral-600 font-roboto text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.07] transition-colors duration-200"
                    />
                    {errors.email && (
                      <p className="font-worksans text-[0.58rem] text-red-400">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Reason */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-worksans text-[0.6rem] tracking-[0.18em] uppercase text-neutral-500">
                      Why do you want to volunteer? *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share your passion, gifting, and why you'd like to serve…"
                      {...register('reason')}
                      className="px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white placeholder:text-neutral-600 font-roboto text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.07] transition-colors duration-200 resize-none"
                    />
                    {errors.reason && (
                      <p className="font-worksans text-[0.58rem] text-red-400">{errors.reason.message}</p>
                    )}
                  </div>

                  <input type="hidden" {...register('role')} />

                  {apiError && (
                    <p className="font-worksans text-[0.58rem] text-red-400">{apiError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'h-11 rounded-xl font-worksans text-xs tracking-[0.18em] uppercase inline-flex items-center justify-center gap-2 transition-all duration-300 mt-1',
                      isSubmitting
                        ? 'bg-purple-800/50 text-white/40 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_4px_16px_rgba(109,40,217,0.3)]'
                    )}
                  >
                    {isSubmitting ? (
                      <><span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Submitting…</>
                    ) : (
                      <>Submit Application <ChevronRight className="h-3.5 w-3.5" /></>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
    </section>
  );
}
