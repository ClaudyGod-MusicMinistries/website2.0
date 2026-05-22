'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Music, Globe, Users } from 'lucide-react';

const impacts = [
  { icon: Music,  stat: '7+',      label: 'Albums Released' },
  { icon: Globe,  stat: '20+',     label: 'Years of Ministry' },
  { icon: Users,  stat: '10,000+', label: 'Lives Touched' },
  { icon: Heart,  stat: '100%',    label: 'Spirit-Filled' },
];

const amounts = [
  { value: 10,  label: '$10' },
  { value: 25,  label: '$25' },
  { value: 50,  label: '$50' },
  { value: 100, label: '$100' },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function DonateSection() {
  return (
    <section className="relative overflow-hidden bg-[#09080f]">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.10)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(109,40,217,0.15)_0%,transparent_65%)]" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_left,rgba(109,40,217,0.08)_0%,transparent_65%)]" />
      </div>

      {/* Gold top line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-20 md:py-28">

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left — copy + stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div custom={0} variants={fadeUp} className="flex items-center gap-4 mb-6">
              <span className="block w-8 h-px bg-gold-500 opacity-70" />
              <span className="label-eyebrow">Support the Ministry</span>
            </motion.div>

            <div className="overflow-hidden mb-2">
              <motion.h2
                custom={0.1}
                variants={fadeUp}
                className="font-abril text-white text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.1] tracking-tight"
              >
                Partner With
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h2
                custom={0.2}
                variants={fadeUp}
                className="font-abril text-gold-300/90 text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.1] tracking-tight"
              >
                the Ministry.
              </motion.h2>
            </div>

            <motion.p
              custom={0.3} variants={fadeUp}
              className="font-raleway text-neutral-400 text-base leading-[1.85] max-w-md mb-10"
            >
              Your generous support helps us record new music, reach more lives through concerts and events,
              and spread the gospel to the ends of the earth. Every gift — large or small — makes a difference.
            </motion.p>

            {/* Impact stats */}
            <motion.div
              custom={0.4} variants={fadeUp}
              className="grid grid-cols-2 gap-4"
            >
              {impacts.map(({ icon: Icon, stat, label }) => (
                <div
                  key={label}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]"
                >
                  <div className="w-9 h-9 rounded-lg bg-purple-600/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 text-purple-300" />
                  </div>
                  <div>
                    <p className="font-abril text-white text-2xl leading-none mb-1">{stat}</p>
                    <p className="font-worksans text-[0.55rem] tracking-[0.14em] uppercase text-neutral-500">{label}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Scripture */}
            <motion.p
              custom={0.55} variants={fadeUp}
              className="mt-8 font-raleway italic text-neutral-600 text-sm leading-relaxed border-l-2 border-gold-500/30 pl-4"
            >
              &ldquo;Give, and it will be given to you. A good measure, pressed down, shaken together and
              running over, will be poured into your lap.&rdquo;
              <span className="not-italic font-worksans text-[0.52rem] tracking-[0.15em] uppercase text-gold-500/60 block mt-1.5">
                Luke 6:38
              </span>
            </motion.p>
          </motion.div>

          {/* Right — donation card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden p-8 md:p-10 backdrop-blur-sm">

              {/* Inner glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.07)_0%,transparent_70%)] pointer-events-none" />

              {/* Logo + headline */}
              <div className="flex items-center gap-4 mb-8">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-gold-500/25 flex-shrink-0">
                  <Image
                    src="/ClaudyGoLogo.webp"
                    alt="ClaudyGod"
                    fill
                    className="object-contain p-1"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="font-bricolage font-bold text-white text-base leading-tight">ClaudyGod Music Ministries</p>
                  <p className="font-worksans text-[0.5rem] tracking-[0.2em] uppercase text-gold-500/60 mt-0.5">Support the Mission</p>
                </div>
              </div>

              <p className="font-bricolage font-semibold text-white text-xl mb-2">
                Choose an Amount
              </p>
              <p className="font-raleway text-neutral-500 text-sm mb-6">
                100% of your donation supports the ministry directly.
              </p>

              {/* Quick-select amounts */}
              <div className="grid grid-cols-4 gap-2.5 mb-6">
                {amounts.map(({ value, label }) => (
                  <Link
                    key={value}
                    href={`/donate?amount=${value}`}
                    className="h-12 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] hover:bg-purple-600/20 hover:border-purple-500/50 font-bricolage font-bold text-white text-sm transition-all duration-200 hover:scale-[1.03]"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-6">
                <span className="flex-1 h-px bg-white/[0.07]" />
                <span className="font-worksans text-[0.52rem] tracking-[0.15em] uppercase text-neutral-600">or choose your own</span>
                <span className="flex-1 h-px bg-white/[0.07]" />
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/donate"
                  className="w-full h-14 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-[#07060f] font-bricolage font-bold text-base rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:shadow-[0_6px_28px_rgba(201,168,76,0.45)]"
                >
                  <Heart className="h-5 w-5 fill-current" />
                  Donate Now
                </Link>
                <Link
                  href="/donate"
                  className="w-full h-11 border border-white/10 hover:border-white/25 text-neutral-400 hover:text-white font-worksans text-[0.62rem] tracking-[0.18em] uppercase rounded-xl transition-all duration-300 flex items-center justify-center"
                >
                  Learn More About Giving
                </Link>
              </div>

              {/* Trust note */}
              <p className="mt-5 text-center font-worksans text-[0.5rem] tracking-[0.12em] uppercase text-neutral-700">
                Secure giving · Tax receipts available
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/25 to-transparent" />
    </section>
  );
}
