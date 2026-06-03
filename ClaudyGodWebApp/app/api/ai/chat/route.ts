import { NextRequest, NextResponse } from 'next/server';
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

// Smart conversational responses with direct links
const FALLBACK_RESPONSES: Record<string, string> = {
  'music': `🎵 Oh, you're interested in our music! That's wonderful!

ClaudyGod has released **7 beautiful gospel albums** filled with spirit-filled worship and ministry. Our latest works include:
- **"Very Glorious"**
- **"You Are Our Everything"**

You can stream all our music on:
🎧 [Listen on Spotify](https://open.spotify.com/artist/claudygod)
🎵 [Apple Music](https://music.apple.com/artist/claudygod)
📺 [YouTube Music](https://music.youtube.com/search?q=claudygod)

Or visit our **[Music Page](/music)** to explore all albums with beautiful artwork and descriptions.

Which album would you like to hear more about? 😊`,

  'booking': `📅 Great! I'd love to help you book Minister ClaudyGod!

For **events, concerts, and ministry engagements**, we have a dedicated booking system:

👉 **[Go to Bookings Page](/bookings)** to:
✅ Check availability for your desired dates
✅ View pricing and package options
✅ See testimonials from previous events
✅ Submit a booking request

Our amazing team will get back to you within **24-48 hours** with all the details and next steps.

What type of event are you planning? We'd love to be part of it! 🎤`,

  'event': `🎪 We have some amazing events coming up!

Visit our **[Events Page](/events)** to explore:
✅ **Upcoming Events** - Register for future concerts and ministry tours
✅ **Ongoing Events** - See what's happening right now
✅ **Completed Events** - View highlights and past ministry moments

Each event page includes:
📸 Photo galleries
🎥 Video highlights
📍 Location & time details
🎟️ Registration links

What kind of event interests you most? I can help you find the perfect one! 🙌`,

  'donate': `💝 Thank you so much for your generous heart! Your support truly makes a difference.

Your donations help us:
✨ Spread the gospel through music
🎵 Support ministry outreach programs
🙏 Reach more lives globally
🤝 Help communities in need

**[Make a Donation Today](/donate)** - 100% secure and tax-deductible

We're deeply grateful for every contribution, no matter the size. Each gift is a blessing that extends our ministry's reach.

Is there anything else you'd like to know about our work? 🙏`,

  'volunteer': `🙌 That's incredible! We always need passionate volunteers like you!

We have exciting roles in:
📹 **Media** - Video production, photography, live streaming
🎵 **Music** - Singing, instruments, worship leading
👋 **Protocol** - Guest relations, ushering, hospitality
🛡️ **Security** - Event security, safety management
✨ **And More** - Your unique talents matter!

👉 **[Apply to Volunteer](/volunteer)** - Quick 5-minute application

Our team reviews applications within **3-5 business days** and will reach out with opportunities that match your skills and passion.

What area speaks to your heart? 💪`,

  'store': `🛍️ Oh, you want to check out our store! Awesome!

Visit our **[Online Store](/store)** to browse:
🎵 **Music** - Albums, EPs, and exclusive recordings
📀 **Physical Merchandise** - CDs, DVDs, vinyl
👕 **Branded Items** - Apparel and accessories
✨ **Exclusive** - Limited edition and signed items

**Free shipping** on select orders!

👉 **[Shop Now](/store)**

Is there something specific you're looking for? I'd love to help! 🎁`,

  'help': `👋 Hey there! I'm so glad you're here!

I'm your **ClaudyGod Assistant** and I'm here to help with anything you need:

🎵 **Music & Albums** - Stream, purchase, or learn about our music
📅 **Events & Bookings** - Find upcoming events or book Minister ClaudyGod
🎁 **Store** - Browse exclusive merchandise and products
💝 **Donations** - Support our ministry
🙌 **Volunteering** - Join our amazing team
📱 **Navigation** - Help finding anything on the site

**What can I help you with today?** Just ask me anything! 😊`,
};

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Greeting responses
  if (
    lowerMessage.includes('hello') ||
    lowerMessage.includes('hi ') ||
    lowerMessage.includes('hey') ||
    lowerMessage.includes('greet')
  ) {
    return `Hey there! 👋 Welcome to ClaudyGod Music Ministries! I'm so happy you're here.

How can I help you today? Whether you want to explore our music, attend an event, volunteer, or just chat about ministry, I'm here for you! 😊`;
  }

  if (
    lowerMessage.includes('thank') ||
    lowerMessage.includes('thanks') ||
    lowerMessage.includes('appreciate')
  ) {
    return `You're so welcome! 💝 That's very kind of you to say. We're truly grateful for your interest and support of our ministry.

Is there anything else I can help you with today? 🙏`;
  }

  // Music keywords
  if (
    lowerMessage.includes('music') ||
    lowerMessage.includes('album') ||
    lowerMessage.includes('song') ||
    lowerMessage.includes('stream') ||
    lowerMessage.includes('listen') ||
    lowerMessage.includes('spotify')
  ) {
    return FALLBACK_RESPONSES.music;
  }

  // Booking keywords
  if (
    lowerMessage.includes('booking') ||
    lowerMessage.includes('book') ||
    lowerMessage.includes('hire') ||
    lowerMessage.includes('concert') ||
    lowerMessage.includes('performance') ||
    lowerMessage.includes('event for')
  ) {
    return FALLBACK_RESPONSES.booking;
  }

  // Event keywords
  if (
    lowerMessage.includes('upcoming') ||
    lowerMessage.includes('register') ||
    lowerMessage.includes('attend event') ||
    lowerMessage.includes('tour')
  ) {
    return FALLBACK_RESPONSES.event;
  }

  // Donation keywords
  if (
    lowerMessage.includes('donat') ||
    lowerMessage.includes('giving') ||
    lowerMessage.includes('support') ||
    lowerMessage.includes('contribute')
  ) {
    return FALLBACK_RESPONSES.donate;
  }

  // Volunteer keywords
  if (
    lowerMessage.includes('volunt') ||
    lowerMessage.includes('volunteer') ||
    lowerMessage.includes('join') ||
    lowerMessage.includes('help')
  ) {
    return FALLBACK_RESPONSES.volunteer;
  }

  // Store keywords
  if (
    lowerMessage.includes('store') ||
    lowerMessage.includes('shop') ||
    lowerMessage.includes('buy') ||
    lowerMessage.includes('merchandise') ||
    lowerMessage.includes('purchase')
  ) {
    return FALLBACK_RESPONSES.store;
  }

  // Help request
  if (
    lowerMessage.includes('help') ||
    lowerMessage.includes('assist') ||
    lowerMessage.includes('what can') ||
    lowerMessage.includes('can you')
  ) {
    return FALLBACK_RESPONSES.help;
  }

  // Default conversational response
  return `That's a great question! 😊 I'd love to help you with that.

Here are some things I can assist with:
🎵 **Music & Albums** - Tell me more about our releases
📅 **Events & Bookings** - Looking to attend or book an event?
🎁 **Store** - Browse our products
💝 **Donations** - Support our ministry
🙌 **Volunteering** - Join our team
📱 **Navigation** - Help finding anything on the site

Feel free to ask me anything about these topics, or let me know if there's something specific I can help with! 💙`;
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
