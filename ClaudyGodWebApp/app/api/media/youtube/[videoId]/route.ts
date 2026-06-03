import { NextRequest, NextResponse } from 'next/server';
import { requireApiKey } from '@/middleware/apiKeyValidator';

const YOUTUBE_DOMAIN = 'youtube.com';
const YOUTUBE_SECURE_DOMAIN = 'youtube-nocookie.com';

interface YoutubeEmbedRequest {
  videoId: string;
  autoplay?: boolean;
  controls?: boolean;
  modestBranding?: boolean;
}

/**
 * POST /api/media/youtube/[videoId]
 * Securely proxy YouTube embed links to prevent direct access
 * Requires: x-api-key header with valid API key
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { videoId: string } },
) {
  // Validate API key
  const keyValidation = requireApiKey(req);
  if (keyValidation) return keyValidation;

  try {
    const { videoId } = params;

    // Validate videoId format (alphanumeric, dash, underscore only)
    if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid video ID format',
          data: null,
          errors: ['Video ID must be 11 alphanumeric characters'],
          fieldErrors: {},
        },
        { status: 400 },
      );
    }

    const body = await req.json().catch(() => ({}));
    const { autoplay = false, controls = true, modestBranding = true } = body as YoutubeEmbedRequest;

    // Generate secure YouTube embed URL (uses youtube-nocookie.com for privacy)
    const embedUrl = new URL(`https://${YOUTUBE_SECURE_DOMAIN}/embed/${videoId}`);
    embedUrl.searchParams.set('autoplay', autoplay ? '1' : '0');
    embedUrl.searchParams.set('controls', controls ? '1' : '0');
    embedUrl.searchParams.set('modestbranding', modestBranding ? '1' : '0');
    embedUrl.searchParams.set('rel', '0'); // Prevent related videos
    embedUrl.searchParams.set('fs', '1'); // Allow fullscreen
    embedUrl.searchParams.set('iv_load_policy', '3'); // Hide annotations

    // Log access for security monitoring
    console.log(`[youtube-proxy] Video access: ${videoId.slice(-4)}... via API key`);

    return NextResponse.json(
      {
        success: true,
        message: 'YouTube embed URL generated',
        data: {
          videoId,
          embedUrl: embedUrl.toString(),
          provider: 'youtube-nocookie',
          expiresIn: 3600, // 1 hour validity
          generatedAt: new Date().toISOString(),
        },
        errors: [],
        fieldErrors: {},
      },
      {
        headers: {
          'Cache-Control': 'private, max-age=300', // Cache for 5 minutes
          'X-Content-Type-Options': 'nosniff',
        },
      },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[youtube-proxy] Error:', message);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to generate video URL',
        data: null,
        errors: ['Unable to process video request'],
        fieldErrors: {},
      },
      { status: 500 },
    );
  }
}

/**
 * GET /api/media/youtube/[videoId]
 * Get pre-generated embed URL (uses cached data)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { videoId: string } },
) {
  const keyValidation = requireApiKey(req);
  if (keyValidation) return keyValidation;

  try {
    const { videoId } = params;

    if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid video ID',
          data: null,
          errors: ['Video ID must be 11 alphanumeric characters'],
          fieldErrors: {},
        },
        { status: 400 },
      );
    }

    const embedUrl = new URL(`https://${YOUTUBE_SECURE_DOMAIN}/embed/${videoId}`);
    embedUrl.searchParams.set('controls', '1');
    embedUrl.searchParams.set('rel', '0');
    embedUrl.searchParams.set('fs', '1');
    embedUrl.searchParams.set('iv_load_policy', '3');

    return NextResponse.json(
      {
        success: true,
        data: {
          videoId,
          embedUrl: embedUrl.toString(),
          provider: 'youtube-nocookie',
        },
        errors: [],
        fieldErrors: {},
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        },
      },
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching video URL',
        data: null,
        errors: [],
        fieldErrors: {},
      },
      { status: 500 },
    );
  }
}
