export default function Loading() {
  return (
    <div className="min-h-dvh bg-surface-base flex flex-col items-center justify-center gap-5">
      {/* Gold ring spinner */}
      <div className="relative h-12 w-12">
        <span className="absolute inset-0 rounded-full border-2 border-surface-border" />
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold-500 animate-spin" />
      </div>

      {/* Brand wordmark */}
      <p className="font-bricolage text-sm font-medium tracking-widest text-neutral-500 uppercase">
        ClaudyGod
      </p>

      {/* Skeleton content hint */}
      <div className="mt-4 flex flex-col items-center gap-2.5 w-48">
        <span className="skeleton h-2 w-full rounded-full" />
        <span className="skeleton h-2 w-4/5 rounded-full" />
        <span className="skeleton h-2 w-3/5 rounded-full" />
      </div>
    </div>
  );
}
