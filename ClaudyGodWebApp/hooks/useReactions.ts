import { useState, useEffect, useCallback } from 'react';
import { get, post, del } from '@/lib/data/client';
import { getVisitorToken } from '@/lib/utils/visitorToken';
import type { ReactionSummary, ReactionEmoji } from '@/lib/data/types';

export type ReactionTarget = { type: 'post'; id: string } | { type: 'comment'; id: string };

function pathFor(target: ReactionTarget): string {
  return target.type === 'post'
    ? `/blog/${target.id}/reactions`
    : `/blog/comments/${target.id}/reactions`;
}

const EMPTY: ReactionSummary = { counts: {}, yourReaction: null };

/**
 * Shared reaction state for either a post or a single comment — same
 * anonymous visitor-token dedup as the old like button (lib/utils/visitorToken.ts),
 * generalized to a fixed emoji set instead of one heart. Clicking the emoji
 * you've already picked removes your reaction; clicking a different one
 * switches it (both handled server-side as one upsert/delete, not two calls).
 */
export function useReactions(target: ReactionTarget) {
  const [summary, setSummary] = useState<ReactionSummary>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  const fetchSummary = useCallback(async () => {
    const token = getVisitorToken();
    try {
      setLoading(true);
      const result = await get<ReactionSummary>(
        pathFor(target),
        token ? { visitorToken: token } : undefined
      );
      setSummary(result);
    } catch {
      // Silent — a reaction bar that fails to load just shows zero counts
      // rather than blocking or erroring the whole post/comment.
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.type, target.id]);

  useEffect(() => {
    void fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.type, target.id]);

  async function react(emoji: ReactionEmoji): Promise<void> {
    const token = getVisitorToken();
    if (!token || toggling) return;

    const previous = summary;
    const removing = previous.yourReaction === emoji;

    // Optimistic update — adjust counts locally before the request resolves.
    const nextCounts = { ...previous.counts };
    if (previous.yourReaction) {
      nextCounts[previous.yourReaction] = Math.max(0, (nextCounts[previous.yourReaction] ?? 1) - 1);
    }
    if (!removing) {
      nextCounts[emoji] = (nextCounts[emoji] ?? 0) + 1;
    }
    setSummary({ counts: nextCounts, yourReaction: removing ? null : emoji });
    setToggling(true);

    try {
      const path = pathFor(target);
      const result = removing
        ? await del<ReactionSummary>(`${path}?visitorToken=${encodeURIComponent(token)}`)
        : await post<ReactionSummary>(path, { visitorToken: token, emoji });
      setSummary(result);
    } catch {
      setSummary(previous);
    } finally {
      setToggling(false);
    }
  }

  return { summary, loading, toggling, react };
}
