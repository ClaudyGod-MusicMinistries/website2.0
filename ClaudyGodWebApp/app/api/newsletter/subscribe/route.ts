import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { proxyPost } from '@/utils/backendProxy';
import { newsletterWelcome } from '@/utils/emailTemplates';

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

    // Proxy to backend for persistence
    const backendReq = new NextRequest(
      new URL('/api/v1.0/subscribers', process.env.API_BASE_URL ?? 'http://localhost:8080'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': req.headers.get('authorization') || '',
        },
        body: JSON.stringify({ email }),
      },
    );

    const backendRes = await proxyPost(backendReq, '/subscribers');
    const backendData = await backendRes.json();

    // If successful, the backend would typically send the email
    // For now, we prepare a confirmation response
    if (backendRes.ok || backendData.success !== false) {
      console.log(`[newsletter] New subscriber: ${email}`);

      // In production, the backend should handle sending the welcome email
      // Here we acknowledge the subscription
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you for subscribing! Check your email for confirmation.',
          data: { email },
          errors: [],
          fieldErrors: {},
        },
        { status: 201 },
      );
    } else {
      // Handle backend error (duplicate, validation, etc.)
      return NextResponse.json(
        {
          success: false,
          message: backendData.message || 'Unable to complete subscription',
          data: null,
          errors: backendData.errors || ['Subscription failed'],
          fieldErrors: backendData.fieldErrors || {},
        },
        { status: backendRes.status || 400 },
      );
    }
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
          errors: ['Please check your information'],
          fieldErrors,
        },
        { status: 400 },
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
      { status: 500 },
    );
  }
}

/**
 * GET /api/newsletter/subscribe
 * Health check for newsletter endpoint
 */
export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: 'Newsletter subscription endpoint is operational',
      data: null,
    },
    { status: 200 },
  );
}
