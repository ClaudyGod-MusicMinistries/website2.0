'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { MessageCircle, CornerDownRight, Loader2 } from 'lucide-react';
import { useComments } from '@/hooks/useComments';
import { BackendError } from '@/lib/data/client';
import { ReactionBar } from '@/components/blog/ReactionBar';
import type { Comment } from '@/lib/data/types';

interface CommentFormData {
  authorName: string;
  authorEmail: string;
  content: string;
}

const inputCls =
  'w-full h-11 px-4 border border-neutral-200 rounded-lg font-sans text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-300 bg-white';
const textareaCls =
  'w-full px-4 py-3 border border-neutral-200 rounded-lg font-sans text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-300 bg-white resize-none';
const errCls = 'mt-1 font-sans text-[0.6rem] tracking-[0.08em] uppercase text-red-500';

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => Promise<void>;
  submitting: boolean;
  submitLabel: string;
  compact?: boolean;
}

function CommentForm({ onSubmit, submitting, submitLabel, compact }: CommentFormProps) {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>();

  const submit = async (data: CommentFormData) => {
    await onSubmit(data);
    reset();
    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-lg bg-purple-50 border border-purple-100 px-4 py-3">
        <p className="font-sans text-sm text-purple-800">
          Thanks — your comment is awaiting approval and will appear once reviewed.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-1 font-sans text-[0.6rem] tracking-[0.12em] uppercase text-purple-600 hover:text-purple-800"
        >
          Write another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="space-y-3">
      <div
        className={
          compact
            ? 'grid grid-cols-1 sm:grid-cols-2 gap-3'
            : 'grid grid-cols-1 sm:grid-cols-2 gap-3'
        }
      >
        <div>
          <input
            {...register('authorName', { required: 'Name is required' })}
            placeholder="Your name"
            className={inputCls}
          />
          {errors.authorName && <p className={errCls}>{errors.authorName.message}</p>}
        </div>
        <div>
          <input
            {...register('authorEmail', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
            })}
            type="email"
            placeholder="Your email (not shown publicly)"
            className={inputCls}
          />
          {errors.authorEmail && <p className={errCls}>{errors.authorEmail.message}</p>}
        </div>
      </div>
      <div>
        <textarea
          {...register('content', { required: 'Write a comment first' })}
          rows={compact ? 2 : 3}
          placeholder="Share your thoughts…"
          className={textareaCls}
        />
        {errors.content && <p className={errCls}>{errors.content.message}</p>}
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 h-10 px-6 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-sans text-xs tracking-[0.14em] uppercase rounded-lg transition-all duration-300"
      >
        {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
        {submitLabel}
      </button>
    </form>
  );
}

function CommentRow({
  comment,
  onReply,
  replyOpen,
  submitting,
  onSubmitReply,
}: {
  comment: Comment;
  onReply: (id: string | null) => void;
  replyOpen: boolean;
  submitting: boolean;
  onSubmitReply: (data: CommentFormData) => Promise<void>;
}) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 font-display font-semibold text-purple-700 text-sm">
          {comment.authorName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="bg-neutral-50 rounded-lg px-4 py-3">
            <div className="flex items-baseline gap-2 flex-wrap mb-1">
              <p className="font-display font-semibold text-neutral-900 text-sm">
                {comment.authorName}
              </p>
              <p className="font-sans text-[0.55rem] tracking-[0.08em] uppercase text-neutral-400">
                {formatDate(comment.createdAt)}
              </p>
            </div>
            <p className="font-sans text-neutral-700 text-sm leading-relaxed whitespace-pre-wrap">
              {comment.content}
            </p>
          </div>
          <div className="mt-2 flex items-center gap-4 flex-wrap">
            <ReactionBar target={{ type: 'comment', id: comment.id }} size="sm" />
            <button
              type="button"
              onClick={() => onReply(replyOpen ? null : comment.id)}
              className="inline-flex items-center gap-1.5 font-sans text-[0.6rem] tracking-[0.12em] uppercase text-neutral-400 hover:text-purple-600 transition-colors duration-300"
            >
              <CornerDownRight className="h-3 w-3" />
              Reply
            </button>
          </div>

          {replyOpen && (
            <div className="mt-3">
              <CommentForm
                onSubmit={onSubmitReply}
                submitting={submitting}
                submitLabel="Post reply"
                compact
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CommentsSection({ postId }: { postId: string }) {
  const { comments, loading, error, submitting, submitComment, refetch } = useComments(postId);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { topLevel, repliesByParent } = useMemo(() => {
    const top = comments.filter((c) => !c.parentCommentId);
    const replies = new Map<string, Comment[]>();
    for (const c of comments) {
      if (!c.parentCommentId) continue;
      const list = replies.get(c.parentCommentId) ?? [];
      list.push(c);
      replies.set(c.parentCommentId, list);
    }
    return { topLevel: top, repliesByParent: replies };
  }, [comments]);

  async function handleSubmit(data: CommentFormData, parentCommentId?: string) {
    setSubmitError(null);
    try {
      await submitComment({ ...data, parentCommentId });
      setReplyingTo(null);
    } catch (err) {
      setSubmitError(
        err instanceof BackendError ? err.message : 'Unable to submit your comment right now.'
      );
      throw err;
    }
  }

  return (
    <section className="mt-16 pt-10 border-t border-black/[0.06]">
      <div className="flex items-center gap-2.5 mb-8">
        <MessageCircle className="h-5 w-5 text-purple-600" />
        <h2 className="font-display font-bold text-neutral-900 text-xl">
          Comments{' '}
          {comments.length > 0 && (
            <span className="text-neutral-400 font-normal">({comments.length})</span>
          )}
        </h2>
      </div>

      <div className="mb-10">
        <CommentForm
          onSubmit={(data) => handleSubmit(data)}
          submitting={submitting && !replyingTo}
          submitLabel="Post comment"
        />
        {submitError && <p className={errCls}>{submitError}</p>}
      </div>

      {loading ? (
        <p className="font-sans text-sm text-neutral-400">Loading comments…</p>
      ) : error ? (
        <div className="flex items-center gap-3">
          <p className="font-sans text-sm text-neutral-500">Unable to load comments.</p>
          <button
            type="button"
            onClick={refetch}
            className="font-sans text-xs tracking-[0.1em] uppercase text-purple-600 hover:text-purple-800"
          >
            Try again
          </button>
        </div>
      ) : topLevel.length === 0 ? (
        <p className="font-sans text-sm text-neutral-400">Be the first to share your thoughts.</p>
      ) : (
        <div className="space-y-6">
          {topLevel.map((comment) => (
            <div key={comment.id} className="space-y-4">
              <CommentRow
                comment={comment}
                replyOpen={replyingTo === comment.id}
                onReply={setReplyingTo}
                submitting={submitting && replyingTo === comment.id}
                onSubmitReply={(data) => handleSubmit(data, comment.id)}
              />
              {(repliesByParent.get(comment.id) ?? []).length > 0 && (
                <div className="pl-12 space-y-4">
                  {(repliesByParent.get(comment.id) ?? []).map((reply) => (
                    <div key={reply.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0 font-display font-semibold text-neutral-500 text-xs">
                        {reply.authorName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="bg-neutral-50 rounded-lg px-4 py-3">
                          <div className="flex items-baseline gap-2 flex-wrap mb-1">
                            <p className="font-display font-semibold text-neutral-900 text-sm">
                              {reply.authorName}
                            </p>
                            <p className="font-sans text-[0.55rem] tracking-[0.08em] uppercase text-neutral-400">
                              {formatDate(reply.createdAt)}
                            </p>
                          </div>
                          <p className="font-sans text-neutral-700 text-sm leading-relaxed whitespace-pre-wrap">
                            {reply.content}
                          </p>
                        </div>
                        <div className="mt-2">
                          <ReactionBar target={{ type: 'comment', id: reply.id }} size="sm" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
