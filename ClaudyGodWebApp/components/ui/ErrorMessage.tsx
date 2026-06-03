'use client';

import { AlertCircle } from 'lucide-react';

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
    <div className={`flex flex-col items-center justify-center gap-4 py-12 px-4 ${className}`}>
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
        <AlertCircle className="h-8 w-8 text-red-600" />
      </div>
      <div className="text-center">
        <p className="font-bricolage font-semibold text-neutral-900 text-lg mb-2">
          Error Loading Content
        </p>
        <p className="font-roboto text-neutral-600 text-sm max-w-sm">
          {message}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-worksans text-sm rounded-lg transition-colors duration-300"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
