export function AppDownload() {
  return (
    <section className="bg-[#0c0a1a] py-20 md:py-24 relative overflow-hidden">
      {/* Purple radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.22)_0%,transparent_70%)] pointer-events-none" />
      {/* Gold accent line top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="block w-8 h-px bg-gold-500 opacity-60" />
          <span className="label-eyebrow">Mobile App</span>
          <span className="block w-8 h-px bg-gold-500 opacity-60" />
        </div>

        <h2 className="font-raleway font-medium text-white text-3xl md:text-4xl lg:text-[2.5rem] tracking-tight leading-[1.1] mb-4">
          Worship on the Go
        </h2>
        <p className="font-raleway text-neutral-400 text-base leading-relaxed max-w-md mx-auto mb-10 font-light">
          Download the ClaudyGod app — access music, devotionals, teachings, and live events anywhere, any time.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* App Store */}
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-[#111] hover:bg-neutral-100 px-6 h-14 transition-all duration-300 rounded-xl min-w-[168px]"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 fill-current" aria-hidden="true">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.15-2.05 1.22-2.03 3.64.02 2.87 2.5 3.82 2.52 3.83zm-7.46-14.8c.36-1.79 1.99-3.09 3.18-3.15.15 2.02-1.75 3.18-3.18 3.15z"/>
            </svg>
            <div className="text-left">
              <p className="font-worksans text-[0.45rem] tracking-[0.1em] uppercase opacity-70 leading-none mb-0.5">
                Download on the
              </p>
              <p className="font-raleway font-semibold text-sm leading-none">
                App Store
              </p>
            </div>
          </a>

          {/* Google Play */}
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-[#111] hover:bg-neutral-100 px-6 h-14 transition-all duration-300 rounded-xl min-w-[168px]"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden="true">
              <path d="M3.18 23.76c.35.2.76.25 1.16.12l11.65-6.73-2.5-2.5-10.31 9.11zm-1.03-19.4A1.99 1.99 0 0 0 2 5.63v12.74c0 .62.28 1.16.72 1.52l.1.08 7.14-7.14v-.17L2.15 4.36zm19.35 7.81-2.93-1.69L16.03 12l2.54 2.54 2.94-1.7c.84-.49.84-1.28 0-1.77zm-16.61 9.04L16.03 14 13.5 11.47 5.56 19.4l-.67.81z" fill="url(#gplay)"/>
              <defs>
                <linearGradient id="gplay" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00C3FF"/>
                  <stop offset="25%" stopColor="#00C3FF"/>
                  <stop offset="50%" stopColor="#FFCA28"/>
                  <stop offset="75%" stopColor="#FF6D00"/>
                  <stop offset="100%" stopColor="#FF0000"/>
                </linearGradient>
              </defs>
            </svg>
            <div className="text-left">
              <p className="font-worksans text-[0.45rem] tracking-[0.1em] uppercase opacity-70 leading-none mb-0.5">
                Get it on
              </p>
              <p className="font-raleway font-semibold text-sm leading-none">
                Google Play
              </p>
            </div>
          </a>
        </div>

        <p className="mt-8 font-worksans text-[0.48rem] tracking-[0.15em] uppercase text-neutral-700">
          Free to download · iOS & Android
        </p>
      </div>
    </section>
  );
}
