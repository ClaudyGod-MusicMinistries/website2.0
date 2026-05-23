import { Mic2, Globe2, Heart, BookOpen } from 'lucide-react';

const pillars = [
  {
    icon:  Mic2,
    title: 'Spirit-Led Worship',
    body:  'Every song is born in prayer — crafted to usher believers into the presence of God.',
    accent: 'text-purple-500',
    bg:     'bg-purple-50',
  },
  {
    icon:  Globe2,
    title: 'Global Outreach',
    body:  'Through recordings, live events, and digital platforms the message reaches nations.',
    accent: 'text-gold-600',
    bg:     'bg-gold-50',
  },
  {
    icon:  Heart,
    title: 'Community Impact',
    body:  'Ministering to the broken, the hopeful, and everyone in between — one life at a time.',
    accent: 'text-red-500',
    bg:     'bg-red-50/60',
  },
  {
    icon:  BookOpen,
    title: 'Rooted in Scripture',
    body:  'Sound biblical teaching woven through music, sermons, and discipleship programmes.',
    accent: 'text-blue-500',
    bg:     'bg-blue-50/60',
  },
] as const;

export function MinistryStats() {
  return (
    <section className="bg-cream-100 border-t border-b border-black/[0.05]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-black/[0.06]">
          {pillars.map(({ icon: Icon, title, body, accent, bg }) => (
            <div key={title} className="flex flex-col gap-3 lg:px-10 first:lg:pl-0 last:lg:pr-0">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon className={`h-5 w-5 ${accent}`} />
              </div>
              <p className="font-bricolage font-bold text-neutral-900 text-[0.92rem] leading-snug">
                {title}
              </p>
              <p className="font-raleway text-neutral-500 text-xs leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
