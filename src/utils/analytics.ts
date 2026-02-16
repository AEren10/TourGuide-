import AsyncStorage from '@react-native-async-storage/async-storage';

const ANALYTICS_ENABLED_KEY = '@analytics_enabled';
const ANALYTICS_USER_ID_KEY = '@analytics_user_id';

/**
 * Analytics utilities with privacy-first approach
 * - Opt-out mechanism
 * - No PII tracking
 * - Anonymous user IDs
 */

export const isAnalyticsEnabled = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(ANALYTICS_ENABLED_KEY);
    // Default: enabled (user can opt-out)
    return value !== 'false';
  } catch (error) {
    console.error('Error checking analytics consent:', error);
    return true; // Default to enabled
  }
};

export const setAnalyticsEnabled = async (enabled: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(ANALYTICS_ENABLED_KEY, String(enabled));

    // If analytics is being disabled, clear user data
    if (!enabled) {
      await AsyncStorage.removeItem(ANALYTICS_USER_ID_KEY);
    }
  } catch (error) {
    console.error('Error setting analytics consent:', error);
  }
};

export const getAnonymousUserId = async (): Promise<string> => {
  try {
    let userId = await AsyncStorage.getItem(ANALYTICS_USER_ID_KEY);

    if (!userId) {
      // Generate anonymous UUID
      userId = `anon_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      await AsyncStorage.setItem(ANALYTICS_USER_ID_KEY, userId);
    }

    return userId;
  } catch (error) {
    console.error('Error getting anonymous user ID:', error);
    return 'unknown';
  }
};

/**
 * Track an event (only if analytics is enabled)
 */
export const trackEvent = async (
  eventName: string,
  params?: Record<string, any>
): Promise<void> => {
  try {
    const enabled = await isAnalyticsEnabled();

    if (!enabled) {
      return; // User opted out
    }

    // Remove any PII from params
    const sanitizedParams = sanitizeParams(params);

    // TODO: Replace with your analytics service (Firebase, Segment, etc.)
    if (__DEV__) {
      console.log('📊 Analytics Event:', eventName, sanitizedParams);
    }

    // Example: Firebase Analytics
    // await Analytics.logEvent(eventName, sanitizedParams);

    // Example: Segment
    // await segment.track(eventName, sanitizedParams);
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

/**
 * Track screen view
 */
export const trackScreen = async (screenName: string): Promise<void> => {
  await trackEvent('screen_view', { screen_name: screenName });
};

/**
 * Remove PII from event params
 */
const sanitizeParams = (params?: Record<string, any>): Record<string, any> => {
  if (!params) return {};

  const sanitized = { ...params };

  // Remove common PII fields
  const piiFields = [
    'email',
    'phone',
    'phoneNumber',
    'address',
    'name',
    'firstName',
    'lastName',
    'userId',
    'ip',
    'ipAddress',
  ];

  piiFields.forEach((field) => {
    if (sanitized[field]) {
      delete sanitized[field];
    }
  });

  // Redact location coordinates (keep only city-level)
  if (sanitized.latitude) {
    sanitized.latitude = 'REDACTED';
  }
  if (sanitized.longitude) {
    sanitized.longitude = 'REDACTED';
  }

  return sanitized;
};

/**
 * Common events for the app
 */
export const AnalyticsEvents = {
  // App lifecycle
  APP_OPENED: 'app_opened',
  APP_BACKGROUNDED: 'app_backgrounded',

  // Tour events
  TOUR_VIEWED: 'tour_viewed',
  TOUR_STARTED: 'tour_started',
  TOUR_COMPLETED: 'tour_completed',
  TOUR_FAVORITED: 'tour_favorited',

  // Stop events
  STOP_VIEWED: 'stop_viewed',
  STOP_CHECKED_IN: 'stop_checked_in',

  // Navigation
  NAVIGATION_STARTED: 'navigation_started',
  NAVIGATION_ENDED: 'navigation_ended',

  // Search
  SEARCH_PERFORMED: 'search_performed',

  // Settings
  ANALYTICS_OPT_OUT: 'analytics_opt_out',
  ANALYTICS_OPT_IN: 'analytics_opt_in',
};
