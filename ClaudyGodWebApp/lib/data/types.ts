/**
 * Centralized TypeScript types for all API data
 * Ensures consistency and type safety across the application
 */

// Events — field names match the real EventDto/EventDetailDto JSON (verified against
// src/ClaudyGod.Application/Features/Events/DTOs/EventDtos.cs).
export interface Event {
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
  status: 'upcoming' | 'ongoing' | 'completed' | string;
  flyerImagePath?: string;
  createdAt: string;
}

export interface EventDetail extends Event {
  locationCity?: string;
  locationState?: string;
  locationCountry?: string;
}

// Albums & Music — field names match the real AlbumDto JSON (verified against
// src/ClaudyGod.Application/Features/Albums/DTOs/AlbumDtos.cs). The backend has no
// `artist`/`description`/`tracks` fields and streaming links are flat url fields, not
// an array — do not reintroduce those, that was a past bug (adapters.ts::toAlbumView).
export interface Album {
  id: string;
  title: string;
  imageUrl?: string;
  spotifyUrl?: string;
  appleUrl?: string;
  youtubeUrl?: string;
  deezerUrl?: string;
  amazonUrl?: string;
  sortOrder: number;
  releasedAt?: string;
}

// Blog Posts — field names match the real BlogPostDto/BlogPostDetailDto JSON
// (System.Text.Json camelCases the backend's PascalCase record properties).
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImagePath?: string;
  status: string;
  publishedAt?: string;
  authorName?: string;
  categoryName?: string;
  tags: string[];
  viewCount: number;
  isFeatured: boolean;
  createdAt: string;
}

export interface BlogPostDetail extends Omit<BlogPost, 'categoryName'> {
  content: string;
  categoryId?: string;
  categoryName?: string;
}

// Store Products
export interface StoreProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  /** Additional angles (front/back, etc). The real backend has no concept
   *  of this yet — a single `image` field — so this only ever comes from
   *  curated fallback data until the backend grows gallery support. */
  images?: string[];
  category: string;
  inStock: boolean;
  quantity?: number;
  rating?: number;
}

// Store Categories
export interface StoreCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

// Media/Gallery — field names match the real MediaItemDto JSON (verified against
// src/ClaudyGod.Application/Features/Media/DTOs/MediaDtos.cs). Note: the backend filters
// by `type` (image/video/audio), not `category` — there is no category field at all.
export interface MediaItem {
  id: string;
  title: string;
  description?: string;
  type: string;
  fileName: string;
  contentType: string;
  fileSizeBytes: number;
  publicUrl: string;
  thumbnailPath?: string;
  artistName?: string;
  albumName?: string;
  durationSeconds?: number;
  isPublished: boolean;
  viewCount: number;
  downloadCount: number;
  createdAt: string;
}

// Reels — curated YouTube highlights, distinct from general Media uploads. Field names
// match the real ReelDto JSON (verified against
// src/ClaudyGod.Application/Features/Reels/DTOs/ReelDtos.cs). Backend category vocabulary:
// featured, sermon, teaching, music_video, live, christmas.
export interface Reel {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  category: string;
  isPublished: boolean;
  publishedAt?: string;
  sortOrder: number;
}

// Bookings
export interface BookingRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  eventType: string;
  eventDate: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

// Tickets/Reservations
export interface TicketReservation {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  quantity: number;
  confirmationCode: string;
  status: 'confirmed' | 'cancelled';
  eventId?: string;
  createdAt: string;
}

// FAQ
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order?: number;
}

// Volunteer
export interface VolunteerApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

// Generic API Response
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors: string[];
  fieldErrors: Record<string, string[]>;
}

// Field names match the backend's PaginatedResult<T> JSON (System.Text.Json camelCases
// TotalCount/PageNumber/etc.) — do not rename these to `total`/`page`, that was a past bug.
export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
