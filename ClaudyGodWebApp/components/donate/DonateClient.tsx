'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/utils/cn';

const presets = [10, 25, 50, 100];

export function DonateClient() {
  const [amount, setAmount] = useState<number | null>(25);
  const [custom, setCustom] = useState('');
  const [message, setMessage] = useState('');

  const finalAmount = custom ? parseFloat(custom) : amount;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

      {/* Why donate */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="rule-gold" />
          <span className="label-eyebrow">Your Gift Matters</span>
        </div>
        <p className="font-raleway font-light text-neutral-900 text-2xl tracking-tight leading-snug mb-6">
          Partner with the Mission
        </p>
        <p className="font-raleway text-neutral-500 text-sm leading-[1.85] font-light mb-6">
          ClaudyGod Music Ministries exists to spread the love of God through spirit-filled
          music, teachings, and community outreach. Your generous donation helps fund music
          production, ministry tours, and free worship events around the world.
        </p>
        <div className="space-y-4">
          {[
            { amount: '$10', label: 'Helps produce one worship song' },
            { amount: '$25', label: 'Funds outreach event materials' },
            { amount: '$50', label: 'Sponsors a ministry tour stop' },
            { amount: '$100', label: 'Supports full album production' },
          ].map((item) => (
            <div key={item.amount} className="flex items-center gap-4 border-b border-black/[0.06] pb-4">
              <span className="font-raleway font-light text-gold-400 text-lg w-16 shrink-0">
                {item.amount}
              </span>
              <p className="font-raleway text-neutral-500 text-sm font-light">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Donation form */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="rule-gold" />
          <span className="label-eyebrow">Give Now</span>
        </div>

        <p className="font-worksans text-xs tracking-[0.15em] uppercase text-neutral-600 mb-3">
          Select Amount
        </p>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => { setAmount(p); setCustom(''); }}
              className={cn(
                'h-11 font-worksans text-[0.58rem] tracking-[0.18em] uppercase transition-all duration-300 border',
                amount === p && !custom
                  ? 'bg-gold-500 border-gold-500 text-[#080808]'
                  : 'border-neutral-200 text-neutral-500 hover:border-gold-500/40 hover:text-neutral-900'
              )}
            >
              ${p}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label className="font-worksans text-xs tracking-[0.15em] uppercase text-neutral-600 block mb-2">
            Custom Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-raleway text-neutral-500 text-sm">$</span>
            <input
              type="number"
              min="1"
              placeholder="Enter amount"
              value={custom}
              onChange={(e) => { setCustom(e.target.value); setAmount(null); }}
              className="w-full h-11 pl-8 pr-4 bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 font-raleway text-sm font-light focus:outline-none focus:border-purple-400 transition-colors duration-300"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="font-worksans text-xs tracking-[0.15em] uppercase text-neutral-600 block mb-2">
            Message <span className="text-neutral-700">(optional)</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            placeholder="Leave a note of encouragement…"
            className="w-full px-4 py-3 bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 font-raleway text-sm font-light focus:outline-none focus:border-purple-400 transition-colors duration-300 resize-none"
          />
        </div>

        <button
          disabled={!finalAmount || isNaN(finalAmount) || finalAmount <= 0}
          className="w-full h-11 bg-gold-500 hover:bg-gold-400 disabled:opacity-40 text-[#080808] font-worksans text-[0.58rem] tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Heart className="h-3.5 w-3.5" />
          {finalAmount && !isNaN(finalAmount) ? `Give $${finalAmount}` : 'Give'}
        </button>

        <p className="mt-4 font-raleway text-neutral-500 text-xs font-light text-center">
          Secure payment processing. All donations support ClaudyGod Music Ministries.
        </p>
      </div>
    </div>
  );
}
