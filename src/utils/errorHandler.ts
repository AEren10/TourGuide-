/**
 * Centralized error handling with PII protection
 */

export class AppError extends Error {
  code?: string;
  statusCode?: number;

  constructor(message: string, code?: string, statusCode?: number) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

/**
 * Handle API errors
 */
export const handleApiError = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    // Log to console (in production, send to Sentry)
    console.error('API Error:', sanitizeErrorForLogging(error));

    // TODO: Send to Sentry
    // Sentry.captureException(error);

    // User-friendly message
    return 'Something went wrong. Please try again.';
  }

  return 'An unexpected error occurred.';
};

/**
 * Handle network errors
 */
export const handleNetworkError = (): string => {
  return 'Unable to connect. Please check your internet connection.';
};

/**
 * Handle location permission errors
 */
export const handleLocationError = (error: unknown): string => {
  if (error instanceof Error) {
    if (error.message.includes('permission')) {
      return 'Location permission is required. Please enable it in Settings.';
    }
    if (error.message.includes('unavailable')) {
      return 'Location services are unavailable. Please enable them.';
    }
  }

  return 'Unable to get your location. Please try again.';
};

/**
 * Sanitize error for logging (remove PII)
 */
const sanitizeErrorForLogging = (error: Error): object => {
  const sanitized: any = {
    name: error.name,
    message: error.message,
    stack: error.stack,
  };

  // Remove any PII from error message
  if (sanitized.message) {
    sanitized.message = sanitized.message
      .replace(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, 'EMAIL_REDACTED') // Email
      .replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, 'PHONE_REDACTED') // Phone
      .replace(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, 'IP_REDACTED'); // IP
  }

  // Remove any PII from stack trace
  if (sanitized.stack) {
    sanitized.stack = sanitized.stack
      .replace(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, 'EMAIL_REDACTED')
      .replace(/\/Users\/[^\/]+/g, '/Users/REDACTED'); // User paths
  }

  return sanitized;
};

/**
 * Global error handler setup
 */
export const setupGlobalErrorHandler = () => {
  // Handle unhandled promise rejections
  const originalHandler = ErrorUtils.getGlobalHandler();

  ErrorUtils.setGlobalHandler((error, isFatal) => {
    console.error('Global Error:', sanitizeErrorForLogging(error));

    // TODO: Send to Sentry
    // Sentry.captureException(error, { level: isFatal ? 'fatal' : 'error' });

    // Call original handler
    originalHandler(error, isFatal);
  });

  // Handle promise rejections
  if (typeof window !== 'undefined') {
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled Promise Rejection:', event.reason);

      // TODO: Send to Sentry
      // Sentry.captureException(event.reason);
    });
  }
};

/**
 * Common error messages
 */
export const ErrorMessages = {
  NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
  LOCATION_PERMISSION_DENIED:
    'Location permission is required to use this feature.',
  LOCATION_UNAVAILABLE: 'Unable to get your location. Please try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  TOUR_NOT_FOUND: 'Tour not found. It may have been removed.',
  STOP_NOT_FOUND: 'Stop not found. It may have been removed.',
  LOADING_FAILED: 'Failed to load data. Please try again.',
};
