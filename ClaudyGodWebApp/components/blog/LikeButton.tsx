'use client';

import { Heart } from 'lucide-react';
import { useLike } from '@/hooks/useLike';
import { cn } from '@/lib/utils/cn';

export function LikeButton({ postId }: { postId: string }) {
  const { count, likedByYou, loading, toggling, toggle } = useLike(postId);

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading || toggling}
      aria-pressed={likedByYou}
      className={cn(
        'inline-flex items-center gap-2 h-10 px-5 rounded-lg border font-sans text-xs tracking-[0.1em] uppercase transition-all duration-300 disabled:opacity-60',
        likedByYou
          ? 'bg-purple-600 border-purple-600 text-white hover:bg-purple-700'
          : 'bg-white border-neutral-200 text-neutral-600 hover:border-purple-300 hover:text-purple-700'
      )}
    >
      <Heart
        className={cn('h-4 w-4 transition-transform', likedByYou && 'fill-current scale-110')}
      />
      {likedByYou ? 'Liked' : 'Like'}
      <span className="tabular-nums">{count}</span>
    </button>
  );
}
