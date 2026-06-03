import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme-in-production';

if (JWT_SECRET === 'changeme-in-production' && process.env.NODE_ENV === 'production') {
  console.error('🚨 JWT_SECRET is using default value in production — set JWT_SECRET env var');
}

export type TokenValidationResult =
  | { valid: true; userId: string; email?: string }
  | { valid: false; error: string };

export function validateToken(req: NextRequest): TokenValidationResult {
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return { valid: false, error: 'Missing authorization header' };
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    // For now, we rely on the backend to validate JWT
    // In production, you should decode and validate locally for performance
    // This requires the token to be verified by the backend before reaching protected endpoints

    if (!token || token.length < 20) {
      return { valid: false, error: 'Invalid token format' };
    }

    // Basic validation: token should look like JWT (3 parts separated by dots)
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false, error: 'Invalid JWT format' };
    }

    return { valid: true, userId: 'from-token' };
  } catch (err) {
    return { valid: false, error: 'Token validation failed' };
  }
}

export function requireToken(req: NextRequest): NextResponse | null {
  const result = validateToken(req);

  if (!result.valid) {
    console.warn(`[tokenValidator] Token validation failed: ${result.error}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Authentication required',
        data: null,
        errors: [result.error],
        fieldErrors: {},
      },
      { status: 401 },
    );
  }

  return null; // Valid, continue processing
}

export function extractToken(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  return authHeader.slice(7);
}
