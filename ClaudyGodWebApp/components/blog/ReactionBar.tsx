'use client';

import { useReactions, type ReactionTarget } from '@/hooks/useReactions';
import { REACTION_EMOJIS } from '@/lib/data/types';
import { cn } from '@/lib/utils/cn';

interface ReactionBarProps {
  target: ReactionTarget;
  size?: 'md' | 'sm';
}

export function ReactionBar({ target, size = 'md' }: ReactionBarProps) {
  const { summary, loading, toggling, react } = useReactions(target);
  const compact = size === 'sm';

  return (
    <div className="flex items-center gap-1 flex-wrap" role="group" aria-label="React to this">
      {REACTION_EMOJIS.map((emoji) => {
        const count = summary.counts[emoji] ?? 0;
        const active = summary.yourReaction === emoji;
        return (
          <button
            key={emoji}
            type="button"
            onClick={() => react(emoji)}
            disabled={loading || toggling}
            aria-pressed={active}
            className={cn(
              'inline-flex items-center gap-1 rounded-full border font-sans transition-all duration-200 disabled:opacity-60',
              compact ? 'h-7 px-2 text-xs' : 'h-9 px-3 text-sm',
              active
                ? 'bg-purple-100 border-purple-300 scale-105'
                : 'bg-white border-neutral-200 hover:border-purple-200 hover:bg-purple-50/50'
            )}
          >
            <span className={compact ? 'text-sm' : 'text-base'}>{emoji}</span>
            {count > 0 && (
              <span className="text-neutral-500 tabular-nums text-[0.75em]">{count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
