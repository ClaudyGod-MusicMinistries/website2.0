import { cn } from '@/utils/cn';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const dimensions = {
  sm: { mark: 18, titleSize: 'text-[0.75rem]', subSize: 'text-[0.38rem]', gap: 'gap-2' },
  md: { mark: 24, titleSize: 'text-[0.9rem]',  subSize: 'text-[0.44rem]', gap: 'gap-2.5' },
  lg: { mark: 32, titleSize: 'text-[1.1rem]',  subSize: 'text-[0.52rem]', gap: 'gap-3' },
};

function LogoMark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Vertical bar of the cross */}
      <rect x="14" y="2" width="4" height="28" rx="2" fill="currentColor" opacity="0.9" />
      {/* Horizontal bar of the cross */}
      <rect x="4" y="10" width="24" height="4" rx="2" fill="currentColor" opacity="0.9" />
      {/* Music note flag — small curved line off the right of horizontal bar */}
      <path
        d="M28 14 Q32 14 32 10 Q32 7 29 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

export function Logo({ size = 'md', className }: LogoProps) {
  const d = dimensions[size];
  return (
    <div className={cn('flex items-center', d.gap, className)}>
      <span className="text-gold-500 shrink-0">
        <LogoMark size={d.mark} />
      </span>
      <div className="flex flex-col leading-none">
        <span className={cn('font-abril text-white tracking-wide', d.titleSize)}>
          ClaudyGod
        </span>
        <span className={cn('font-worksans text-gold-400/70 tracking-[0.24em] uppercase mt-px', d.subSize)}>
          Music Ministries
        </span>
      </div>
    </div>
  );
}
