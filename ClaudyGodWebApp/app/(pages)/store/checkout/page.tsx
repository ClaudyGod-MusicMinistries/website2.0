'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ChevronRight, Check, ShoppingBag, MapPin, CreditCard,
  ClipboardCheck, ArrowLeft, Package, Shield, Truck, Zap,
  CheckCircle2, X,
} from 'lucide-react';
import { FaCreditCard, FaUniversity, FaGlobe } from 'react-icons/fa';
import { useCartStore } from '@/components/store/cartStore';
import { formatPrice } from '@/utils/format';
import { post } from '@/utils/apiClient';

/* ── Constants ──────────────────────────────────────────── */
const SHIPPING_OPTIONS = [
  {
    id:       'standard' as const,
    label:    'Standard Shipping',
    duration: '7–14 business days',
    price:    9.99,
    icon:     Truck,
  },
  {
    id:       'express' as const,
    label:    'Express Shipping',
    duration: '3–5 business days',
    price:    19.99,
    icon:     Zap,
  },
] as const;

type ShippingMethod = typeof SHIPPING_OPTIONS[number]['id'];

const PAYMENT_METHODS = [
  {
    id:    'paystack' as const,
    label: 'Paystack',
    sub:   'Cards, bank transfer, USSD (Africa)',
    icon:  FaGlobe,
    color: '#00C3F7',
    live:  true,
  },
  {
    id:    'card' as const,
    label: 'Credit / Debit Card',
    sub:   'Visa, Mastercard, Amex',
    icon:  FaCreditCard,
    color: '#3B82F6',
    live:  false,
  },
  {
    id:    'bank_transfer' as const,
    label: 'Bank Transfer',
    sub:   'Nigerian bank transfer',
    icon:  FaUniversity,
    color: '#10B981',
    live:  false,
  },
] as const;

type PaymentMethod = typeof PAYMENT_METHODS[number]['id'];

/* ── Validation schemas ─────────────────────────────────── */
const contactSchema = z.object({
  fullName:   z.string().min(2, 'Full name is required'),
  email:      z.string().email('Valid email is required'),
  phone:      z.string().min(6, 'Phone number is required'),
  address:    z.string().min(4, 'Street address is required'),
  city:       z.string().min(2, 'City is required'),
  state:      z.string().min(2, 'State / region is required'),
  country:    z.string().min(2, 'Country is required'),
  postalCode: z.string().optional(),
});
type ContactData = z.infer<typeof contactSchema>;

/* ── Step indicator ─────────────────────────────────────── */
const STEPS = [
  { id: 1, label: 'Information', icon: MapPin },
  { id: 2, label: 'Shipping',    icon: Truck },
  { id: 3, label: 'Payment',     icon: CreditCard },
  { id: 4, label: 'Review',      icon: ClipboardCheck },
];

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((step, i) => {
        const done    = current > step.id;
        const active  = current === step.id;
        const Icon    = step.icon;
        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5 relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  done    ? 'bg-purple-600 border-purple-600 text-white'
                  : active ? 'bg-white border-purple-600 text-purple-600 shadow-[0_0_0_4px_rgba(124,58,237,0.1)]'
                           : 'bg-white border-neutral-200 text-neutral-300'
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
              </div>
              <span className={`font-worksans text-[0.52rem] tracking-[0.1em] uppercase hidden sm:block ${
                active ? 'text-purple-600 font-semibold' : done ? 'text-neutral-500' : 'text-neutral-300'
              }`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-2 transition-colors duration-500 ${done ? 'bg-purple-400' : 'bg-neutral-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Shared input styling ───────────────────────────────── */
const inputCls = 'w-full h-11 px-4 border border-neutral-200 rounded-xl font-raleway text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-300 bg-white';
const labelCls = 'block font-worksans text-[0.6rem] tracking-[0.12em] uppercase text-neutral-500 mb-1.5';
const errCls   = 'mt-1 font-worksans text-[0.58rem] tracking-[0.08em] uppercase text-red-500';

/* ── Order summary sidebar ──────────────────────────────── */
function OrderSummary({
  shippingCost,
  shippingMethod,
}: {
  shippingCost: number;
  shippingMethod: ShippingMethod | null;
}) {
  const { items, cartTotal } = useCartStore();
  const subtotal = cartTotal();
  const total    = subtotal + shippingCost;

  return (
    <div className="bg-white rounded-2xl border border-black/[0.05] shadow-[0_2px_16px_rgba(0,0,0,0.05)] overflow-hidden sticky top-24">
      <div className="px-6 py-5 border-b border-neutral-100">
        <p className="font-worksans text-[0.6rem] tracking-[0.18em] uppercase text-neutral-500 flex items-center gap-2">
          <ShoppingBag className="h-3.5 w-3.5" /> Order Summary
        </p>
      </div>

      {/* Items */}
      <div className="px-6 py-4 divide-y divide-neutral-50">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 py-3">
            <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-cream-100 ring-1 ring-black/[0.05]">
              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center font-worksans text-[0.52rem] font-bold leading-none">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-raleway font-medium text-neutral-900 text-xs leading-snug line-clamp-2">{item.name}</p>
              <p className="font-worksans text-[0.52rem] tracking-[0.1em] uppercase text-neutral-400 mt-0.5 capitalize">{item.category}</p>
            </div>
            <p className="font-bricolage font-semibold text-neutral-800 text-sm shrink-0">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="px-6 py-4 border-t border-neutral-100 space-y-2.5">
        <div className="flex justify-between">
          <span className="font-raleway text-neutral-500 text-sm">Subtotal</span>
          <span className="font-raleway font-medium text-neutral-800 text-sm">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-raleway text-neutral-500 text-sm">Shipping</span>
          <span className="font-raleway font-medium text-neutral-800 text-sm">
            {shippingMethod ? formatPrice(shippingCost) : '—'}
          </span>
        </div>
        <div className="flex justify-between pt-3 border-t border-neutral-100">
          <span className="font-bricolage font-bold text-neutral-900 text-base">Total</span>
          <span className="font-bricolage font-bold text-neutral-900 text-xl">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Trust badges */}
      <div className="px-6 py-4 border-t border-neutral-100 flex flex-col gap-2.5">
        {[
          { icon: Shield,  text: 'SSL-secured checkout' },
          { icon: Package, text: 'Worldwide shipping' },
          { icon: Check,   text: '100% authentic merchandise' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2.5">
            <Icon className="h-3.5 w-3.5 text-neutral-300 shrink-0" />
            <span className="font-worksans text-[0.58rem] tracking-[0.08em] uppercase text-neutral-400">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Step 1: Contact & Shipping Address ─────────────────── */
function StepContact({ onNext }: { onNext: (data: ContactData) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactData>({ resolver: zodResolver(contactSchema) });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="font-bricolage font-bold text-neutral-900 text-xl tracking-tight mb-1">Contact Information</h2>
        <p className="font-raleway text-neutral-500 text-sm">We&apos;ll use this to send your order confirmation and shipping updates.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Full Name</label>
          <input {...register('fullName')} placeholder="Jane Doe" className={inputCls} />
          {errors.fullName && <p className={errCls}>{errors.fullName.message}</p>}
        </div>
        <div>
          <label className={labelCls}>Email Address</label>
          <input {...register('email')} type="email" placeholder="jane@example.com" className={inputCls} />
          {errors.email && <p className={errCls}>{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelCls}>Phone Number</label>
        <input {...register('phone')} type="tel" placeholder="+234 800 000 0000" className={inputCls} />
        {errors.phone && <p className={errCls}>{errors.phone.message}</p>}
      </div>

      <div className="pt-2 border-t border-neutral-100">
        <h3 className="font-bricolage font-semibold text-neutral-800 text-base mb-4">Shipping Address</h3>

        <div className="space-y-4">
          <div>
            <label className={labelCls}>Street Address</label>
            <input {...register('address')} placeholder="123 Ministry Lane" className={inputCls} />
            {errors.address && <p className={errCls}>{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>City</label>
              <input {...register('city')} placeholder="Port Harcourt" className={inputCls} />
              {errors.city && <p className={errCls}>{errors.city.message}</p>}
            </div>
            <div>
              <label className={labelCls}>State / Region</label>
              <input {...register('state')} placeholder="Rivers State" className={inputCls} />
              {errors.state && <p className={errCls}>{errors.state.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Country</label>
              <input {...register('country')} placeholder="Nigeria" className={inputCls} />
              {errors.country && <p className={errCls}>{errors.country.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Postal / ZIP Code <span className="normal-case tracking-normal text-neutral-400">(optional)</span></label>
              <input {...register('postalCode')} placeholder="500001" className={inputCls} />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full h-12 bg-neutral-900 hover:bg-purple-700 text-white font-worksans text-[0.62rem] tracking-[0.2em] uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
      >
        Continue to Shipping
        <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}

/* ── Step 2: Shipping Method ────────────────────────────── */
function StepShipping({
  selected,
  onSelect,
  onNext,
  onBack,
}: {
  selected: ShippingMethod;
  onSelect: (m: ShippingMethod) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-bricolage font-bold text-neutral-900 text-xl tracking-tight mb-1">Shipping Method</h2>
        <p className="font-raleway text-neutral-500 text-sm">Choose how you&apos;d like your order delivered.</p>
      </div>

      <div className="space-y-3">
        {SHIPPING_OPTIONS.map((opt) => {
          const Icon     = opt.icon;
          const isActive = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                isActive
                  ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-400/30'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-purple-600' : 'bg-neutral-100'}`}>
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                  </div>
                  <div>
                    <p className={`font-bricolage font-semibold text-sm ${isActive ? 'text-purple-800' : 'text-neutral-800'}`}>
                      {opt.label}
                    </p>
                    <p className="font-worksans text-[0.58rem] tracking-[0.1em] uppercase text-neutral-400 mt-0.5">
                      {opt.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-bricolage font-bold text-lg ${isActive ? 'text-purple-700' : 'text-neutral-800'}`}>
                    {formatPrice(opt.price)}
                  </span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isActive ? 'border-purple-600 bg-purple-600' : 'border-neutral-300'
                  }`}>
                    {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="h-12 px-6 border border-neutral-200 hover:border-neutral-300 text-neutral-600 font-worksans text-[0.6rem] tracking-[0.18em] uppercase rounded-xl transition-all duration-300 flex items-center gap-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 h-12 bg-neutral-900 hover:bg-purple-700 text-white font-worksans text-[0.62rem] tracking-[0.2em] uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          Continue to Payment
          <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}

/* ── Step 3: Payment ────────────────────────────────────── */
function StepPayment({
  selected,
  onSelect,
  onNext,
  onBack,
}: {
  selected: PaymentMethod;
  onSelect: (m: PaymentMethod) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-bricolage font-bold text-neutral-900 text-xl tracking-tight mb-1">Payment Method</h2>
        <p className="font-raleway text-neutral-500 text-sm">Select how you&apos;d like to pay. Your transaction is fully encrypted.</p>
      </div>

      <div className="space-y-3">
        {PAYMENT_METHODS.map((method) => {
          const Icon     = method.icon;
          const isActive = selected === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelect(method.id)}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 relative ${
                isActive
                  ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-400/30'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
                    <Icon className="h-4 w-4" style={{ color: method.color }} />
                  </div>
                  <div>
                    <p className={`font-bricolage font-semibold text-sm ${isActive ? 'text-purple-800' : 'text-neutral-800'}`}>
                      {method.label}
                    </p>
                    <p className="font-worksans text-[0.56rem] tracking-[0.1em] uppercase text-neutral-400 mt-0.5">
                      {method.sub}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {!method.live && (
                    <span className="font-worksans text-[0.5rem] tracking-[0.1em] uppercase bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">
                      Coming soon
                    </span>
                  )}
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isActive ? 'border-purple-600 bg-purple-600' : 'border-neutral-300'
                  }`}>
                    {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              </div>

              {/* Paystack inline detail */}
              {isActive && method.id === 'paystack' && (
                <div className="mt-4 pt-4 border-t border-purple-200">
                  <div className="flex items-start gap-2">
                    <Shield className="h-3.5 w-3.5 text-purple-500 shrink-0 mt-0.5" />
                    <p className="font-raleway text-xs text-purple-600 leading-relaxed">
                      You&apos;ll be redirected to Paystack&apos;s secure payment gateway to complete your purchase. Supports cards, bank transfer, and USSD.
                    </p>
                  </div>
                </div>
              )}
              {isActive && !method.live && (
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <p className="font-raleway text-xs text-neutral-400">
                    This payment method is coming soon. Please choose Paystack to complete your order.
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack}
          className="h-12 px-6 border border-neutral-200 hover:border-neutral-300 text-neutral-600 font-worksans text-[0.6rem] tracking-[0.18em] uppercase rounded-xl transition-all duration-300 flex items-center gap-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!PAYMENT_METHODS.find((m) => m.id === selected)?.live}
          className="flex-1 h-12 bg-neutral-900 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-worksans text-[0.62rem] tracking-[0.2em] uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          Review Order
          <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}

/* ── Step 4: Review & Place Order ───────────────────────── */
function StepReview({
  contact,
  shippingMethod,
  paymentMethod,
  shippingCost,
  onBack,
  onPlace,
  placing,
}: {
  contact:        ContactData;
  shippingMethod: ShippingMethod;
  paymentMethod:  PaymentMethod;
  shippingCost:   number;
  onBack:         () => void;
  onPlace:        () => void;
  placing:        boolean;
}) {
  const { items, cartTotal } = useCartStore();
  const subtotal = cartTotal();
  const total    = subtotal + shippingCost;
  const shipping = SHIPPING_OPTIONS.find((o) => o.id === shippingMethod)!;
  const payment  = PAYMENT_METHODS.find((m) => m.id === paymentMethod)!;

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-neutral-50 rounded-2xl p-5">
      <p className="font-worksans text-[0.58rem] tracking-[0.14em] uppercase text-neutral-400 mb-3">{title}</p>
      {children}
    </div>
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-bricolage font-bold text-neutral-900 text-xl tracking-tight mb-1">Review Your Order</h2>
        <p className="font-raleway text-neutral-500 text-sm">Check everything before placing your order.</p>
      </div>

      {/* Contact info */}
      <Section title="Delivery To">
        <p className="font-bricolage font-semibold text-neutral-900 text-sm">{contact.fullName}</p>
        <p className="font-raleway text-neutral-500 text-sm mt-0.5">{contact.email} · {contact.phone}</p>
        <p className="font-raleway text-neutral-500 text-sm mt-0.5">
          {contact.address}, {contact.city}, {contact.state}, {contact.country}
          {contact.postalCode ? ` ${contact.postalCode}` : ''}
        </p>
      </Section>

      {/* Shipping + Payment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Section title="Shipping">
          <div className="flex items-center gap-2">
            <shipping.icon className="h-4 w-4 text-purple-600" />
            <p className="font-bricolage font-semibold text-neutral-900 text-sm">{shipping.label}</p>
          </div>
          <p className="font-worksans text-[0.58rem] tracking-[0.1em] uppercase text-neutral-400 mt-1">{shipping.duration}</p>
          <p className="font-bricolage font-bold text-purple-700 text-base mt-1">{formatPrice(shipping.price)}</p>
        </Section>
        <Section title="Payment">
          <div className="flex items-center gap-2">
            <payment.icon className="h-4 w-4" style={{ color: payment.color }} />
            <p className="font-bricolage font-semibold text-neutral-900 text-sm">{payment.label}</p>
          </div>
          <p className="font-worksans text-[0.56rem] tracking-[0.1em] uppercase text-neutral-400 mt-1">{payment.sub}</p>
        </Section>
      </div>

      {/* Items */}
      <Section title={`${items.length} Item${items.length !== 1 ? 's' : ''}`}>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden bg-white ring-1 ring-black/[0.05]">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="40px" />
              </div>
              <p className="font-raleway text-neutral-700 text-sm flex-1 line-clamp-1">{item.name}</p>
              <p className="font-worksans text-[0.58rem] tracking-[0.08em] text-neutral-400">×{item.quantity}</p>
              <p className="font-bricolage font-semibold text-neutral-900 text-sm">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Total */}
      <div className="flex justify-between items-center p-5 bg-neutral-900 rounded-2xl">
        <div>
          <p className="font-worksans text-[0.58rem] tracking-[0.14em] uppercase text-neutral-400 mb-0.5">Order Total</p>
          <p className="font-raleway text-neutral-400 text-xs">incl. {formatPrice(shippingCost)} shipping</p>
        </div>
        <p className="font-bricolage font-bold text-white text-2xl">{formatPrice(total)}</p>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack}
          className="h-12 px-6 border border-neutral-200 hover:border-neutral-300 text-neutral-600 font-worksans text-[0.6rem] tracking-[0.18em] uppercase rounded-xl transition-all duration-300 flex items-center gap-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>
        <button
          type="button"
          onClick={onPlace}
          disabled={placing}
          className="flex-1 h-12 bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white font-worksans text-[0.62rem] tracking-[0.2em] uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_4px_20px_rgba(124,58,237,0.35)]"
        >
          {placing ? 'Placing Order…' : (
            <><CheckCircle2 className="h-3.5 w-3.5" /> Place Order</>
          )}
        </button>
      </div>

      <p className="text-center font-raleway text-xs text-neutral-400">
        By placing your order, you agree to our{' '}
        <Link href="/legal/terms" className="underline hover:text-purple-600 transition-colors">Terms of Service</Link>
        {' '}and{' '}
        <Link href="/legal/privacy" className="underline hover:text-purple-600 transition-colors">Privacy Policy</Link>.
      </p>
    </div>
  );
}

/* ── Success screen ─────────────────────────────────────── */
function OrderSuccess({ orderId, email }: { orderId: string; email: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-center py-12 px-4"
    >
      {/* Checkmark circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-green-100 border-2 border-green-400 flex items-center justify-center mx-auto mb-6"
      >
        <Check className="h-9 w-9 text-green-600" />
      </motion.div>

      <h2 className="font-bricolage font-bold text-neutral-900 text-3xl tracking-tight mb-2">Order Confirmed!</h2>
      <p className="font-raleway text-neutral-500 text-base mb-6 max-w-sm mx-auto leading-relaxed">
        Thank you for your purchase. A confirmation has been sent to <strong className="text-neutral-700">{email}</strong>.
      </p>

      <div className="inline-flex items-center gap-2 bg-neutral-100 rounded-xl px-6 py-3 mb-8">
        <span className="font-worksans text-[0.58rem] tracking-[0.14em] uppercase text-neutral-500">Order ID</span>
        <span className="font-bricolage font-bold text-neutral-900 text-sm">{orderId}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto mb-10">
        {[
          { icon: Package,  title: 'Processing',   sub: 'Order being prepared' },
          { icon: Truck,    title: 'Shipping',      sub: 'We\'ll email tracking' },
          { icon: CheckCircle2, title: 'Delivery',  sub: 'Arrives at your door' },
        ].map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex flex-col items-center gap-1.5 p-4 bg-neutral-50 rounded-xl">
            <Icon className="h-5 w-5 text-purple-500 mb-1" />
            <p className="font-bricolage font-semibold text-neutral-800 text-xs">{title}</p>
            <p className="font-raleway text-neutral-400 text-xs text-center">{sub}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/store"
          className="inline-flex items-center gap-2 font-worksans text-[0.62rem] tracking-[0.2em] uppercase bg-neutral-900 hover:bg-purple-700 text-white px-8 h-11 rounded-xl transition-all duration-300"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-worksans text-[0.62rem] tracking-[0.2em] uppercase border border-neutral-200 hover:border-purple-300 text-neutral-600 hover:text-purple-700 px-8 h-11 rounded-xl transition-all duration-300"
        >
          Go to Home
        </Link>
      </div>
    </motion.div>
  );
}

/* ── Main page ──────────────────────────────────────────── */
export default function CheckoutPage() {
  const router           = useRouter();
  const { items, clearCart, cartTotal } = useCartStore();
  const [step,           setStep]           = useState(1);
  const [contact,        setContact]        = useState<ContactData | null>(null);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard');
  const [paymentMethod,  setPaymentMethod]  = useState<PaymentMethod>('paystack');
  const [placing,        setPlacing]        = useState(false);
  const [orderId,        setOrderId]        = useState<string | null>(null);
  const [mounted,        setMounted]        = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Redirect to store if cart is empty (only after mount)
  useEffect(() => {
    if (mounted && items.length === 0 && !orderId) {
      router.replace('/store');
    }
  }, [mounted, items.length, orderId, router]);

  const shippingCost = SHIPPING_OPTIONS.find((o) => o.id === shippingMethod)!.price;

  const placeOrder = async () => {
    if (!contact) return;
    setPlacing(true);
    try {
      const res = await post<{ orderId: string }>('/store/checkout', {
        items:          items.map(({ id, name, price, quantity, image, category, description }) => ({
                          id, name, price, quantity, image, category, description,
                        })),
        shipping:       contact,
        shippingMethod,
        paymentMethod,
        subtotal:       cartTotal(),
        shippingCost,
        total:          cartTotal() + shippingCost,
        currency:       'USD',
      });
      setOrderId(res.orderId);
      clearCart();
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (!mounted) return null;

  /* Success screen */
  if (orderId && contact) {
    return (
      <div className="min-h-screen bg-cream-100 pt-[var(--navbar-height)]">
        <div className="max-w-2xl mx-auto px-6 py-20">
          <OrderSuccess orderId={orderId} email={contact.email} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100 pt-[var(--navbar-height)]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-14 md:py-20">

        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/store/cart"
              className="w-9 h-9 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-purple-600 hover:border-purple-300 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="font-bricolage font-bold text-neutral-900 text-2xl tracking-tight">Checkout</h1>
              <p className="font-raleway text-neutral-400 text-xs mt-0.5">{items.length} item{items.length !== 1 ? 's' : ''} in your order</p>
            </div>
          </div>
          <Link href="/store" className="hidden sm:flex items-center gap-2 font-worksans text-[0.6rem] tracking-[0.14em] uppercase text-neutral-400 hover:text-purple-600 transition-colors">
            <X className="h-3.5 w-3.5" /> Cancel
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">

          {/* Left — steps */}
          <div>
            <StepBar current={step} />

            <div className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_2px_16px_rgba(0,0,0,0.05)] p-6 md:p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                    <StepContact onNext={(data) => { setContact(data); setStep(2); }} />
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                    <StepShipping
                      selected={shippingMethod}
                      onSelect={setShippingMethod}
                      onNext={() => setStep(3)}
                      onBack={() => setStep(1)}
                    />
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                    <StepPayment
                      selected={paymentMethod}
                      onSelect={setPaymentMethod}
                      onNext={() => setStep(4)}
                      onBack={() => setStep(2)}
                    />
                  </motion.div>
                )}
                {step === 4 && contact && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                    <StepReview
                      contact={contact}
                      shippingMethod={shippingMethod}
                      paymentMethod={paymentMethod}
                      shippingCost={shippingCost}
                      onBack={() => setStep(3)}
                      onPlace={placeOrder}
                      placing={placing}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right — order summary */}
          <div>
            <OrderSummary shippingCost={shippingCost} shippingMethod={shippingMethod} />
          </div>
        </div>
      </div>
    </div>
  );
}
