'use client';

import { ContentState } from '@/components/shared/ContentState';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorMessage({
  message = 'Something went wrong. Please try again.',
  onRetry,
  className = '',
}: ErrorMessageProps) {
  return (
    <ContentState
      state="error"
      message={message}
      className={className}
      action={
        onRetry ? (
          <button
            onClick={onRetry}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-purple-700 px-5 font-sans text-sm font-semibold text-white transition hover:bg-purple-600"
          >
            Try again
          </button>
        ) : undefined
      }
    />
  );
}
