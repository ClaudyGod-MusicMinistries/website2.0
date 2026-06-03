import { Metadata } from 'next';
import { VolunteerForm } from '@/components/volunteer/VolunteerForm';

export const metadata: Metadata = {
  title: 'Volunteer | ClaudyGod Ministry',
  description: 'Join our volunteer team and make a difference in our community.',
};

export default function VolunteerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-bricolage font-bold text-5xl text-neutral-900 mb-4">
            Volunteer With Us
          </h1>
          <p className="font-raleway text-lg text-neutral-600 mb-8">
            Join our passionate team and help us spread the message of faith, music, and community.
            We have opportunities for everyone, regardless of experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="p-4 bg-white rounded-lg shadow-sm border border-neutral-100">
              <div className="text-3xl mb-2">📹</div>
              <p className="font-semibold text-neutral-900">Media</p>
              <p className="text-sm text-neutral-600">Video & Photography</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm border border-neutral-100">
              <div className="text-3xl mb-2">🎵</div>
              <p className="font-semibold text-neutral-900">Music</p>
              <p className="text-sm text-neutral-600">Singing & Worship</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm border border-neutral-100">
              <div className="text-3xl mb-2">🎸</div>
              <p className="font-semibold text-neutral-900">Instruments</p>
              <p className="text-sm text-neutral-600">Musical Instruments</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm border border-neutral-100">
              <div className="text-3xl mb-2">👋</div>
              <p className="font-semibold text-neutral-900">Ushering</p>
              <p className="text-sm text-neutral-600">Guest Relations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-neutral-100 p-8">
          <VolunteerForm />
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 px-4 bg-neutral-900 text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-bricolage font-bold text-3xl mb-8">Why Volunteer?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bricolage font-semibold text-lg mb-2">Make an Impact</h3>
              <p className="font-raleway text-neutral-300">
                Directly contribute to our mission of spreading faith and community connection.
              </p>
            </div>
            <div>
              <h3 className="font-bricolage font-semibold text-lg mb-2">Grow Your Skills</h3>
              <p className="font-raleway text-neutral-300">
                Develop new talents and gain experience in a supportive environment.
              </p>
            </div>
            <div>
              <h3 className="font-bricolage font-semibold text-lg mb-2">Build Community</h3>
              <p className="font-raleway text-neutral-300">
                Connect with like-minded individuals and form meaningful relationships.
              </p>
            </div>
            <div>
              <h3 className="font-bricolage font-semibold text-lg mb-2">Find Purpose</h3>
              <p className="font-raleway text-neutral-300">
                Be part of something greater and make a difference in people's lives.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
