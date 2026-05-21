import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { BookingForm } from '@/components/bookings/BookingForm';

export const metadata: Metadata = {
  title: 'Bookings — ClaudyGod Music Ministries',
  description: 'Book Minister ClaudyGod for your church service, conference, concert, or special event.',
};

export default function BookingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Bookings"
        title="Book ClaudyGod"
        subtitle="Fill out the form below and our team will contact you within 3–5 business days to confirm details."
        backgroundImage="https://cdn.jsdelivr.net/gh/ClaudyGod-MusicMinistries/CGM-Assets@latest/tour_1.jpg"
      />
      <section className="bg-[#080808] section-py">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Form */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="rule-gold" />
                <span className="label-eyebrow">Booking Request</span>
              </div>
              <BookingForm />
            </div>

            {/* Info */}
            <div className="lg:pt-14">
              <h3 className="font-raleway font-extralight text-white text-2xl tracking-tight leading-snug mb-6">
                What to Expect
              </h3>
              <div className="space-y-6">
                {[
                  { step: '01', title: 'Submit Request', body: 'Fill out the booking form with your event details.' },
                  { step: '02', title: 'Review & Confirm', body: 'Our team reviews your request and contacts you within 3–5 business days.' },
                  { step: '03', title: 'Agreement', body: 'A booking agreement is shared and signed before the event is confirmed.' },
                  { step: '04', title: 'Preparation', body: 'We coordinate logistics, sound requirements, and set list details.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-5 items-start border-b border-white/[0.04] pb-6">
                    <span className="font-worksans text-[0.48rem] tracking-[0.18em] text-gold-400/50 mt-1 shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <p className="font-raleway font-light text-white text-sm mb-1">{item.title}</p>
                      <p className="font-raleway text-neutral-600 text-xs font-light leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
