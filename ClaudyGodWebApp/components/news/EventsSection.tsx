'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Calendar, ExternalLink, CheckCircle2, Users, Star, Mic2, Ticket } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { post, BackendError } from '@/utils/apiClient';
import type { EventShape } from '@/lib/backendFetch';

interface TicketFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  quantity: number;
  eventId: string;
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day:  d.toLocaleDateString('en-GB',  { day: '2-digit' }),
    mon:  d.toLocaleDateString('en-GB',  { month: 'short' }).toUpperCase(),
    full: d.toLocaleDateString('en-US',  { year: 'numeric', month: 'long', day: 'numeric' }),
    past: d < new Date(),
  };
}

function isUUID(id: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

/* ── Featured highlight card ─────────────────────────────────────────────── */
function FeaturedEventCard({ event }: { event: EventShape }) {
  const { day, mon, full, past } = formatDate(event.date);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.14)] group"
    >
      <div className="relative h-[420px] md:h-[520px]">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
      </div>

      <div className="absolute top-6 left-6">
        <span className="inline-flex items-center gap-1.5 bg-gold-500 text-black font-worksans text-[0.58rem] tracking-[0.18em] uppercase px-4 py-1.5 rounded-full font-semibold shadow-lg">
          <Star className="h-3 w-3 fill-current" />
          Featured Event
        </span>
      </div>

      {past && (
        <div className="absolute top-6 right-6">
          <span className="bg-black/60 text-white/60 font-worksans text-[0.52rem] tracking-[0.14em] uppercase px-3 py-1.5 rounded-full backdrop-blur-sm">
            Past Event
          </span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="bg-white rounded-xl px-4 py-2 text-center shadow-lg">
                <p className="font-bricolage font-bold text-neutral-900 text-2xl leading-none">{day}</p>
                <p className="font-worksans text-[0.48rem] tracking-[0.16em] uppercase text-purple-600 mt-0.5">{mon}</p>
              </div>
              <div>
                <p className="font-worksans text-[0.58rem] tracking-[0.14em] uppercase text-white/60 mb-0.5">{full}</p>
                <p className="font-worksans text-[0.58rem] tracking-[0.14em] uppercase text-gold-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />{event.time}
                </p>
              </div>
            </div>

            <h3 className="font-bricolage font-bold text-white text-3xl md:text-4xl tracking-tight leading-tight mb-2">
              {event.title}
            </h3>
            <p className="flex items-center gap-1.5 font-raleway text-white/70 text-sm">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-400" />
              {event.venue}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            {!past && event.ticketUrl !== '#' && (
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-worksans text-[0.62rem] tracking-[0.2em] uppercase bg-gold-500 hover:bg-gold-400 text-black font-semibold px-7 h-11 rounded-xl transition-all duration-300 shadow-lg"
              >
                Get Tickets <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {!past && isUUID(event.id) && (
              <a
                href="#register"
                className="inline-flex items-center gap-2 font-worksans text-[0.62rem] tracking-[0.2em] uppercase bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/25 text-white px-7 h-11 rounded-xl transition-all duration-300"
              >
                Reserve Ticket
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Compact tour date card ───────────────────────────────────────────────── */
function TourCard({ event, index }: { event: EventShape; index: number }) {
  const { day, mon, full, past } = formatDate(event.date);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-neutral-200 hover:border-purple-300 bg-white hover:shadow-[0_8px_32px_rgba(124,58,237,0.08)] transition-all duration-300"
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
          sizes="(max-width:768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-black/5" />
        <div className="absolute top-4 left-4 bg-white rounded-xl px-3 py-2 text-center shadow-lg">
          <p className="font-bricolage font-bold text-neutral-900 text-xl leading-none">{day}</p>
          <p className="font-worksans text-[0.48rem] tracking-[0.15em] uppercase text-purple-600 mt-0.5">{mon}</p>
        </div>
        {past && (
          <span className="absolute top-4 right-4 font-worksans text-[0.5rem] tracking-[0.14em] uppercase bg-black/60 text-white/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
            Past
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bricolage font-bold text-neutral-900 text-lg mb-1 group-hover:text-purple-700 transition-colors duration-300">
          {event.title}
        </h3>
        <p className="flex items-center gap-1.5 font-worksans text-[0.56rem] tracking-[0.1em] uppercase text-neutral-400 mb-2">
          <MapPin className="h-3 w-3 shrink-0" />{event.venue}
        </p>
        <div className="flex items-center gap-4 mb-4">
          <span className="flex items-center gap-1.5 font-worksans text-[0.54rem] tracking-[0.1em] uppercase text-neutral-400">
            <Calendar className="h-3 w-3" />{full}
          </span>
          <span className="flex items-center gap-1.5 font-worksans text-[0.54rem] tracking-[0.1em] uppercase text-neutral-400">
            <Clock className="h-3 w-3" />{event.time}
          </span>
        </div>
        <div className="flex gap-2.5">
          {!past && event.ticketUrl !== '#' && (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-worksans text-[0.58rem] tracking-[0.16em] uppercase bg-purple-600 hover:bg-purple-700 text-white px-5 h-9 rounded-xl transition-all duration-300"
            >
              Tickets <ExternalLink className="h-3 w-3" />
            </a>
          )}
          {!past && isUUID(event.id) && (
            <a
              href="#register"
              className="inline-flex items-center gap-1.5 font-worksans text-[0.58rem] tracking-[0.16em] uppercase border border-neutral-300 hover:border-purple-400 text-neutral-600 hover:text-purple-700 px-5 h-9 rounded-xl transition-all duration-300"
            >
              Reserve
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Ticket reservation form ─────────────────────────────────────────────── */
function TicketForm({ events }: { events: EventShape[] }) {
  const upcoming   = events.filter((e) => !formatDate(e.date).past);
  const backendEvt = upcoming.filter((e) => isUUID(e.id));

  const [formStatus, setFormStatus]             = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedId, setSelectedId]             = useState<string>(backendEvt[0]?.id ?? upcoming[0]?.id ?? '');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [apiError, setApiError]                 = useState('');

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TicketFormData>({ defaultValues: { quantity: 1, eventId: selectedId } });

  const onSubmit = async (data: TicketFormData) => {
    setApiError('');
    try {
      const result = await post<{ confirmationCode: string }>('/tickets', {
        eventId:   selectedId,
        firstName: data.firstName,
        lastName:  data.lastName,
        email:     data.email,
        phone:     data.phone,
        quantity:  data.quantity,
      });
      setConfirmationCode(result.confirmationCode ?? '');
      setFormStatus('success');
      reset();
    } catch (err) {
      if (err instanceof BackendError) {
        Object.entries(err.fieldErrors).forEach(([field, messages]) => {
          setError(field as keyof TicketFormData, { message: messages[0] });
        });
        if (Object.keys(err.fieldErrors).length === 0) {
          setApiError(err.message || 'Something went wrong. Please try again.');
        }
      } else {
        setApiError('Something went wrong. Please try again.');
      }
      setFormStatus('error');
    }
  };

  const inputCls =
    'w-full h-11 px-4 border border-neutral-200 rounded-xl font-raleway text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-300 bg-white';
  const errCls = 'mt-1 font-worksans text-[0.58rem] tracking-[0.08em] uppercase text-red-500';

  // If no backend events exist yet, show a simple "coming soon" panel
  const hasBackendEvents = backendEvt.length > 0;

  return (
    <div id="register" className="bg-[#0d0b1a] rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="relative px-8 pt-10 pb-8 border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.2)_0%,transparent_65%)] pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gold-500/15 border border-gold-500/20 flex items-center justify-center">
              <Mic2 className="h-3.5 w-3.5 text-gold-400" />
            </div>
            <span className="label-eyebrow text-gold-400/80">
              {hasBackendEvents ? 'Reserve Your Ticket' : 'Event Registration'}
            </span>
          </div>
          <h3 className="font-bricolage font-bold text-white text-2xl md:text-3xl tracking-tight mb-2">
            {hasBackendEvents ? 'Secure Your Spot' : 'Register for a Tour Date'}
          </h3>
          <p className="font-raleway text-neutral-400 text-sm leading-relaxed max-w-md">
            {hasBackendEvents
              ? 'Reserve your ticket now. A confirmation code will be sent to your email.'
              : "Express your interest and we'll send you updates, reminders, and exclusive information."}
          </p>

          <div className="mt-6 flex flex-wrap gap-6">
            {[
              { icon: Users,       label: `${upcoming.length} upcoming event${upcoming.length !== 1 ? 's' : ''}` },
              { icon: CheckCircle2, label: hasBackendEvents ? 'Instant confirmation' : 'Free to register' },
              { icon: Ticket,      label: hasBackendEvents ? `${backendEvt[0]?.availableSeats ?? 0} seats left` : 'Email updates included' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                <span className="font-worksans text-[0.6rem] tracking-[0.1em] uppercase text-neutral-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form / Success */}
      <div className="px-8 py-8">
        <AnimatePresence mode="wait">
          {formStatus === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center gap-5 py-8"
            >
              <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-gold-400" />
              </div>
              <div>
                <p className="font-bricolage font-bold text-white text-xl mb-2">You&apos;re Registered!</p>
                {confirmationCode && (
                  <div className="mt-3 mb-4 px-6 py-3 bg-purple-600/10 border border-purple-500/20 rounded-xl">
                    <p className="font-worksans text-[0.55rem] tracking-[0.15em] uppercase text-neutral-400 mb-1">Confirmation Code</p>
                    <p className="font-bricolage font-bold text-white text-lg tracking-widest">{confirmationCode}</p>
                  </div>
                )}
                <p className="font-raleway text-neutral-400 text-sm leading-relaxed max-w-sm">
                  Check your inbox — we&apos;ve sent your ticket details and confirmation.
                </p>
              </div>
              <button
                onClick={() => { setFormStatus('idle'); setConfirmationCode(''); }}
                className="font-worksans text-[0.6rem] tracking-[0.16em] uppercase text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                Reserve another ticket
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-4"
            >
              {/* Event selector */}
              {upcoming.length > 0 && (
                <div>
                  <label className="block font-worksans text-[0.6rem] tracking-[0.12em] uppercase text-neutral-400 mb-2">
                    Select Event *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {upcoming.map((event) => {
                      const { full } = formatDate(event.date);
                      const isSelected = selectedId === event.id;
                      return (
                        <button
                          key={event.id}
                          type="button"
                          onClick={() => setSelectedId(event.id)}
                          className={`text-left px-4 py-3 rounded-xl border transition-all duration-300 ${
                            isSelected
                              ? 'border-purple-500/60 bg-purple-600/10 ring-1 ring-purple-500/30'
                              : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                          }`}
                        >
                          <p className={`font-bricolage font-semibold text-sm ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                            {event.title}
                          </p>
                          <p className="font-worksans text-[0.52rem] tracking-[0.1em] uppercase text-neutral-500 mt-0.5">
                            {full} · {event.time}
                          </p>
                          {event.availableSeats > 0 && (
                            <p className="font-worksans text-[0.5rem] tracking-[0.1em] uppercase text-purple-400 mt-1">
                              {event.availableSeats} seats left
                            </p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {errors.eventId && <p className={errCls}>{errors.eventId.message}</p>}
                  <input type="hidden" {...register('eventId')} value={selectedId} />
                </div>
              )}

              {/* Name row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input {...register('firstName')} placeholder="First name" className={inputCls} />
                  {errors.firstName && <p className={errCls}>{errors.firstName.message}</p>}
                </div>
                <div>
                  <input {...register('lastName')} placeholder="Last name" className={inputCls} />
                  {errors.lastName && <p className={errCls}>{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <input {...register('email')} type="email" placeholder="Email address" className={inputCls} />
                {errors.email && <p className={errCls}>{errors.email.message}</p>}
              </div>

              <div>
                <input {...register('phone')} type="tel" placeholder="Phone number" className={inputCls} />
                {errors.phone && <p className={errCls}>{errors.phone.message}</p>}
              </div>

              {/* Quantity */}
              <div>
                <label className="block font-worksans text-[0.6rem] tracking-[0.12em] uppercase text-neutral-400 mb-2">
                  Tickets (1–10)
                </label>
                <input
                  {...register('quantity', { valueAsNumber: true })}
                  type="number"
                  min={1}
                  max={10}
                  defaultValue={1}
                  className={`${inputCls} w-28`}
                />
                {errors.quantity && <p className={errCls}>{errors.quantity.message}</p>}
              </div>

              {apiError && (
                <p className="text-center font-worksans text-[0.58rem] tracking-[0.1em] uppercase text-red-400/80">
                  {apiError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-worksans text-[0.62rem] tracking-[0.22em] uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? 'Processing…' : (
                  <>
                    {hasBackendEvents ? 'Reserve Ticket' : 'Register My Spot'}
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </>
                )}
              </button>

              <p className="text-center font-raleway text-xs text-neutral-600">
                {hasBackendEvents
                  ? 'A confirmation email will be sent immediately after reserving.'
                  : 'Registration is free and non-binding. Ticket information will be sent separately.'}
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Main exported section ────────────────────────────────────────────────── */
export function EventsSection({ events }: { events: EventShape[] }) {
  const upcoming = events.filter((e) => !formatDate(e.date).past);
  const past     = events.filter((e) => formatDate(e.date).past);
  const featured = upcoming[0] ?? events[0];

  if (!featured) return null;

  return (
    <div className="space-y-0">
      {/* Tour Highlights — featured event */}
      <section className="bg-white section-py">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="rule-gold" />
            <span className="label-eyebrow">Tour Highlights</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <h2 className="font-bricolage font-bold text-neutral-900 text-3xl md:text-4xl tracking-tight">
              2025 Ministry Tour
            </h2>
            {upcoming.length > 0 && (
              <p className="font-raleway text-neutral-500 text-sm">
                {upcoming.length} upcoming event{upcoming.length !== 1 ? 's' : ''} remaining
              </p>
            )}
          </div>

          <div className="mb-10">
            <FeaturedEventCard event={featured} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {events.map((event, i) => (
              <TourCard key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Registration / Ticket reservation portal */}
      <section className="bg-cream-100 section-py border-t border-black/[0.05]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left: context */}
            <div className="lg:pt-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="rule-gold" />
                <span className="label-eyebrow">Join the Tour</span>
              </div>
              <h2 className="font-bricolage font-bold text-neutral-900 text-3xl md:text-4xl tracking-tight leading-tight mb-6">
                Be Part of Every Moment
              </h2>
              <p className="font-raleway text-neutral-600 text-base leading-[1.85] mb-8">
                Register for upcoming ministry events. Get instant confirmation, early notifications, and spiritual preparation guides delivered to your inbox.
              </p>

              <div className="space-y-5">
                {[
                  { title: 'Instant Confirmation',  body: 'Receive a unique confirmation code for each ticket reserved.' },
                  { title: 'Event Reminders',        body: 'Automated reminders 7 days and 24 hours before the event.' },
                  { title: 'Exclusive Content',      body: 'Pre-event worship guides sent directly to registered attendees.' },
                ].map(({ title, body }) => (
                  <div key={title} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 shrink-0" />
                    <div>
                      <p className="font-bricolage font-semibold text-neutral-800 text-sm leading-snug">{title}</p>
                      <p className="font-raleway text-neutral-500 text-sm leading-relaxed mt-0.5">{body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {past.length > 0 && (
                <div className="mt-10 pt-8 border-t border-black/[0.06]">
                  <p className="font-worksans text-[0.6rem] tracking-[0.14em] uppercase text-neutral-400 mb-4">
                    Past Events
                  </p>
                  <div className="space-y-2">
                    {past.map((event) => {
                      const { full } = formatDate(event.date);
                      return (
                        <div key={event.id} className="flex items-center justify-between py-2 border-b border-black/[0.05]">
                          <span className="font-bricolage font-semibold text-neutral-600 text-sm">{event.title}</span>
                          <span className="font-worksans text-[0.54rem] tracking-[0.1em] uppercase text-neutral-400">{full}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right: form */}
            <div>
              <TicketForm events={events} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
