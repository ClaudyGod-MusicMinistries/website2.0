// ─── Response envelope ────────────────────────────────────────────────────

export type ApiSuccess<T = unknown> = {
  success: true;
  data: T;
  message?: string;
  timestamp: string;
};

export type ApiFailure = {
  success: false;
  error: {
    code: ErrorCode;
    message: string;
    details?: Record<string, string[]>;
  };
  timestamp: string;
};

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiFailure;

// ─── Error codes ──────────────────────────────────────────────────────────

export type ErrorCode =
  | 'BAD_REQUEST'
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'METHOD_NOT_ALLOWED'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR'
  | 'SERVICE_UNAVAILABLE';

// ─── Domain response shapes ───────────────────────────────────────────────

export type ContactResponse = {
  id: string;
  submittedAt: string;
};

export type BookingResponse = {
  id: string;
  status: 'pending' | 'confirmed' | 'rejected';
  submittedAt: string;
};

export type NewsletterResponse = {
  email: string;
  subscribedAt: string;
};

export type VolunteerResponse = {
  id: string;
  submittedAt: string;
};

export type OrderResponse = {
  orderId: string;
  status: 'pending' | 'processing' | 'paid' | 'failed';
  total: number;
  currency: string;
  createdAt: string;
};

export type ProductListResponse = {
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
    rating?: number;
  }>;
  total: number;
};

export type HealthResponse = {
  status: 'ok' | 'degraded';
  version: string;
  uptime: number;
  timestamp: string;
};
