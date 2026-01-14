/**
 * Event Store (Zustand)
 * 
 * Manages calendar events state and provides methods for CRUD operations
 * Automatically syncs with AsyncStorage for persistence
 */

import { create } from 'zustand';
import { CalendarEvent, EventFormData } from '../types';
import { EventService } from '../services/EventService';

interface EventStore {
  /** All calendar events */
  events: CalendarEvent[];
  
  /** Currently selected date */
  selectedDate: string;
  
  /** Loading state */
  isLoading: boolean;
  
  /** Error state */
  error: string | null;
  
  /**
   * Load all events from storage
   * Called on app initialization
   */
  loadEvents: () => Promise<void>;
  
  /**
   * Get events for a specific date
   * 
   * @param date - Date in YYYY-MM-DD format
   * @returns Array of events for the specified date
   */
  getEventsByDate: (date: string) => CalendarEvent[];
  
  /**
   * Add a new event
   * 
   * @param eventData - Event form data
   * @returns Created event
   */
  addEvent: (eventData: EventFormData) => Promise<CalendarEvent>;
  
  /**
   * Update an existing event
   * 
   * @param id - Event ID
   * @param eventData - Updated event data
   * @returns Updated event or null if not found
   */
  updateEvent: (id: string, eventData: EventFormData) => Promise<CalendarEvent | null>;
  
  /**
   * Delete an event
   * 
   * @param id - Event ID to delete
   */
  deleteEvent: (id: string) => Promise<void>;
  
  /**
   * Set the currently selected date
   * 
   * @param date - Date in YYYY-MM-DD format
   */
  setSelectedDate: (date: string) => void;
  
  /**
   * Clear all events (for testing/reset)
   */
  clearAllEvents: () => Promise<void>;
}

/**
 * Event store instance
 * Provides centralized state management for calendar events
 */
export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  selectedDate: new Date().toISOString().split('T')[0],
  isLoading: false,
  error: null,

  loadEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      const events = await EventService.getAllEvents();
      set({ events, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load events',
        isLoading: false 
      });
    }
  },

  getEventsByDate: (date: string) => {
    return get().events.filter(event => event.date === date);
  },

  addEvent: async (eventData: EventFormData) => {
    set({ isLoading: true, error: null });
    try {
      const newEvent = await EventService.createEvent(eventData);
      set(state => ({ 
        events: [...state.events, newEvent],
        isLoading: false 
      }));
      return newEvent;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add event',
        isLoading: false 
      });
      throw error;
    }
  },

  updateEvent: async (id: string, eventData: EventFormData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedEvent = await EventService.updateEvent(id, eventData);
      if (updatedEvent) {
        set(state => ({
          events: state.events.map(event => 
            event.id === id ? updatedEvent : event
          ),
          isLoading: false
        }));
      }
      return updatedEvent;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update event',
        isLoading: false 
      });
      throw error;
    }
  },

  deleteEvent: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await EventService.deleteEvent(id);
      set(state => ({
        events: state.events.filter(event => event.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete event',
        isLoading: false 
      });
      throw error;
    }
  },

  setSelectedDate: (date: string) => {
    set({ selectedDate: date });
  },

  clearAllEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      await EventService.clearAllEvents();
      set({ events: [], isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to clear events',
        isLoading: false 
      });
    }
  },
}));
