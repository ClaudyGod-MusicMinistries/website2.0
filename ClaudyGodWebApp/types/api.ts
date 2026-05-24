// ─── Core response envelope (matches backend ApiResponse<T>) ──────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  errors: string[];
  fieldErrors: Record<string, string[]>;
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ApiError extends Error {
  statusCode: number;
  errors: string[];
}

// ─── Auth ──────────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  role: string;
}

// ─── Contact ───────────────────────────────────────────────────────────────

export interface SubmitContactRequest {
  name: string;
  email: string;
  message: string;
}

// ─── Booking ───────────────────────────────────────────────────────────────

export type CountryCode =
  | 'US' | 'CA' | 'UK' | 'NG' | 'AU'
  | 'DE' | 'FR' | 'IN' | 'ZA' | 'GH';

export interface CreateBookingRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: CountryCode;
  organization: string;
  orgType: string;
  eventType: string;
  eventDetails: string;
  eventDate: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode?: string;
  country: string;
  agreeTerms: boolean;
}

export interface BookingDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  eventType: string;
  eventDetails: string;
  eventDate: string;
  status: string;
  adminNotes?: string;
  createdAt: string;
}

// ─── Subscribers ───────────────────────────────────────────────────────────

export interface SubscribeRequest {
  name: string;
  email: string;
}

// ─── Volunteers ────────────────────────────────────────────────────────────

export type VolunteerRole =
  | 'BackupSinger'
  | 'Protocol'
  | 'Media'
  | 'Security'
  | 'Vocalist'
  | 'Others';

export interface RegisterVolunteerRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: VolunteerRole;
  reason: string;
}

export interface VolunteerDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  reason: string;
  isApproved: boolean;
  approvedAt?: string;
  createdAt: string;
}

// ─── Events ────────────────────────────────────────────────────────────────

export interface EventDto {
  id: string;
  title: string;
  description?: string;
  venue?: string;
  startDate: string;
  endDate?: string;
  totalCapacity: number;
  reservedCount: number;
  availableSeats: number;
  isFree: boolean;
  ticketPrice?: number;
  status: string;
  flyerImagePath?: string;
  createdAt: string;
}

export interface EventDetailDto extends EventDto {
  locationCity?: string;
  locationState?: string;
  locationCountry?: string;
}

// ─── Tickets ───────────────────────────────────────────────────────────────

export interface ReserveTicketRequest {
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  quantity: number;
}

export interface TicketDto {
  id: string;
  eventId: string;
  eventTitle: string;
  attendeeFirstName: string;
  attendeeLastName: string;
  attendeeEmail: string;
  quantity: number;
  confirmationCode: string;
  status: string;
  checkedInAt?: string;
  createdAt: string;
}

// ─── Blog ──────────────────────────────────────────────────────────────────

export interface BlogPostDto {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImageUrl?: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
}

// ─── Pagination query params ───────────────────────────────────────────────

export interface PaginationParams {
  pageNumber?: number;
  pageSize?: number;
}

export interface EventsQueryParams extends PaginationParams {
  status?: string;
}

export interface BlogQueryParams extends PaginationParams {
  tag?: string;
}

// ─── Legacy aliases (for gradual migration) ───────────────────────────────

/** @deprecated Use ApiResponse<T> instead */
export type ApiSuccess<T = unknown> = ApiResponse<T>;
/** @deprecated Use ApiError instead */
export type ApiFailure = ApiError;

export type ContactResponse = { id: string };
export type BookingResponse = { id: string };
export type NewsletterResponse = { id: string };
export type VolunteerResponse = { id: string };
export type OrderResponse = { orderId: string; estimatedDelivery: string };
export type HealthResponse = { status: string };
