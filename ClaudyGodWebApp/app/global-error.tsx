'use client';

import { useEffect } from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('[Global Error]', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#080808',
          fontFamily: 'system-ui, sans-serif',
          color: '#F5F5F5',
          padding: '1rem',
        }}
      >
        <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <div
            style={{
              margin: '0 auto 1.5rem',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AlertOctagon style={{ width: '28px', height: '28px', color: '#EF4444' }} />
          </div>

          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Critical Error
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#A8A8A8', lineHeight: '1.6', marginBottom: '2rem' }}>
            The application encountered a critical error and could not recover.
            {error.digest && (
              <span style={{ display: 'block', marginTop: '0.5rem', fontFamily: 'monospace', fontSize: '0.75rem', color: '#6B6B6B' }}>
                ID: {error.digest}
              </span>
            )}
          </p>

          <button
            onClick={reset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#C9A84C',
              color: '#080808',
              border: 'none',
              borderRadius: '8px',
              padding: '0.625rem 1.25rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            <RefreshCw style={{ width: '16px', height: '16px' }} />
            Reload application
          </button>
        </div>
      </body>
    </html>
  );
}
