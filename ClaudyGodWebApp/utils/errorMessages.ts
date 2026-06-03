export const ERROR_MESSAGES = {
  // Network errors
  'Failed to fetch': 'We\'re having trouble connecting. Please check your internet and try again.',
  'NetworkError': 'Connection lost. Please check your internet and try again.',
  'TimeoutError': 'The request took too long. Please try again.',

  // Backend connectivity
  'Backend unreachable': 'Our servers are temporarily unavailable. Please try again in a moment.',
  'ECONNREFUSED': 'We\'re unable to reach our servers. Please try again shortly.',
  'ENOTFOUND': 'We\'re having server issues. Please try again in a moment.',

  // HTTP status codes
  'HTTP 502': 'We\'re experiencing technical difficulties. Our team has been notified. Please try again shortly.',
  'HTTP 503': 'Our service is temporarily unavailable. Please try again shortly.',
  'HTTP 500': 'An unexpected error occurred. Our team has been notified.',
  'HTTP 429': 'You\'ve made too many requests. Please wait a moment and try again.',
  'HTTP 401': 'Your session has expired. Please log in again.',
  'HTTP 403': 'You don\'t have permission to do that.',

  // API validation errors
  'validation_error': 'Please check your information and try again.',
  'invalid_input': 'Some of your information isn\'t correct. Please review and try again.',
  'required_field': 'Please fill in all required fields.',

  // Specific endpoints
  'bookings': 'We couldn\'t save your booking. Please review your information and try again.',
  'contacts': 'We couldn\'t send your message. Please try again.',
  'payments': 'We couldn\'t process your payment. Please try again or contact support.',
  'store': 'We couldn\'t process your order. Please try again.',
  'auth': 'Authentication failed. Please try again.',

  // Default
  'default': 'Something went wrong. Please try again or contact support if the problem persists.',
};

export function getUserFriendlyError(error: any): string {
  if (!error) return ERROR_MESSAGES.default;

  const message = error.message || String(error);

  // Check for specific error messages
  for (const [key, value] of Object.entries(ERROR_MESSAGES)) {
    if (message.includes(key)) {
      return value as string;
    }
  }

  // Check for HTTP status codes
  if (message.match(/\d{3}/)) {
    const statusMatch = message.match(/\d{3}/);
    const httpCode = `HTTP ${statusMatch?.[0]}`;
    if (httpCode in ERROR_MESSAGES) {
      return ERROR_MESSAGES[httpCode as keyof typeof ERROR_MESSAGES];
    }
  }

  // If it's a short technical message, use default
  if (message.length < 50) {
    return ERROR_MESSAGES.default;
  }

  // If it's a longer message, it might be user-friendly already
  return message;
}

export function formatFieldError(fieldName: string, error: string): string {
  const field = fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1');
  if (error.toLowerCase().includes('required')) {
    return `${field} is required`;
  }
  if (error.toLowerCase().includes('invalid') || error.toLowerCase().includes('format')) {
    return `${field} format is invalid`;
  }
  return error;
}
