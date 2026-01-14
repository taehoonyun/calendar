/**
 * Event Service
 * 
 * Handles business logic for calendar events and manages AsyncStorage persistence
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { CalendarEvent, EventFormData } from '../types';
import { STORAGE_KEYS, DEFAULT_EVENT_COLOR } from '../constants';

export class EventService {
  /**
   * Get all events from storage
   * 
   * @returns Promise resolving to array of all events
   */
  static async getAllEvents(): Promise<CalendarEvent[]> {
    try {
      const eventsJson = await AsyncStorage.getItem(STORAGE_KEYS.EVENTS);
      if (!eventsJson) {
        return [];
      }
      const events: CalendarEvent[] = JSON.parse(eventsJson);
      // Sort events by date and start time
      return events.sort((a, b) => {
        if (a.date === b.date) {
          return a.startTime.localeCompare(b.startTime);
        }
        return a.date.localeCompare(b.date);
      });
    } catch (error) {
      console.error('Error loading events:', error);
      throw new Error('Failed to load events');
    }
  }

  /**
   * Get events for a specific date
   * 
   * @param date - Date in YYYY-MM-DD format
   * @returns Promise resolving to array of events for the date
   */
  static async getEventsByDate(date: string): Promise<CalendarEvent[]> {
    const allEvents = await this.getAllEvents();
    return allEvents.filter(event => event.date === date);
  }

  /**
   * Create a new event
   * 
   * @param eventData - Event form data
   * @returns Promise resolving to created event
   * @throws Error if validation fails or storage fails
   */
  static async createEvent(eventData: EventFormData): Promise<CalendarEvent> {
    // Validate event data
    this.validateEventData(eventData);

    const newEvent: CalendarEvent = {
      id: uuid.v4() as string,
      title: eventData.title.trim(),
      description: eventData.description?.trim(),
      date: eventData.date,
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      color: eventData.color || DEFAULT_EVENT_COLOR,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    try {
      const allEvents = await this.getAllEvents();
      allEvents.push(newEvent);
      await AsyncStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(allEvents));
      return newEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      throw new Error('Failed to create event');
    }
  }

  /**
   * Update an existing event
   * 
   * @param id - Event ID
   * @param eventData - Updated event data
   * @returns Promise resolving to updated event or null if not found
   * @throws Error if validation fails or storage fails
   */
  static async updateEvent(
    id: string,
    eventData: EventFormData
  ): Promise<CalendarEvent | null> {
    // Validate event data
    this.validateEventData(eventData);

    try {
      const allEvents = await this.getAllEvents();
      const eventIndex = allEvents.findIndex(event => event.id === id);

      if (eventIndex === -1) {
        return null;
      }

      const updatedEvent: CalendarEvent = {
        ...allEvents[eventIndex],
        title: eventData.title.trim(),
        description: eventData.description?.trim(),
        date: eventData.date,
        startTime: eventData.startTime,
        endTime: eventData.endTime,
        color: eventData.color || DEFAULT_EVENT_COLOR,
        updatedAt: Date.now(),
      };

      allEvents[eventIndex] = updatedEvent;
      await AsyncStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(allEvents));
      return updatedEvent;
    } catch (error) {
      console.error('Error updating event:', error);
      throw new Error('Failed to update event');
    }
  }

  /**
   * Delete an event
   * 
   * @param id - Event ID to delete
   * @throws Error if storage operation fails
   */
  static async deleteEvent(id: string): Promise<void> {
    try {
      const allEvents = await this.getAllEvents();
      const filteredEvents = allEvents.filter(event => event.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(filteredEvents));
    } catch (error) {
      console.error('Error deleting event:', error);
      throw new Error('Failed to delete event');
    }
  }

  /**
   * Clear all events (for testing/reset)
   * 
   * @throws Error if storage operation fails
   */
  static async clearAllEvents(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.EVENTS);
    } catch (error) {
      console.error('Error clearing events:', error);
      throw new Error('Failed to clear events');
    }
  }

  /**
   * Validate event form data
   * 
   * @param eventData - Event data to validate
   * @throws Error if validation fails
   * @private
   */
  private static validateEventData(eventData: EventFormData): void {
    if (!eventData.title || eventData.title.trim().length === 0) {
      throw new Error('Event title is required');
    }

    if (!eventData.date) {
      throw new Error('Event date is required');
    }

    if (!eventData.startTime) {
      throw new Error('Start time is required');
    }

    if (!eventData.endTime) {
      throw new Error('End time is required');
    }

    // Validate time format (HH:mm)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(eventData.startTime)) {
      throw new Error('Invalid start time format');
    }

    if (!timeRegex.test(eventData.endTime)) {
      throw new Error('Invalid end time format');
    }

    // Validate end time is after start time
    if (eventData.endTime <= eventData.startTime) {
      throw new Error('End time must be after start time');
    }
  }
}
