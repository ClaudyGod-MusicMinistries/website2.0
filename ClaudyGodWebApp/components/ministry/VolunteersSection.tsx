'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Heart, Music2, Camera, Megaphone, Laptop, Users,
  CheckCircle2, ChevronRight, Mic2, BookOpen,
} from 'lucide-react';
import { cn } from '@/utils/cn';

// ─── Schema ──────────────────────────────────────────────────────────────────

const volunteerSchema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters'),
  email:    z.string().email('Enter a valid email address'),
  phone:    z.string().optional(),
  role:     z.string().min(1, 'Please select an area of service'),
  message:  z.string().optional(),
});

type VolunteerInput = z.infer<typeof volunteerSchema>;

// ─── Data ─────────────────────────────────────────────────────────────────────

const roles = [
  { id: 'worship',    icon: Mic2,      label: 'Worship Team',       desc: 'Singers, musicians, and instrumentalists' },
  { id: 'media',      icon: Camera,    label: 'Media & Photography', desc: 'Videography, photography, live streaming' },
  { id: 'tech',       icon: Laptop,    label: 'Tech & Production',  desc: 'Sound, lighting, stage management' },
  { id: 'outreach',   icon: Megaphone, label: 'Outreach & Evangelism', desc: 'Community missions and gospel distribution' },
  { id: 'creative',   icon: Music2,    label: 'Creative Arts',      desc: 'Design, branding, and social media' },
  { id: 'teaching',   icon: BookOpen,  label: 'Teaching & Discipleship', desc: 'Bible study and discipleship programmes' },
  { id: 'logistics',  icon: Users,     label: 'Event & Logistics',  desc: 'Event coordination and hospitality' },
  { id: 'prayer',     icon: Heart,     label: 'Prayer Team',        desc: 'Intercession and spiritual covering' },
] as const;

// ─── Input component ─────────────────────────────────────────────────────────

function Field({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-worksans text-[0.6rem] tracking-[0.18em] uppercase text-neutral-500">{label}</label>
      {children}
      {error && <p className="font-worksans text-[0.58rem] text-red-400">{error}</p>}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function VolunteersSection() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VolunteerInput>({ resolver: zodResolver(volunteerSchema) });

  const onSubmit = async (data: VolunteerInput) => {
    await new Promise((r) => setTimeout(r, 900));
    void data;
    setSubmitted(true);
  };

  const handleRoleSelect = (id: string) => {
    setSelectedRole(id);
    setValue('role', id, { shouldValidate: true });
  };

  return (
    <section className="relative bg-[#07060f] overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.14)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(201,168,76,0.07)_0%,transparent_65%)]" />
      </div>

      {/* Top gold line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-20 md:py-28">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="block w-8 h-px bg-gold-500 opacity-70" />
              <span className="label-eyebrow">Get Involved</span>
            </div>
            <h2 className="font-bricolage font-extrabold text-white text-4xl md:text-5xl tracking-tight leading-tight max-w-lg">
              Serve With the Ministry
            </h2>
            <p className="mt-4 font-raleway text-neutral-400 text-base leading-relaxed max-w-lg">
              Are you called to serve? Join a team of passionate believers using their gifts
              to advance the Kingdom. Every hand matters — every gift is needed.
            </p>
          </div>

          {/* Stat pill */}
          <div className="shrink-0 flex items-center gap-3 bg-white/[0.04] border border-white/[0.06] rounded-2xl px-6 py-4">
            <div className="w-10 h-10 rounded-full bg-purple-600/25 flex items-center justify-center">
              <Heart className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="font-bricolage font-bold text-white text-xl leading-none">100+</p>
              <p className="font-worksans text-[0.52rem] tracking-[0.14em] uppercase text-neutral-500 mt-1">Active Volunteers</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16">

          {/* Left — Role selection */}
          <div>
            <p className="font-worksans text-[0.56rem] tracking-[0.18em] uppercase text-neutral-600 mb-5">
              Choose Your Area of Service
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {roles.map(({ id, icon: Icon, label, desc }) => {
                const active = selectedRole === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleRoleSelect(id)}
                    className={cn(
                      'group flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-250',
                      active
                        ? 'bg-purple-600/20 border-purple-500/50 ring-1 ring-purple-500/30'
                        : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12]'
                    )}
                  >
                    <div className={cn(
                      'w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-250',
                      active ? 'bg-purple-600/40' : 'bg-white/[0.06] group-hover:bg-white/[0.10]'
                    )}>
                      <Icon className={cn('h-4 w-4', active ? 'text-purple-300' : 'text-neutral-400 group-hover:text-neutral-200')} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        'font-bricolage font-semibold text-sm leading-snug transition-colors duration-200',
                        active ? 'text-white' : 'text-white/70 group-hover:text-white/90'
                      )}>{label}</p>
                      <p className="font-raleway text-neutral-500 text-xs leading-relaxed mt-0.5">{desc}</p>
                    </div>
                    {active && (
                      <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
            {errors.role && (
              <p className="mt-2 font-worksans text-[0.58rem] text-red-400">{errors.role.message}</p>
            )}
          </div>

          {/* Right — Form */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 md:p-8 h-fit">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center py-8 gap-5"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bricolage font-bold text-white text-xl mb-2">Welcome to the Team!</h3>
                    <p className="font-raleway text-neutral-400 text-sm leading-relaxed max-w-xs">
                      Your interest has been received. Our team will reach out within 3–5 business days
                      with next steps.
                    </p>
                  </div>
                  <p className="font-worksans text-[0.52rem] tracking-[0.16em] uppercase text-gold-400">
                    God bless you for stepping up.
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
                    <p className="font-bricolage font-bold text-white text-lg leading-tight mb-1">
                      Volunteer Interest Form
                    </p>
                    <p className="font-raleway text-neutral-500 text-xs leading-relaxed">
                      Fill in your details and we&apos;ll be in touch.
                    </p>
                  </div>

                  <Field label="Full Name *" error={errors.name?.message}>
                    <input
                      {...register('name')}
                      placeholder="Your full name"
                      className="h-11 px-4 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white placeholder:text-neutral-600 font-raleway text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.07] transition-colors duration-200"
                    />
                  </Field>

                  <Field label="Email Address *" error={errors.email?.message}>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="your@email.com"
                      className="h-11 px-4 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white placeholder:text-neutral-600 font-raleway text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.07] transition-colors duration-200"
                    />
                  </Field>

                  <Field label="Phone Number" error={errors.phone?.message}>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="+234 800 000 0000"
                      className="h-11 px-4 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white placeholder:text-neutral-600 font-raleway text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.07] transition-colors duration-200"
                    />
                  </Field>

                  <Field label="Tell Us More (Optional)" error={errors.message?.message}>
                    <textarea
                      {...register('message')}
                      rows={3}
                      placeholder="Your skills, availability, or anything you'd like us to know…"
                      className="px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white placeholder:text-neutral-600 font-raleway text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.07] transition-colors duration-200 resize-none"
                    />
                  </Field>

                  {/* Hidden role field registered via setValue */}
                  <input type="hidden" {...register('role')} />

                  {!selectedRole && (
                    <p className="font-raleway text-neutral-500 text-xs bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3">
                      Select an area of service on the left to complete your application.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'h-12 rounded-xl font-worksans text-xs tracking-[0.18em] uppercase inline-flex items-center justify-center gap-2.5 transition-all duration-300',
                      isSubmitting
                        ? 'bg-purple-800/60 text-white/50 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_4px_20px_rgba(109,40,217,0.35)] hover:shadow-[0_6px_28px_rgba(109,40,217,0.5)]'
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ChevronRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
    </section>
  );
}
