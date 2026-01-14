/**
 * Calendar Screen
 * 
 * Main screen displaying monthly calendar view with events
 */

import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useEventStore } from '../store/eventStore';
import { COLORS } from '../constants';
import { createMarkedDatesFromEvents, getCurrentDateString } from '../utils/dateUtils';
import EventCard from '../components/EventCard';
import { FAB } from 'react-native-paper';

type CalendarScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Calendar'>;

interface CalendarScreenProps {
  navigation: CalendarScreenNavigationProp;
}

/**
 * Calendar Screen Component
 * 
 * Displays monthly calendar with event indicators and daily event list
 * 
 * @param props - Component props including navigation
 * @returns Calendar screen component
 */
const CalendarScreen: React.FC<CalendarScreenProps> = ({ navigation }) => {
  const {
    events,
    selectedDate,
    isLoading,
    loadEvents,
    setSelectedDate,
    getEventsByDate,
  } = useEventStore();

  // Load events on mount
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  // Get events for selected date
  const selectedDateEvents = getEventsByDate(selectedDate);

  // Create marked dates object for calendar
  const markedDates = createMarkedDatesFromEvents(events, selectedDate);

  /**
   * Handle date selection on calendar
   * 
   * @param date - Selected date object from calendar
   */
  const handleDayPress = (date: { dateString: string }) => {
    setSelectedDate(date.dateString);
  };

  /**
   * Navigate to event form for adding new event
   */
  const handleAddEvent = () => {
    navigation.navigate('EventForm', { date: selectedDate });
  };

  /**
   * Navigate to event form for editing existing event
   * 
   * @param event - Event to edit
   */
  const handleEventPress = (event: any) => {
    navigation.navigate('EventForm', { event, date: event.date });
  };

  /**
   * Navigate to event list view
   */
  const handleViewAllEvents = () => {
    navigation.navigate('EventList', { date: selectedDate });
  };

  if (isLoading && events.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Calendar */}
      <Calendar
        current={selectedDate}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={{
          backgroundColor: COLORS.background,
          calendarBackground: COLORS.backgroundLight,
          textSectionTitleColor: COLORS.textSecondary,
          selectedDayBackgroundColor: COLORS.primary,
          selectedDayTextColor: COLORS.backgroundLight,
          todayTextColor: COLORS.primary,
          dayTextColor: COLORS.text,
          textDisabledColor: COLORS.textLight,
          dotColor: COLORS.primary,
          selectedDotColor: COLORS.backgroundLight,
          arrowColor: COLORS.primary,
          monthTextColor: COLORS.text,
          textDayFontWeight: '500',
          textMonthFontWeight: '700',
          textDayHeaderFontWeight: '600',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
        style={styles.calendar}
      />

      {/* Events for selected date */}
      <View style={styles.eventsSection}>
        <View style={styles.eventsSectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedDateEvents.length > 0
              ? `${selectedDateEvents.length}개의 일정`
              : '일정 없음'}
          </Text>
          {selectedDateEvents.length > 3 && (
            <TouchableOpacity onPress={handleViewAllEvents}>
              <Text style={styles.viewAllButton}>전체 보기</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          style={styles.eventsList}
          showsVerticalScrollIndicator={false}
        >
          {selectedDateEvents.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                선택한 날짜에 일정이 없습니다
              </Text>
              <TouchableOpacity
                style={styles.addFirstButton}
                onPress={handleAddEvent}
              >
                <Text style={styles.addFirstButtonText}>첫 일정 추가하기</Text>
              </TouchableOpacity>
            </View>
          ) : (
            selectedDateEvents.slice(0, 3).map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                onPress={handleEventPress}
                animationDelay={index * 50}
              />
            ))
          )}
        </ScrollView>
      </View>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={styles.fab}
        color={COLORS.backgroundLight}
        onPress={handleAddEvent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventsSection: {
    flex: 1,
    paddingTop: 16,
  },
  eventsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  viewAllButton: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  eventsList: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  addFirstButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addFirstButtonText: {
    color: COLORS.backgroundLight,
    fontSize: 15,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: COLORS.primary,
  },
});

export default CalendarScreen;
