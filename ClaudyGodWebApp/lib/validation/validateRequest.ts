import { NextResponse, type NextRequest } from 'next/server';
import type { z } from 'zod';
import { proxyPost } from '@/lib/data/backendProxy';

export async function validateAndProxy(req: NextRequest, path: string, schema: z.ZodType) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid request body.',
        data: null,
        errors: ['Expected JSON.'],
        fieldErrors: {},
      },
      { status: 400 }
    );
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const field = String(issue.path[0] ?? 'request');
      (fieldErrors[field] ??= []).push(issue.message);
    }
    return NextResponse.json(
      {
        success: false,
        message: 'Please correct the highlighted details.',
        data: null,
        errors: ['Validation failed.'],
        fieldErrors,
      },
      { status: 422 }
    );
  }
  return proxyPost(req, path, { body: result.data });
}
