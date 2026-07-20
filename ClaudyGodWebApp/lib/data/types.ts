/**
 * Centralized TypeScript types for all API data
 * Ensures consistency and type safety across the application
 */

// Events
export interface EventHighlightImage {
  url: string;
  caption: string;
}

export interface EventHighlightVideo {
  videoId: string;
  caption: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  date: string;
  time?: string;
  venue?: string;
  image: string;
  ticketUrl?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  attendees?: number;
  availableSeats?: number;
  highlights?: {
    images: EventHighlightImage[];
    videos: EventHighlightVideo[];
  };
}

// Albums & Music
export interface Album {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  coverImage: string;
  description: string;
  tracks?: Track[];
  streamingLinks?: StreamingLink[];
}

export interface Track {
  id: string;
  title: string;
  duration: string;
  featuring?: string;
}

export interface StreamingLink {
  platform: string;
  url: string;
  icon?: string;
}

// Blog Posts
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: string;
  category: string;
  publishedAt: string;
  viewCount?: number;
  isFeatured?: boolean;
  tags?: string[];
}

// Store Products
export interface StoreProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
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

// Media/Gallery
export interface MediaItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  category?: string;
  uploadedAt: string;
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

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
