/**
 * Application Constants
 * 
 * Centralized constants for theme colors, storage keys, and configuration
 */

/**
 * Theme colors for the application
 */
export const COLORS = {
  // Primary colors
  primary: '#9ACD32',
  primaryDark: '#7CB342',
  primaryLight: '#C5E1A5',
  
  // Background colors
  background: '#F5F9F0',
  backgroundLight: '#FFFFFF',
  backgroundDark: '#E8F5E0',
  
  // Text colors
  text: '#2C3E27',
  textSecondary: '#5F7C55',
  textLight: '#8FA988',
  
  // Event colors
  eventGreen: '#9ACD32',
  eventGreenDark: '#7CB342',
  eventRed: '#FF6B6B',
  eventCyan: '#4ECDC4',
  eventYellow: '#FFD93D',
  eventPurple: '#A78BFA',
  
  // UI colors
  border: '#D4E7C5',
  shadow: '#00000015',
  success: '#7CB342',
  error: '#FF6B6B',
  warning: '#FFD93D',
} as const;

/**
 * Event color palette for user selection
 */
export const EVENT_COLORS = [
  { label: 'Green', value: COLORS.eventGreen },
  { label: 'Dark Green', value: COLORS.eventGreenDark },
  { label: 'Red', value: COLORS.eventRed },
  { label: 'Cyan', value: COLORS.eventCyan },
  { label: 'Yellow', value: COLORS.eventYellow },
  { label: 'Purple', value: COLORS.eventPurple },
] as const;

/**
 * Storage keys for AsyncStorage
 */
export const STORAGE_KEYS = {
  EVENTS: '@calendar_events',
  SETTINGS: '@calendar_settings',
} as const;

/**
 * Calendar configuration
 */
export const CALENDAR_CONFIG = {
  // First day of week (0 = Sunday, 1 = Monday)
  firstDayOfWeek: 1,
  // Date format
  dateFormat: 'yyyy-MM-dd',
  // Time format
  timeFormat: 'HH:mm',
  // Display format
  displayDateFormat: 'MMM d, yyyy',
  displayTimeFormat: 'h:mm a',
} as const;

/**
 * Animation durations in milliseconds
 */
export const ANIMATION = {
  fast: 200,
  medium: 300,
  slow: 500,
} as const;

/**
 * Default event color
 */
export const DEFAULT_EVENT_COLOR = COLORS.eventGreen;
