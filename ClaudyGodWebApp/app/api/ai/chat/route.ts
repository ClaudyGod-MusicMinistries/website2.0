import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { proxyPost } from '@/utils/backendProxy';

const chatSchema = z.object({
  message: z.string().min(1).max(1000),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
      }),
    )
    .optional(),
});

// Fallback responses for when backend is unavailable
const FALLBACK_RESPONSES: Record<string, string> = {
  'music': `🎵 ClaudyGod has 7 incredible gospel albums available on all streaming platforms. Our latest releases include "Very Glorious" and "You Are Our Everything". You can stream all albums on Spotify, Apple Music, YouTube Music, and more. Would you like recommendations on where to start?`,
  'booking': `📅 You can book Minister ClaudyGod for events, concerts, and ministry engagements. Visit our bookings page to check availability, view pricing, and submit a booking request. Our team typically responds within 24-48 hours.`,
  'event': `🎪 We have upcoming events, concerts, and ministry tours scheduled throughout the year. Visit the Events page to see upcoming, ongoing, and completed events. You can register for events directly from there.`,
  'donate': `💝 Your financial support helps spread the gospel through music and ministry. Visit our Donate page to make a secure contribution. All donations are tax-deductible and go directly to ministry work.`,
  'volunteer': `🙌 We're always looking for passionate volunteers! Visit the Volunteer page to apply. We have roles in Media, Music, Ushering, Security, and more. Our team reviews applications within 3-5 business days.`,
  'store': `🛍️ Visit our Store to purchase merchandise, music CDs, DVDs, and digital products. We also offer exclusive items and signed merchandise. Free shipping available on orders over certain amounts.`,
  'help': `👋 I can help you with:
• 🎵 Music & Albums
• 📅 Events & Bookings
• 🎁 Store & Donations
• 🙌 Volunteering
• 📱 Website Navigation

What would you like to know more about?`,
};

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Check for keywords
  if (
    lowerMessage.includes('music') ||
    lowerMessage.includes('album') ||
    lowerMessage.includes('song') ||
    lowerMessage.includes('stream')
  ) {
    return FALLBACK_RESPONSES.music;
  }
  if (
    lowerMessage.includes('booking') ||
    lowerMessage.includes('book') ||
    lowerMessage.includes('event') ||
    lowerMessage.includes('concert')
  ) {
    return FALLBACK_RESPONSES.booking;
  }
  if (lowerMessage.includes('event')) {
    return FALLBACK_RESPONSES.event;
  }
  if (
    lowerMessage.includes('donat') ||
    lowerMessage.includes('giving') ||
    lowerMessage.includes('support')
  ) {
    return FALLBACK_RESPONSES.donate;
  }
  if (lowerMessage.includes('volunt')) {
    return FALLBACK_RESPONSES.volunteer;
  }
  if (lowerMessage.includes('store') || lowerMessage.includes('shop')) {
    return FALLBACK_RESPONSES.store;
  }

  // Default helpful response
  return `I'm here to help! I can answer questions about our music, upcoming events, booking Minister ClaudyGod, volunteering, donations, and more. What would you like to know?`;
}

/**
 * POST /api/ai/chat
 * AI chat endpoint with backend proxy and intelligent fallback
 */
export async function POST(req: NextRequest) {
  try {
    // Validate request
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request',
          data: null,
          errors: ['Request body must be valid JSON'],
          fieldErrors: {},
        },
        { status: 400 },
      );
    }

    const { message, history } = chatSchema.parse(body);

    // Try backend first
    try {
      const backendReq = new NextRequest(req, {
        body: JSON.stringify({ message, history }),
      });

      const backendRes = await proxyPost(backendReq, '/ai/chat');

      // If backend is healthy, return its response
      if (backendRes.ok || backendRes.status !== 503) {
        return backendRes;
      }
    } catch (err) {
      console.warn('[chat] Backend unavailable, using fallback:', err instanceof Error ? err.message : 'Unknown error');
    }

    // Fallback response when backend is unavailable
    const fallbackResponse = getFallbackResponse(message);

    return NextResponse.json(
      {
        success: true,
        message: 'Response generated',
        data: {
          reply: fallbackResponse,
        },
        errors: [],
        fieldErrors: {},
      },
      { status: 200 },
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      const fieldErrors = Object.fromEntries(
        err.errors.map((e) => [e.path[0], [e.message]]),
      );

      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          data: null,
          errors: ['Please check your message'],
          fieldErrors,
        },
        { status: 400 },
      );
    }

    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[chat] Error:', message);

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to process chat. Please try again.',
        data: null,
        errors: [message],
        fieldErrors: {},
      },
      { status: 500 },
    );
  }
}
