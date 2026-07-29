import type { ReactNode } from 'react';
import { AlertCircle, Inbox, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ContentStateProps {
  state: 'loading' | 'empty' | 'error';
  title?: string;
  message?: string;
  action?: ReactNode;
  className?: string;
}

const defaults = {
  loading: { title: 'Loading', message: 'Please wait a moment.' },
  empty: { title: 'Nothing here yet', message: 'New content will appear here when available.' },
  error: { title: 'Unable to load', message: 'Please try again.' },
};

export function ContentState({ state, title, message, action, className }: ContentStateProps) {
  const Icon = state === 'loading' ? Loader2 : state === 'error' ? AlertCircle : Inbox;
  return (
    <div
      className={cn(
        'flex min-h-52 flex-col items-center justify-center px-4 py-10 text-center',
        className
      )}
      role={state === 'error' ? 'alert' : 'status'}
    >
      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-purple-50 text-purple-700">
        <Icon className={cn('h-5 w-5', state === 'loading' && 'animate-spin')} />
      </span>
      <h3 className="font-display text-base font-semibold text-neutral-900">
        {title ?? defaults[state].title}
      </h3>
      <p className="mt-1 max-w-sm font-sans text-sm leading-6 text-neutral-500">
        {message ?? defaults[state].message}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
