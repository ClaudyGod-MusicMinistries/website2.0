'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CheckCircle2, ShieldCheck, Copy, Check } from 'lucide-react';
import { usePaystackPayment } from 'react-paystack';
import { cn } from '@/utils/cn';
import { ministryStats, donationTiers } from '@/data/ministryStats';

const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? '';
const presets = donationTiers;

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: [0.16, 1, 0.3, 1] } }),
};

function InputField({
  label, required, id, error, children,
}: {
  label: string; required?: boolean; id: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-bricolage font-semibold text-neutral-800 text-sm block mb-2">
        {label}{required && <span className="text-purple-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function DonateClient() {
  const [amount,    setAmount]    = useState<number>(50);
  const [custom,    setCustom]    = useState('');
  const [name,      setName]      = useState('');
  const [email,     setEmail]     = useState('');
  const [message,   setMessage]   = useState('');
  const [errors,    setErrors]    = useState<Record<string, string>>({});
  const [txRef,     setTxRef]     = useState('');
  const [txAmount,  setTxAmount]  = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [copied,    setCopied]    = useState(false);

  const finalAmount = custom ? parseFloat(custom) || 0 : amount;
  const amountValid = finalAmount >= 1;

  const initializePayment = usePaystackPayment({ publicKey: PAYSTACK_KEY });

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2)
      errs.name = 'Please enter your name';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = 'Please enter a valid email address';
    if (!amountValid)
      errs.amount = 'Please select or enter a valid amount';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePay = () => {
    if (!validate()) return;
    const reference = `CGM-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    initializePayment({
      config: {
        email,
        amount: Math.round(finalAmount * 100),
        currency: 'USD',
        reference,
        firstname: name.split(' ')[0],
        lastname:  name.split(' ').slice(1).join(' ') || undefined,
        metadata: {
          custom_fields: [
            { display_name: 'Donor Name', variable_name: 'donor_name', value: name },
            ...(message ? [{ display_name: 'Message', variable_name: 'message', value: message }] : []),
          ],
        },
      },
      onSuccess: (response: unknown) => {
        const ref = (response as { reference?: string })?.reference ?? reference;
        setTxRef(ref);
        setTxAmount(finalAmount);
        setSubmitted(true);
        fetch(`/api/payments/verify?reference=${encodeURIComponent(ref)}`).catch(() => {});
      },
      onClose: () => { /* dismissed by user */ },
    });
  };

  const copyRef = () => {
    navigator.clipboard.writeText(txRef).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const reset = () => {
    setSubmitted(false);
    setAmount(50);
    setCustom('');
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
    setTxRef('');
  };

  return (
    <div>

      {/* Impact stats banner */}
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-2 md:grid-cols-4 gap-px mb-14 rounded-2xl overflow-hidden bg-white/10"
      >
        {ministryStats.map(({ icon: Icon, stat, label }, i) => (
          <motion.div
            key={label}
            custom={i * 0.08}
            variants={fadeUp}
            className="flex flex-col items-center gap-2.5 py-8 px-6 bg-gradient-to-br from-purple-700 to-purple-800 text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-purple-200" />
            </div>
            <p className="font-abril text-white text-4xl md:text-5xl leading-none">{stat}</p>
            <p className="font-worksans text-xs tracking-[0.18em] uppercase text-purple-200">{label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* ── Left — why + presets ── */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        >
          <motion.div custom={0} variants={fadeUp} className="flex items-center gap-4 mb-5">
            <span className="rule-gold" />
            <span className="label-eyebrow">Your Gift Matters</span>
          </motion.div>

          <motion.h2 custom={0.1} variants={fadeUp}
            className="font-bricolage font-extrabold text-neutral-900 text-4xl md:text-5xl tracking-tight leading-tight mb-5"
          >
            Partner With the <span className="text-purple-600">Mission</span>
          </motion.h2>

          <motion.p custom={0.2} variants={fadeUp}
            className="font-raleway text-neutral-500 text-base leading-relaxed mb-10"
          >
            ClaudyGod Music Ministries spreads the love of God through spirit-filled music, teachings, and
            community outreach. Your donation funds music production, ministry tours, and free worship events
            across Nigeria and beyond.
          </motion.p>

          <motion.div custom={0.3} variants={fadeUp} className="space-y-2.5">
            <p className="font-bricolage font-bold text-neutral-700 text-sm uppercase tracking-widest mb-4">
              What your gift does
            </p>
            {presets.map(({ value, label, note }) => (
              <button
                key={value}
                type="button"
                onClick={() => { setAmount(value); setCustom(''); setErrors((e) => ({ ...e, amount: '' })); }}
                className={cn(
                  'w-full flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all duration-200 group',
                  amount === value && !custom
                    ? 'bg-purple-50 border-purple-300 shadow-[0_2px_12px_rgba(124,58,237,0.12)]'
                    : 'bg-white border-neutral-200 hover:border-purple-200 hover:bg-purple-50/40'
                )}
              >
                <span className={cn(
                  'font-bricolage font-extrabold text-xl w-16 shrink-0 transition-colors',
                  amount === value && !custom ? 'text-purple-700' : 'text-neutral-800 group-hover:text-purple-600',
                )}>
                  {label}
                </span>
                <span className="w-px h-8 bg-neutral-200 shrink-0" />
                <span className="font-raleway text-neutral-500 text-sm leading-snug">{note}</span>
                {amount === value && !custom && (
                  <span className="ml-auto shrink-0 w-2 h-2 rounded-full bg-purple-500" />
                )}
              </button>
            ))}
          </motion.div>

          {/* Scripture */}
          <motion.blockquote custom={0.5} variants={fadeUp}
            className="mt-10 font-raleway italic text-neutral-500 text-sm leading-relaxed border-l-2 border-gold-500/40 pl-5"
          >
            &ldquo;Give, and it will be given to you. A good measure, pressed down, shaken together and
            running over, will be poured into your lap.&rdquo;
            <span className="not-italic block mt-2 font-worksans text-xs tracking-[0.16em] uppercase text-gold-500/70">
              Luke 6:38
            </span>
          </motion.blockquote>
        </motion.div>

        {/* ── Right — donation form card ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-white rounded-2xl shadow-[0_8px_48px_rgba(0,0,0,0.10)] border border-neutral-100 overflow-hidden">

            {/* Card header */}
            <div className="bg-gradient-to-r from-purple-700 to-purple-600 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white fill-white/80" />
                </div>
                <div>
                  <p className="font-bricolage font-bold text-white text-lg leading-tight">Make a Donation</p>
                  <p className="font-worksans text-xs tracking-[0.16em] uppercase text-purple-200 mt-0.5">Secure · All gifts support the ministry</p>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                /* ── Success state ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center px-8 py-14 gap-6"
                >
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center">
                      <CheckCircle2 className="h-12 w-12 text-green-500" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bricolage font-extrabold text-neutral-900 text-3xl mb-2">
                      Thank You!
                    </h3>
                    <p className="font-raleway text-neutral-500 text-base leading-relaxed max-w-xs">
                      Your gift of{' '}
                      <strong className="font-bricolage font-bold text-purple-600 text-lg">
                        ${txAmount}
                      </strong>{' '}
                      is sowing into the kingdom. God bless you abundantly.
                    </p>
                  </div>

                  {txRef && (
                    <div className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4">
                      <p className="font-worksans text-xs tracking-[0.16em] uppercase text-neutral-400 mb-2">
                        Transaction Reference
                      </p>
                      <div className="flex items-center justify-between gap-3">
                        <code className="font-bricolage font-semibold text-neutral-700 text-sm truncate">
                          {txRef}
                        </code>
                        <button
                          onClick={copyRef}
                          className="shrink-0 p-1.5 rounded-lg hover:bg-neutral-200 transition-colors text-neutral-400 hover:text-neutral-700"
                          aria-label="Copy reference"
                        >
                          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={reset}
                    className="font-worksans text-sm tracking-[0.12em] uppercase text-purple-600 hover:text-purple-800 underline underline-offset-4 transition-colors"
                  >
                    Give Again
                  </button>
                </motion.div>
              ) : (
                /* ── Donation form ── */
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-8 py-8 space-y-6">

                  {/* Amount presets */}
                  <div>
                    <p className="font-bricolage font-bold text-neutral-800 text-sm uppercase tracking-widest mb-3">
                      Select Amount
                    </p>
                    <div className="grid grid-cols-3 gap-2.5 mb-4">
                      {presets.map(({ value, label }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => { setAmount(value); setCustom(''); setErrors((e) => ({ ...e, amount: '' })); }}
                          className={cn(
                            'h-12 font-bricolage font-extrabold text-base rounded-xl border transition-all duration-200',
                            amount === value && !custom
                              ? 'bg-purple-600 border-purple-600 text-white shadow-[0_4px_14px_rgba(124,58,237,0.35)]'
                              : 'border-neutral-200 text-neutral-700 hover:border-purple-400 hover:text-purple-700 bg-white'
                          )}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    {/* Custom amount */}
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bricolage font-bold text-neutral-400 text-base pointer-events-none">
                        $
                      </span>
                      <input
                        type="number"
                        min="1"
                        placeholder="Custom amount"
                        value={custom}
                        onChange={(e) => {
                          setCustom(e.target.value);
                          setAmount(0);
                          setErrors((er) => ({ ...er, amount: '' }));
                        }}
                        className="w-full h-12 pl-9 pr-4 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 font-raleway text-sm focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/10 transition-all duration-200"
                      />
                    </div>
                    {errors.amount && (
                      <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />
                        {errors.amount}
                      </p>
                    )}
                  </div>

                  {/* Selected amount display */}
                  {amountValid && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between bg-purple-50 border border-purple-100 rounded-xl px-5 py-3.5"
                    >
                      <span className="font-worksans text-sm tracking-wide text-purple-600 uppercase">Your gift</span>
                      <span className="font-bricolage font-extrabold text-purple-700 text-2xl">${finalAmount}</span>
                    </motion.div>
                  )}

                  {/* Donor name */}
                  <InputField label="Your Name" required id="donor-name" error={errors.name}>
                    <input
                      id="donor-name"
                      type="text"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setErrors((er) => ({ ...er, name: '' })); }}
                      className="w-full h-12 px-4 bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 font-raleway text-sm rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/10 transition-all duration-200"
                    />
                  </InputField>

                  {/* Email */}
                  <InputField label="Email Address" required id="donor-email" error={errors.email}>
                    <input
                      id="donor-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrors((er) => ({ ...er, email: '' })); }}
                      className="w-full h-12 px-4 bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 font-raleway text-sm rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/10 transition-all duration-200"
                    />
                  </InputField>

                  {/* Message */}
                  <div>
                    <label htmlFor="donor-message" className="font-bricolage font-semibold text-neutral-800 text-sm block mb-2">
                      Message{' '}
                      <span className="font-raleway font-normal text-neutral-400 text-sm">(optional)</span>
                    </label>
                    <textarea
                      id="donor-message"
                      rows={3}
                      placeholder="Leave a word of encouragement…"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 font-raleway text-sm rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/10 transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* CTA */}
                  <button
                    type="button"
                    onClick={handlePay}
                    className="w-full h-14 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white font-bricolage font-bold text-lg rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_4px_24px_rgba(124,58,237,0.40)] hover:shadow-[0_8px_32px_rgba(124,58,237,0.50)] active:scale-[0.99]"
                  >
                    <Heart className="h-5 w-5 fill-white/90" />
                    {amountValid ? `Give $${finalAmount} Now` : 'Select an Amount'}
                  </button>

                  {/* Trust line */}
                  <div className="flex items-center justify-center gap-2 pt-1">
                    <ShieldCheck className="h-4 w-4 text-neutral-400" />
                    <p className="font-raleway text-neutral-400 text-xs text-center">
                      Secured by Paystack · Card, Bank Transfer &amp; Mobile Money accepted
                    </p>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
