import { useState, useEffect, useCallback } from 'react';
import { get, post, BackendError } from '@/lib/data/client';
import type { Comment } from '@/lib/data/types';

interface SubmitCommentInput {
  authorName: string;
  authorEmail: string;
  content: string;
  parentCommentId?: string;
}

/**
 * Fetches the approved-only comment list for a post and exposes a submit
 * function. New comments are always Pending on the backend — submit()
 * intentionally does NOT optimistically add the comment to `comments`, since
 * this list is the public "what's actually visible" view; the caller shows
 * its own "awaiting approval" confirmation instead.
 */
export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setComments(await get<Comment[]>(`/blog/${postId}/comments`));
    } catch (err) {
      setError(err instanceof BackendError ? err.message : 'Unable to load comments right now.');
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    void fetchComments();
  }, [fetchComments]);

  async function submitComment(input: SubmitCommentInput): Promise<void> {
    setSubmitting(true);
    try {
      await post(`/blog/${postId}/comments`, {
        authorName: input.authorName,
        authorEmail: input.authorEmail,
        content: input.content,
        parentCommentId: input.parentCommentId ?? null,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return { comments, loading, error, submitting, submitComment, refetch: fetchComments };
}
