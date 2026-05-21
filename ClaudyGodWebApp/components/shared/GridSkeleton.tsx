export function GridSkeleton({ cols = 4, rows = 2 }: { cols?: number; rows?: number }) {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
      <div
        className="grid gap-5"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: cols * rows }).map((_, i) => (
          <div key={i} className="aspect-video skeleton" />
        ))}
      </div>
    </div>
  );
}
