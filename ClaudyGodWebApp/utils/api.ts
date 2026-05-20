import { ZodError } from 'zod';
import type { ApiSuccess, ApiFailure, ErrorCode } from '@/types/api';

// ─── HTTP error class ─────────────────────────────────────────────────────

export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly code: ErrorCode = 'BAD_REQUEST',
    public readonly details?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

// ─── Typed response builders ──────────────────────────────────────────────

function timestamp() {
  return new Date().toISOString();
}

export function ok<T>(data: T, message?: string, status = 200): Response {
  return Response.json(
    { success: true, data, message, timestamp: timestamp() } satisfies ApiSuccess<T>,
    { status }
  );
}

export function created<T>(data: T, message?: string): Response {
  return ok(data, message, 201);
}

export function noContent(): Response {
  return new Response(null, { status: 204 });
}

export function badRequest(message: string, details?: Record<string, string[]>): Response {
  return errorResponse(400, 'BAD_REQUEST', message, details);
}

export function unauthorized(message = 'Unauthorized'): Response {
  return errorResponse(401, 'UNAUTHORIZED', message);
}

export function forbidden(message = 'Forbidden'): Response {
  return errorResponse(403, 'FORBIDDEN', message);
}

export function notFound(message = 'Resource not found'): Response {
  return errorResponse(404, 'NOT_FOUND', message);
}

export function methodNotAllowed(allowed: string[]): Response {
  return new Response(null, {
    status: 405,
    headers: { Allow: allowed.join(', ') },
  });
}

export function conflict(message: string): Response {
  return errorResponse(409, 'CONFLICT', message);
}

export function rateLimited(message = 'Too many requests'): Response {
  return errorResponse(429, 'RATE_LIMITED', message);
}

export function serverError(message = 'Internal server error'): Response {
  return errorResponse(500, 'INTERNAL_ERROR', message);
}

export function serviceUnavailable(message = 'Service temporarily unavailable'): Response {
  return errorResponse(503, 'SERVICE_UNAVAILABLE', message);
}

function errorResponse(
  status: number,
  code: ErrorCode,
  message: string,
  details?: Record<string, string[]>
): Response {
  return Response.json(
    {
      success: false,
      error: { code, message, ...(details && { details }) },
      timestamp: timestamp(),
    } satisfies ApiFailure,
    { status }
  );
}

// ─── Validation helper ────────────────────────────────────────────────────

export function validationError(err: ZodError): Response {
  const details = Object.fromEntries(
    Object.entries(err.flatten().fieldErrors).map(([k, v]) => [k, v ?? []])
  ) as Record<string, string[]>;

  return Response.json(
    {
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details },
      timestamp: timestamp(),
    } satisfies ApiFailure,
    { status: 422 }
  );
}

// ─── Route handler wrapper ────────────────────────────────────────────────

type RouteContext = { params?: Record<string, string> };
type Handler = (req: Request, ctx: RouteContext) => Promise<Response>;

export function withHandler(handler: Handler): Handler {
  return async (req, ctx = {}) => {
    try {
      return await handler(req, ctx);
    } catch (err) {
      if (err instanceof HttpError) {
        return errorResponse(err.statusCode, err.code, err.message, err.details);
      }
      if (err instanceof ZodError) {
        return validationError(err);
      }
      console.error('[API]', req.method, req.url, err);
      return serverError();
    }
  };
}

// ─── Request helpers ──────────────────────────────────────────────────────

export async function parseBody<T>(req: Request): Promise<T> {
  try {
    return (await req.json()) as T;
  } catch {
    throw new HttpError(400, 'Invalid JSON body', 'BAD_REQUEST');
  }
}

export function getSearchParam(req: Request, key: string): string | null {
  return new URL(req.url).searchParams.get(key);
}

export function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new HttpError(500, `Missing env variable: ${key}`, 'INTERNAL_ERROR');
  return value;
}

// ─── CORS headers ─────────────────────────────────────────────────────────

export const corsHeaders = {
  'Access-Control-Allow-Origin':  process.env.ALLOWED_ORIGIN ?? '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
} as const;

export function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([k, v]) => headers.set(k, v));
  return new Response(response.body, { status: response.status, headers });
}
