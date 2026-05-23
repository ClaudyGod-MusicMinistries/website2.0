'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Music2, Globe2, Mic2 } from 'lucide-react';

const impacts = [
  { icon: Mic2,   label: 'Record new worship albums' },
  { icon: Globe2, label: 'Fund gospel outreach events' },
  { icon: Music2, label: 'Support ministry tours & concerts' },
  { icon: Heart,  label: 'Reach communities in need' },
] as const;

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
      </div>

      {/* Gold top line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left — copy + impact list */}
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
              <motion.h2 custom={0.1} variants={fadeUp}
                className="font-abril text-white text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.1] tracking-tight"
              >
                Partner With
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h2 custom={0.2} variants={fadeUp}
                className="font-abril text-gold-300/90 text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.1] tracking-tight"
              >
                the Ministry.
              </motion.h2>
            </div>

            <motion.p custom={0.3} variants={fadeUp}
              className="font-raleway text-neutral-400 text-base leading-[1.85] max-w-md mb-8"
            >
              Your generous support helps us record new music, reach more lives through concerts and events,
              and spread the gospel to the ends of the earth. Every gift — large or small — makes a difference.
            </motion.p>

            {/* What your gift does */}
            <motion.div custom={0.4} variants={fadeUp} className="space-y-3 mb-8">
              {impacts.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/15 border border-purple-500/20 flex items-center justify-center shrink-0">
                    <Icon className="h-3.5 w-3.5 text-purple-400" />
                  </div>
                  <p className="font-raleway text-neutral-300 text-sm">{label}</p>
                </div>
              ))}
            </motion.div>

            {/* Scripture */}
            <motion.blockquote custom={0.55} variants={fadeUp}
              className="font-raleway italic text-neutral-600 text-sm leading-relaxed border-l-2 border-gold-500/30 pl-4"
            >
              &ldquo;Give, and it will be given to you. A good measure, pressed down, shaken together and
              running over, will be poured into your lap.&rdquo;
              <span className="not-italic font-worksans text-[0.52rem] tracking-[0.15em] uppercase text-gold-500/60 block mt-1.5">
                Luke 6:38
              </span>
            </motion.blockquote>
          </motion.div>

          {/* Right — donation card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden p-8 md:p-10 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.07)_0%,transparent_70%)] pointer-events-none" />

              <div className="flex items-center gap-4 mb-8">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-gold-500/25 shrink-0">
                  <Image src="/ClaudyGoLogo.webp" alt="ClaudyGod" fill className="object-contain p-1" sizes="56px" />
                </div>
                <div>
                  <p className="font-bricolage font-bold text-white text-base leading-tight">ClaudyGod Music Ministries</p>
                  <p className="font-worksans text-[0.5rem] tracking-[0.2em] uppercase text-gold-500/60 mt-0.5">Support the Mission</p>
                </div>
              </div>

              <p className="font-bricolage font-semibold text-white text-xl mb-2">Make a Difference Today</p>
              <p className="font-raleway text-neutral-500 text-sm mb-8">
                100% of your donation supports the ministry directly. Choose any currency on the Donate page.
              </p>

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

              <p className="mt-5 text-center font-worksans text-[0.5rem] tracking-[0.12em] uppercase text-neutral-700">
                Secure giving · Multiple currencies supported
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/25 to-transparent" />
    </section>
  );
}
