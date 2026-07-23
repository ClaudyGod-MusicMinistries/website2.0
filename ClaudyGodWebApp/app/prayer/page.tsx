import { Metadata } from 'next';
import { PrayerRequestForm } from '@/components/prayer/PrayerRequestForm';

export const metadata: Metadata = {
  title: 'Prayer Request | ClaudyGod Ministry',
  description:
    'Share your prayer request with our ministry team — we believe in the power of prayer and will intercede for you.',
};

export default function PrayerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-raleway font-light text-5xl text-neutral-900 mb-4">
            Prayer Requests
          </h1>
          <p className="font-sans text-lg text-neutral-600 mb-8">
            We believe in the power of prayer. Share what&apos;s on your heart, and our prayer team
            will intercede for you — in confidence, if you prefer.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-neutral-100 p-8">
          <PrayerRequestForm />
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 px-4 bg-neutral-900 text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-raleway font-light text-3xl mb-8">What Happens Next?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display font-semibold text-lg mb-2">We Receive It</h3>
              <p className="font-sans text-neutral-300">
                Your request goes directly to our prayer team — no public posting, ever.
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg mb-2">We Confirm By Email</h3>
              <p className="font-sans text-neutral-300">
                You&apos;ll receive an email confirming your request has been received.
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg mb-2">We Intercede</h3>
              <p className="font-sans text-neutral-300">
                Our team commits to praying over every request submitted through this form.
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg mb-2">Your Privacy Matters</h3>
              <p className="font-sans text-neutral-300">
                Mark a request confidential to keep it between you and the prayer team.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
