import { NextRequest, NextResponse } from 'next/server';
import { requireApiKey } from '@/middleware/apiKeyValidator';
import { extractToken } from '@/middleware/tokenValidator';

interface MediaItem {
  id: string;
  title: string;
  youtubeVideoId: string;
  description: string;
  category: 'music' | 'testimony' | 'ministry' | 'tutorial';
  publishedAt: string;
  isPublished: boolean;
}

// Mock database - replace with actual database calls
const mockMedia: MediaItem[] = [
  {
    id: '1',
    title: 'Latest Worship Session',
    youtubeVideoId: 'dQw4w9WgXcQ', // Example ID
    description: 'Live worship and praise session',
    category: 'music',
    publishedAt: new Date().toISOString(),
    isPublished: true,
  },
];

/**
 * GET /api/media/videos
 * Fetch secure video list
 * Requires: x-api-key header OR authorization token
 */
export async function GET(req: NextRequest) {
  // Require API key for public endpoints
  const keyValidation = requireApiKey(req);
  if (keyValidation) return keyValidation;

  try {
    // Return only published media for public API
    const publicMedia = mockMedia.filter((m) => m.isPublished);

    return NextResponse.json(
      {
        success: true,
        message: 'Media list retrieved',
        data: {
          items: publicMedia,
          count: publicMedia.length,
        },
        errors: [],
        fieldErrors: {},
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
          'X-Content-Type-Options': 'nosniff',
        },
      },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[media/videos] Error:', message);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch media list',
        data: null,
        errors: [message],
        fieldErrors: {},
      },
      { status: 500 },
    );
  }
}

/**
 * POST /api/media/videos
 * Create new media item (admin only)
 * Requires: authorization token with admin role
 */
export async function POST(req: NextRequest) {
  // Require authentication token for protected endpoints
  const token = extractToken(req);
  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: 'Authentication required for this action',
        data: null,
        errors: ['Missing authorization token'],
        fieldErrors: {},
      },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();
    const { title, youtubeVideoId, description, category } = body;

    // Validate required fields
    if (!title || !youtubeVideoId || !category) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          data: null,
          errors: [],
          fieldErrors: {
            title: !title ? ['Title is required'] : [],
            youtubeVideoId: !youtubeVideoId ? ['YouTube video ID is required'] : [],
            category: !category ? ['Category is required'] : [],
          },
        },
        { status: 400 },
      );
    }

    // TODO: Verify token with backend and check admin role
    // For now, just log that authentication was attempted
    console.log('[media/videos] Authenticated POST request received');

    const newMedia: MediaItem = {
      id: String(mockMedia.length + 1),
      title,
      youtubeVideoId,
      description: description || '',
      category: category || 'ministry',
      publishedAt: new Date().toISOString(),
      isPublished: false,
    };

    mockMedia.push(newMedia);

    return NextResponse.json(
      {
        success: true,
        message: 'Media item created successfully',
        data: newMedia,
        errors: [],
        fieldErrors: {},
      },
      { status: 201 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[media/videos POST] Error:', message);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create media item',
        data: null,
        errors: [message],
        fieldErrors: {},
      },
      { status: 500 },
    );
  }
}
