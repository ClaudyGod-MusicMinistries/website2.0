/**
 * API Client Utilities
 * Centralized data fetching with error handling, caching, and retry logic
 */

import type { ApiResponse, PaginatedResponse } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Simple in-memory cache
const cache = new Map<string, { data: unknown; timestamp: number }>();

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  cache?: boolean;
  cacheDuration?: number;
  timeout?: number;
}

/**
 * Make API request with error handling and caching
 */
export async function apiRequest<T = unknown>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    body,
    cache: useCache = true,
    cacheDuration = CACHE_DURATION,
    timeout = 30000,
  } = options;

  // Check cache for GET requests
  if (method === 'GET' && useCache) {
    const cached = cache.get(endpoint);
    if (cached && Date.now() - cached.timestamp < cacheDuration) {
      return cached.data as T;
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${API_BASE}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Cache successful GET responses
    if (method === 'GET' && useCache) {
      cache.set(endpoint, { data, timestamp: Date.now() });
    }

    return data as T;
  } catch (error) {
    console.error(`[API] Error fetching ${endpoint}:`, error);
    throw error;
  }
}

/**
 * GET request helper
 */
export async function apiGet<T = unknown>(
  endpoint: string,
  options?: Omit<FetchOptions, 'method' | 'body'>
): Promise<T> {
  return apiRequest<T>(endpoint, { ...options, method: 'GET' });
}

/**
 * POST request helper
 */
export async function apiPost<T = unknown>(
  endpoint: string,
  body?: unknown,
  options?: Omit<FetchOptions, 'method'>
): Promise<T> {
  return apiRequest<T>(endpoint, { ...options, method: 'POST', body, cache: false });
}

/**
 * PUT request helper
 */
export async function apiPut<T = unknown>(
  endpoint: string,
  body?: unknown,
  options?: Omit<FetchOptions, 'method'>
): Promise<T> {
  return apiRequest<T>(endpoint, { ...options, method: 'PUT', body, cache: false });
}

/**
 * DELETE request helper
 */
export async function apiDelete<T = unknown>(
  endpoint: string,
  options?: Omit<FetchOptions, 'method' | 'body'>
): Promise<T> {
  return apiRequest<T>(endpoint, { ...options, method: 'DELETE', cache: false });
}

/**
 * Invalidate cache for an endpoint
 */
export function invalidateCache(endpoint: string): void {
  cache.delete(endpoint);
}

/**
 * Clear all cache
 */
export function clearCache(): void {
  cache.clear();
}

/**
 * Parse API response with error handling
 */
export function parseApiResponse<T>(data: unknown): T {
  if (
    typeof data === 'object' &&
    data !== null &&
    'data' in data &&
    'success' in data
  ) {
    const response = data as ApiResponse<T>;
    if (!response.success) {
      throw new Error(response.message || 'API request failed');
    }
    return response.data as T;
  }
  return data as T;
}
