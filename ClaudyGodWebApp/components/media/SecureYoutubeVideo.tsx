'use client';

import { useEffect, useState } from 'react';
import { getYoutubeEmbedUrl } from '@/utils/youtubeClient';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface SecureYoutubeVideoProps {
  videoId: string;
  title?: string;
  width?: number;
  height?: number;
  autoplay?: boolean;
  className?: string;
}

export function SecureYoutubeVideo({
  videoId,
  title = 'Video player',
  width = 560,
  height = 315,
  autoplay = false,
  className = '',
}: SecureYoutubeVideoProps) {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadVideo = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getYoutubeEmbedUrl(videoId, { autoplay });

        if (isMounted) {
          setEmbedUrl(data.embedUrl);
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Failed to load video';
          setError(message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadVideo();

    return () => {
      isMounted = false;
    };
  }, [videoId, autoplay]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-neutral-900 rounded-lg ${className}`}
        style={{ width, height }}>
        <LoadingSpinner size="md" text="Loading video..." />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-red-50 border-2 border-red-200 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <div className="text-center px-4">
          <p className="text-red-600 font-semibold">Unable to load video</p>
          <p className="text-red-500 text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!embedUrl) {
    return (
      <div
        className={`flex items-center justify-center bg-neutral-200 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <p className="text-neutral-600">Video unavailable</p>
      </div>
    );
  }

  return (
    <iframe
      width={width}
      height={height}
      src={embedUrl}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className={`rounded-lg ${className}`}
    />
  );
}
