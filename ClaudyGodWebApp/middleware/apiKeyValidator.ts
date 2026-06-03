import { NextRequest, NextResponse } from 'next/server';

const VALID_API_KEYS = (process.env.VALID_API_KEYS || '').split(',').filter(Boolean);
const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;

if (!INTERNAL_API_KEY && process.env.NODE_ENV === 'production') {
  console.warn('⚠️ INTERNAL_API_KEY not set in production — API endpoints will be unsecured');
}

export type ApiKeyValidationResult =
  | { valid: true; keyId: string }
  | { valid: false; error: string };

export function validateApiKey(req: NextRequest): ApiKeyValidationResult {
  const apiKey = req.headers.get('x-api-key');

  if (!apiKey) {
    return { valid: false, error: 'Missing API key in x-api-key header' };
  }

  if (VALID_API_KEYS.includes(apiKey)) {
    return { valid: true, keyId: apiKey.slice(-4) }; // Return last 4 chars for logging
  }

  return { valid: false, error: 'Invalid API key' };
}

export function requireApiKey(req: NextRequest): NextResponse | null {
  const result = validateApiKey(req);

  if (!result.valid) {
    console.warn(`[apiKeyValidator] Invalid API key attempt: ${result.error}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Unauthorized access',
        data: null,
        errors: ['Invalid or missing API key'],
        fieldErrors: {},
      },
      { status: 401 },
    );
  }

  return null; // Valid, continue processing
}

export function getInternalApiKey(): string | undefined {
  return INTERNAL_API_KEY;
}
