import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { proxyPost } from '@/lib/data/backendProxy';

const subscriptionSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

/**
 * POST /api/newsletter/subscribe
 * Subscribe to ClaudyGod newsletter
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = subscriptionSchema.parse(body);

    // The compact welcome form collects email only. Supply a neutral display
    // name required by the subscriber contract and return the upstream result
    // unchanged—never acknowledge a subscription the backend did not save.
    return proxyPost(req, '/subscribers', {
      body: { name: 'Newsletter Subscriber', email },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      const fieldErrors = Object.fromEntries(err.errors.map((e) => [e.path[0], [e.message]]));

      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          data: null,
          errors: ['Please check your information'],
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[newsletter/subscribe] Error:', message);

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to process subscription. Please try again later.',
        data: null,
        errors: [message],
        fieldErrors: {},
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/newsletter/subscribe — lightweight route health check.
 */
export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: 'Newsletter subscription endpoint is operational',
      data: null,
    },
    { status: 200 }
  );
}
