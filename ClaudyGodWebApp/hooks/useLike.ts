import { useState, useEffect, useCallback } from 'react';
import { get, post, del } from '@/lib/data/client';
import { getVisitorToken } from '@/lib/utils/visitorToken';
import type { LikeStatus } from '@/lib/data/types';

/**
 * Post-level like button state — count + whether this browser has already
 * liked it, deduped via a locally-stored anonymous visitor token (see
 * lib/utils/visitorToken.ts; the site has no visitor accounts to dedupe
 * against a real identity). Toggling updates optimistically since a like
 * button that visibly lags feels broken — reverts on a failed request.
 */
export function useLike(postId: string) {
  const [count, setCount] = useState(0);
  const [likedByYou, setLikedByYou] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  const fetchStatus = useCallback(async () => {
    const token = getVisitorToken();
    try {
      setLoading(true);
      const status = await get<LikeStatus>(
        `/blog/${postId}/like`,
        token ? { visitorToken: token } : undefined
      );
      setCount(status.count);
      setLikedByYou(status.likedByYou);
    } catch {
      // Silent — a like button that fails to load just shows a 0 count
      // rather than blocking or erroring the whole post.
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    void fetchStatus();
  }, [fetchStatus]);

  async function toggle(): Promise<void> {
    const token = getVisitorToken();
    if (!token || toggling) return;

    const wasLiked = likedByYou;
    const previousCount = count;

    setLikedByYou(!wasLiked);
    setCount(wasLiked ? previousCount - 1 : previousCount + 1);
    setToggling(true);

    try {
      if (wasLiked) {
        await del<{ count: number }>(
          `/blog/${postId}/like?visitorToken=${encodeURIComponent(token)}`
        );
      } else {
        await post<{ count: number }>(`/blog/${postId}/like`, { visitorToken: token });
      }
    } catch {
      setLikedByYou(wasLiked);
      setCount(previousCount);
    } finally {
      setToggling(false);
    }
  }

  return { count, likedByYou, loading, toggling, toggle };
}
