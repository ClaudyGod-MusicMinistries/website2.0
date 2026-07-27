'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, LoaderCircle, TriangleAlert } from 'lucide-react';

type Verification = {
  success: boolean;
  status?: string;
  reference?: string;
  amount?: number;
  currency?: string;
};

export default function DonationSuccessPage() {
  const params = useSearchParams();
  const [result, setResult] = useState<Verification | null>(null);

  useEffect(() => {
    const reference = params.get('reference') ?? params.get('trxref');
    if (!reference) {
      setResult({ success: false });
      return;
    }
    fetch(`/api/payments/verify?reference=${encodeURIComponent(reference)}`, {
      cache: 'no-store',
    })
      .then(async (response) => ({ ...(await response.json()), success: response.ok }))
      .then(setResult)
      .catch(() => setResult({ success: false }));
  }, [params]);

  const verified = result?.success && result.status === 'success';
  return (
    <section className="min-h-[70vh] bg-cream-100 pt-32 pb-20 px-6 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white border border-neutral-200 rounded-2xl p-8 text-center shadow-card-light">
        {!result ? (
          <>
            <LoaderCircle className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-5" />
            <h1 className="font-display text-2xl font-bold text-neutral-900">
              Verifying your gift
            </h1>
          </>
        ) : verified ? (
          <>
            <CheckCircle2 className="h-14 w-14 text-green-600 mx-auto mb-5" />
            <h1 className="font-display text-2xl font-bold text-neutral-900">
              Thank you for your gift
            </h1>
            <p className="font-sans text-neutral-500 mt-2">
              We verified your donation of {result.currency} {result.amount?.toLocaleString()}.
            </p>
            <p className="font-sans text-xs text-neutral-400 mt-3">Reference: {result.reference}</p>
          </>
        ) : (
          <>
            <TriangleAlert className="h-14 w-14 text-amber-600 mx-auto mb-5" />
            <h1 className="font-display text-2xl font-bold text-neutral-900">
              Payment not confirmed
            </h1>
            <p className="font-sans text-neutral-500 mt-2">
              No verified donation was recorded. Contact us if your account was charged.
            </p>
          </>
        )}
        <Link
          href={verified ? '/' : '/contact'}
          className="inline-flex mt-7 text-purple-700 underline underline-offset-4"
        >
          {verified ? 'Return home' : 'Contact support'}
        </Link>
      </div>
    </section>
  );
}
