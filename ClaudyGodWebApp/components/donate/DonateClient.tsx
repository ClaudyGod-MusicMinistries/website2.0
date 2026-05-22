'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CheckCircle2, Shield, Globe, Smartphone, Building2 } from 'lucide-react';
import { cn } from '@/utils/cn';

const presets = [10, 25, 50, 100, 250, 500];

const impactItems = [
  { amount: '$10',  label: 'Produces one worship song',      icon: '🎵' },
  { amount: '$25',  label: 'Funds outreach event materials',  icon: '📦' },
  { amount: '$50',  label: 'Sponsors a ministry tour stop',   icon: '🚌' },
  { amount: '$100', label: 'Supports full album production',  icon: '🎙️' },
  { amount: '$250', label: 'Covers a live concert event',     icon: '🎤' },
  { amount: '$500', label: 'Funds a full ministry campaign',  icon: '✝️' },
];

const paymentMethods = [
  { id: 'card',    label: 'Card',          icon: Shield,    sub: 'Visa · Mastercard · Amex' },
  { id: 'paypal',  label: 'PayPal',        icon: Globe,     sub: 'Pay with PayPal' },
  { id: 'mobile',  label: 'Mobile Money',  icon: Smartphone, sub: 'MTN · Airtel · Glo' },
  { id: 'bank',    label: 'Bank Transfer', icon: Building2, sub: 'Nigerian bank transfer' },
];

const stats = [
  { number: '20+', label: 'Years of Ministry' },
  { number: '7',   label: 'Albums Produced' },
  { number: '50+', label: 'Nations Reached' },
  { number: '∞',   label: 'Lives Touched' },
];

export function DonateClient() {
  const [amount,    setAmount]    = useState<number | null>(25);
  const [custom,    setCustom]    = useState('');
  const [message,   setMessage]   = useState('');
  const [payment,   setPayment]   = useState('card');
  const [submitted, setSubmitted] = useState(false);

  const finalAmount = custom ? parseFloat(custom) : amount;
  const valid = !!(finalAmount && !isNaN(finalAmount) && finalAmount > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setSubmitted(true);
  };

  return (
    <div>
      {/* Impact stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-raleway font-bold text-white text-3xl md:text-4xl mb-1">{s.number}</p>
            <p className="font-worksans text-[0.58rem] tracking-[0.18em] uppercase text-purple-200">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

        {/* Left — Why donate + impact */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="rule-gold" />
            <span className="label-eyebrow">Your Gift Matters</span>
          </div>
          <h2 className="font-raleway font-bold text-neutral-900 text-3xl md:text-4xl tracking-tight leading-tight mb-5">
            Partner with the <span className="text-purple-600">Mission</span>
          </h2>
          <p className="font-raleway text-neutral-500 text-base leading-relaxed mb-10">
            ClaudyGod Music Ministries exists to spread the love of God through spirit-filled music, teachings, and community outreach. Your donation funds music production, ministry tours, and free worship events across Nigeria and the world.
          </p>

          {/* Impact list */}
          <div className="space-y-3">
            {impactItems.map((it) => (
              <button
                key={it.amount}
                onClick={() => { setAmount(parseInt(it.amount.replace('$', ''))); setCustom(''); }}
                className={cn(
                  'w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-300 group',
                  finalAmount === parseInt(it.amount.replace('$', '')) && !custom
                    ? 'bg-purple-50 border-purple-300 shadow-[0_2px_12px_rgba(124,58,237,0.12)]'
                    : 'bg-white border-neutral-200 hover:border-purple-200 hover:bg-purple-50/40'
                )}
              >
                <span className="text-2xl w-10 text-center shrink-0">{it.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className="font-raleway font-semibold text-neutral-900 text-sm">{it.label}</span>
                </div>
                <span className={cn(
                  'font-raleway font-bold text-lg shrink-0 transition-colors duration-300',
                  finalAmount === parseInt(it.amount.replace('$', '')) && !custom
                    ? 'text-purple-600'
                    : 'text-gold-500 group-hover:text-purple-600'
                )}>
                  {it.amount}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right — donation form */}
        <div>
          <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.08)] border border-neutral-100 p-8">

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center py-12 gap-5"
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-raleway font-bold text-neutral-900 text-2xl mb-2">
                      Thank You!
                    </h3>
                    <p className="font-raleway text-neutral-500 text-base leading-relaxed max-w-xs">
                      Your gift of <strong className="text-purple-600">${finalAmount}</strong> is sowing into the kingdom. God bless you abundantly.
                    </p>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setAmount(25); setCustom(''); setMessage(''); }}
                    className="font-worksans text-xs tracking-[0.15em] uppercase text-purple-600 hover:text-purple-800 underline underline-offset-4 transition-colors"
                  >
                    Give Again
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                >
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-raleway font-semibold text-neutral-900 text-base">Make a Donation</p>
                      <p className="font-worksans text-[0.5rem] tracking-[0.12em] uppercase text-neutral-400">Secure · Anonymous option available</p>
                    </div>
                  </div>

                  {/* Amount presets */}
                  <label className="font-worksans text-xs tracking-[0.15em] uppercase text-neutral-600 block mb-3">
                    Select Amount
                  </label>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {presets.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => { setAmount(p); setCustom(''); }}
                        className={cn(
                          'h-12 font-worksans text-sm font-semibold tracking-wide rounded-xl border transition-all duration-300',
                          amount === p && !custom
                            ? 'bg-purple-600 border-purple-600 text-white shadow-[0_4px_14px_rgba(124,58,237,0.35)]'
                            : 'border-neutral-200 text-neutral-600 hover:border-purple-400 hover:text-purple-700 bg-white'
                        )}
                      >
                        ${p}
                      </button>
                    ))}
                  </div>

                  {/* Custom amount */}
                  <div className="mb-5">
                    <label className="font-worksans text-xs tracking-[0.15em] uppercase text-neutral-600 block mb-2">
                      Custom Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-raleway font-semibold text-neutral-400 text-base">$</span>
                      <input
                        type="number"
                        min="1"
                        placeholder="Enter amount"
                        value={custom}
                        onChange={(e) => { setCustom(e.target.value); setAmount(null); }}
                        className="w-full h-12 pl-9 pr-4 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 font-raleway text-sm focus:outline-none focus:border-purple-400 focus:bg-white transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Current selection display */}
                  {valid && (
                    <div className="bg-purple-50 border border-purple-100 rounded-xl px-4 py-3 mb-5 flex items-center justify-between">
                      <span className="font-worksans text-xs tracking-[0.1em] uppercase text-purple-600">Your gift</span>
                      <span className="font-raleway font-bold text-purple-700 text-xl">${finalAmount}</span>
                    </div>
                  )}

                  {/* Payment method */}
                  <label className="font-worksans text-xs tracking-[0.15em] uppercase text-neutral-600 block mb-3">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {paymentMethods.map((m) => {
                      const Icon = m.icon;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPayment(m.id)}
                          className={cn(
                            'flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all duration-300',
                            payment === m.id
                              ? 'bg-purple-50 border-purple-300'
                              : 'bg-white border-neutral-200 hover:border-neutral-300'
                          )}
                        >
                          <Icon className={cn('h-4 w-4 shrink-0', payment === m.id ? 'text-purple-600' : 'text-neutral-400')} />
                          <div>
                            <p className={cn('font-worksans text-[0.6rem] tracking-[0.08em] font-semibold', payment === m.id ? 'text-purple-700' : 'text-neutral-700')}>
                              {m.label}
                            </p>
                            <p className="font-worksans text-[0.48rem] tracking-wide text-neutral-400">{m.sub}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label className="font-worksans text-xs tracking-[0.15em] uppercase text-neutral-600 block mb-2">
                      Message <span className="normal-case tracking-normal text-neutral-400 font-raleway text-xs">(optional)</span>
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      placeholder="Leave a note of encouragement…"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 font-raleway text-sm focus:outline-none focus:border-purple-400 focus:bg-white transition-all duration-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!valid}
                    className="w-full h-14 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-worksans text-sm font-semibold tracking-[0.1em] uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:shadow-[0_6px_28px_rgba(124,58,237,0.5)]"
                  >
                    <Heart className="h-4 w-4" />
                    {valid ? `Give $${finalAmount} Now` : 'Select an Amount'}
                  </button>

                  <p className="mt-4 font-raleway text-neutral-400 text-xs text-center leading-relaxed">
                    🔒 Secure payment · All gifts support ClaudyGod Music Ministries
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
