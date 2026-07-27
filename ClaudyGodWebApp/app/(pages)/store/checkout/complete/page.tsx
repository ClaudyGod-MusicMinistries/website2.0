'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, LoaderCircle, TriangleAlert } from 'lucide-react';
import { post } from '@/lib/data/client';
import { useCartStore } from '@/components/store/cartStore';

const PENDING_ORDER_KEY = 'claudygod-pending-order';

export default function CheckoutCompletePage() {
  const params = useSearchParams();
  const clearCart = useCartStore((state) => state.clearCart);
  const [state, setState] = useState<'working' | 'success' | 'error'>('working');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const reference = params.get('reference') ?? params.get('trxref');
    const pending = sessionStorage.getItem(PENDING_ORDER_KEY);
    if (!reference || !pending) {
      setState('error');
      return;
    }

    let cancelled = false;
    const complete = async () => {
      try {
        const order = JSON.parse(pending) as Record<string, unknown>;
        const result = await post<{ orderId: string }>('/store/checkout', {
          ...order,
          paystackRef: reference,
        });
        if (cancelled) return;
        sessionStorage.removeItem(PENDING_ORDER_KEY);
        clearCart();
        setOrderId(result.orderId);
        setState('success');
      } catch {
        if (!cancelled) setState('error');
      }
    };
    void complete();
    return () => {
      cancelled = true;
    };
  }, [clearCart, params]);

  return (
    <section className="min-h-[70vh] bg-cream-100 pt-32 pb-20 px-6 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white border border-neutral-200 rounded-2xl p-8 text-center shadow-card-light">
        {state === 'working' && (
          <>
            <LoaderCircle className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-5" />
            <h1 className="font-display text-2xl font-bold text-neutral-900">
              Confirming your order
            </h1>
            <p className="font-sans text-neutral-500 mt-2">Please keep this page open.</p>
          </>
        )}
        {state === 'success' && (
          <>
            <CheckCircle2 className="h-14 w-14 text-green-600 mx-auto mb-5" />
            <h1 className="font-display text-2xl font-bold text-neutral-900">Order confirmed</h1>
            <p className="font-sans text-neutral-500 mt-2">Your order reference is {orderId}.</p>
            <Link
              href="/store"
              className="inline-flex mt-7 text-purple-700 underline underline-offset-4"
            >
              Return to the store
            </Link>
          </>
        )}
        {state === 'error' && (
          <>
            <TriangleAlert className="h-14 w-14 text-amber-600 mx-auto mb-5" />
            <h1 className="font-display text-2xl font-bold text-neutral-900">
              We could not confirm the order
            </h1>
            <p className="font-sans text-neutral-500 mt-2">
              Your cart is still saved. Please contact support with your Paystack reference before
              retrying payment.
            </p>
            <Link
              href="/contact"
              className="inline-flex mt-7 text-purple-700 underline underline-offset-4"
            >
              Contact support
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
