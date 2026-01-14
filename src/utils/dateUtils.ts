/**
 * Date Utility Functions
 * 
 * Helper functions for date formatting and manipulation using date-fns
 */

import { format, parse, isValid } from 'date-fns';
import { CALENDAR_CONFIG } from '../constants';
import { MarkedDates, CalendarEvent } from '../types';

/**
 * Format date to YYYY-MM-DD string
 * 
 * @param date - Date object or date string
 * @returns Formatted date string
 */
export const formatDateToString = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, CALENDAR_CONFIG.dateFormat);
};

/**
 * Format date for display
 * 
 * @param date - Date string in YYYY-MM-DD format
 * @returns Formatted date string (e.g., "Jan 15, 2024")
 */
export const formatDateForDisplay = (date: string): string => {
  const dateObj = parse(date, CALENDAR_CONFIG.dateFormat, new Date());
  return format(dateObj, CALENDAR_CONFIG.displayDateFormat);
};

/**
 * Format time for display
 * 
 * @param time - Time string in HH:mm format
 * @returns Formatted time string (e.g., "2:30 PM")
 */
export const formatTimeForDisplay = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  return format(date, CALENDAR_CONFIG.displayTimeFormat);
};

/**
 * Get current date string
 * 
 * @returns Current date in YYYY-MM-DD format
 */
export const getCurrentDateString = (): string => {
  return formatDateToString(new Date());
};

/**
 * Validate date string format
 * 
 * @param dateString - Date string to validate
 * @returns True if valid YYYY-MM-DD format
 */
export const isValidDateString = (dateString: string): boolean => {
  const dateObj = parse(dateString, CALENDAR_CONFIG.dateFormat, new Date());
  return isValid(dateObj);
};

/**
 * Validate time string format
 * 
 * @param timeString - Time string to validate
 * @returns True if valid HH:mm format
 */
export const isValidTimeString = (timeString: string): boolean => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(timeString);
};

/**
 * Create marked dates object for calendar from events
 * 
 * @param events - Array of calendar events
 * @param selectedDate - Currently selected date
 * @returns MarkedDates object for react-native-calendars
 * 
 * @example
 * ```typescript
 * const markedDates = createMarkedDatesFromEvents(events, '2024-01-15');
 * // Returns object with marked dates and selected date highlighted
 * ```
 */
export const createMarkedDatesFromEvents = (
  events: CalendarEvent[],
  selectedDate?: string
): MarkedDates => {
  const marked: MarkedDates = {};

  // Mark dates that have events
  events.forEach(event => {
    if (!marked[event.date]) {
      marked[event.date] = {
        marked: true,
        dotColor: event.color,
      };
    }
  });

  // Highlight selected date
  if (selectedDate) {
    marked[selectedDate] = {
      ...marked[selectedDate],
      selected: true,
      selectedColor: '#9ACD32',
    };
  }

  return marked;
};

/**
 * Get time range string for display
 * 
 * @param startTime - Start time in HH:mm format
 * @param endTime - End time in HH:mm format
 * @returns Formatted time range (e.g., "2:30 PM - 4:00 PM")
 */
export const getTimeRangeString = (startTime: string, endTime: string): string => {
  return `${formatTimeForDisplay(startTime)} - ${formatTimeForDisplay(endTime)}`;
};

/**
 * Get current time in HH:mm format
 * 
 * @returns Current time string
 */
export const getCurrentTimeString = (): string => {
  const now = new Date();
  return format(now, 'HH:mm');
};

/**
 * Round time to nearest 15 minutes
 * 
 * @param time - Time string in HH:mm format
 * @returns Rounded time string
 */
export const roundTimeToQuarter = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const roundedMinutes = Math.round(minutes / 15) * 15;
  const date = new Date();
  
  if (roundedMinutes === 60) {
    date.setHours(hours + 1, 0);
  } else {
    date.setHours(hours, roundedMinutes);
  }
  
  return format(date, 'HH:mm');
};
