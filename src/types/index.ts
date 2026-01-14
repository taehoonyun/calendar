/**
 * Calendar App Type Definitions
 * 
 * Core types for the calendar application including events, dates, and UI state
 */

/**
 * Represents a calendar event
 */
export interface CalendarEvent {
  /** Unique identifier for the event */
  id: string;
  /** Event title */
  title: string;
  /** Event description (optional) */
  description?: string;
  /** Event date in YYYY-MM-DD format */
  date: string;
  /** Start time in HH:mm format */
  startTime: string;
  /** End time in HH:mm format */
  endTime: string;
  /** Color associated with the event */
  color: string;
  /** Timestamp when event was created */
  createdAt: number;
  /** Timestamp when event was last updated */
  updatedAt: number;
}

/**
 * Form data for creating or editing an event
 */
export interface EventFormData {
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  color: string;
}

/**
 * Marked dates object for react-native-calendars
 */
export interface MarkedDates {
  [date: string]: {
    marked?: boolean;
    dotColor?: string;
    selected?: boolean;
    selectedColor?: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
}

/**
 * Navigation parameters for each screen
 */
export type RootStackParamList = {
  Calendar: undefined;
  EventForm: {
    date?: string;
    event?: CalendarEvent;
  };
  EventList: {
    date: string;
  };
};

/**
 * Event color options
 */
export type EventColor = 
  | '#9ACD32'  // Primary green
  | '#7CB342'  // Secondary green
  | '#FF6B6B'  // Red
  | '#4ECDC4'  // Cyan
  | '#FFD93D'  // Yellow
  | '#A78BFA'; // Purple
