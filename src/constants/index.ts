/**
 * Application Constants
 *
 * Defines colors, storage keys, and other configuration values
 */

/**
 * Color palette for the application
 */
export const COLORS = {
  // Primary lime green theme
  primary: '#9ACD32',
  primaryDark: '#7CB342',

  // Background colors
  background: '#1A1A1A',
  backgroundLight: '#FFFFFF',

  // Text colors
  text: '#1A1A1A',
  textSecondary: '#666666',
  textLight: '#999999',

  // UI colors
  border: '#E0E0E0',
  shadow: '#000000',
  error: '#FF6B6B',
  success: '#4ECDC4',
  warning: '#FFD93D',
};

/**
 * Event color options for calendar events
 */
export const EVENT_COLORS = [
  { label: 'Lime Green', value: '#9ACD32' },
  { label: 'Green', value: '#7CB342' },
  { label: 'Red', value: '#FF6B6B' },
  { label: 'Cyan', value: '#4ECDC4' },
  { label: 'Yellow', value: '#FFD93D' },
  { label: 'Purple', value: '#A78BFA' },
];

/**
 * Default event color
 */
export const DEFAULT_EVENT_COLOR = '#9ACD32';

/**
 * AsyncStorage keys
 */
export const STORAGE_KEYS = {
  EVENTS: '@calendar_events',
};

/**
 * Calendar configuration
 */
export const CALENDAR_CONFIG = {
  dateFormat: 'yyyy-MM-dd',
  displayDateFormat: 'MMM dd, yyyy',
  displayTimeFormat: 'h:mm a',
};
