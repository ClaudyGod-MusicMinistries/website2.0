/**
 * YouTube proxy client
 * Securely fetches YouTube embed URLs through backend proxy
 * Prevents direct YouTube link exposure
 */

interface YoutubeEmbedData {
  videoId: string;
  embedUrl: string;
  provider: 'youtube-nocookie';
  expiresIn?: number;
  generatedAt?: string;
}

interface YoutubeEmbedOptions {
  autoplay?: boolean;
  controls?: boolean;
  modestBranding?: boolean;
}

const CACHE_KEY = 'youtube_embed_cache_';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

function getCacheKey(videoId: string): string {
  return CACHE_KEY + videoId;
}

function isCacheValid(cached: unknown): boolean {
  if (!cached || typeof cached !== 'object') return false;
  const item = cached as { timestamp: number };
  return Date.now() - item.timestamp < CACHE_DURATION;
}

export async function getYoutubeEmbedUrl(
  videoId: string,
  options: YoutubeEmbedOptions = {},
): Promise<YoutubeEmbedData> {
  // Validate videoId format
  if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    throw new Error('Invalid YouTube video ID format (must be 11 alphanumeric characters)');
  }

  // Check cache
  const cacheKey = getCacheKey(videoId);
  const cached = localStorage?.getItem(cacheKey);
  if (cached) {
    try {
      const data = JSON.parse(cached) as YoutubeEmbedData & { timestamp: number };
      if (isCacheValid(data)) {
        console.log(`[youtubeClient] Using cached embed URL for ${videoId}`);
        return {
          videoId: data.videoId,
          embedUrl: data.embedUrl,
          provider: data.provider,
          expiresIn: data.expiresIn,
          generatedAt: data.generatedAt,
        };
      }
    } catch {
      localStorage?.removeItem(cacheKey);
    }
  }

  try {
    const response = await fetch(`/api/media/youtube/${videoId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.message || `Failed to fetch YouTube embed (${response.status})`,
      );
    }

    const data = await response.json();
    if (!data.success || !data.data) {
      throw new Error('Invalid response from YouTube proxy');
    }

    const embedData: YoutubeEmbedData & { timestamp: number } = {
      ...data.data,
      timestamp: Date.now(),
    };

    // Cache the result
    try {
      localStorage?.setItem(cacheKey, JSON.stringify(embedData));
    } catch {
      // Storage quota exceeded or private window
      console.warn('[youtubeClient] Unable to cache YouTube embed URL');
    }

    return {
      videoId: embedData.videoId,
      embedUrl: embedData.embedUrl,
      provider: embedData.provider,
      expiresIn: embedData.expiresIn,
      generatedAt: embedData.generatedAt,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch YouTube URL';
    console.error('[youtubeClient] Error:', message);
    throw new Error(`Unable to load video: ${message}`);
  }
}

export function buildYoutubeEmbedHtml(embedUrl: string, width = 560, height = 315): string {
  return `<iframe width="${width}" height="${height}" src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
}

export function clearYoutubeCache(): void {
  if (!localStorage) return;
  const keys = Object.keys(localStorage);
  keys
    .filter((k) => k.startsWith(CACHE_KEY))
    .forEach((k) => localStorage.removeItem(k));
  console.log('[youtubeClient] Cache cleared');
}
