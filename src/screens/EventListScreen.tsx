/**
 * Event List Screen
 * 
 * Displays all events for a selected date in a scrollable list
 */

import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, CalendarEvent } from '../types';
import { useEventStore } from '../store/eventStore';
import { COLORS } from '../constants';
import { formatDateForDisplay } from '../utils/dateUtils';
import EventCard from '../components/EventCard';

type EventListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EventList'>;
type EventListScreenRouteProp = RouteProp<RootStackParamList, 'EventList'>;

interface EventListScreenProps {
  navigation: EventListScreenNavigationProp;
  route: EventListScreenRouteProp;
}

/**
 * Event List Screen Component
 * 
 * Shows all events for a specific date in a list format
 * 
 * @param props - Component props including navigation and route
 * @returns Event list screen component
 */
const EventListScreen: React.FC<EventListScreenProps> = ({ navigation, route }) => {
  const { date } = route.params;
  const { getEventsByDate } = useEventStore();

  // Get events for the selected date
  const events = getEventsByDate(date);

  /**
   * Navigate to event form for editing
   * 
   * @param event - Event to edit
   */
  const handleEventPress = (event: CalendarEvent) => {
    navigation.navigate('EventForm', { event, date: event.date });
  };

  /**
   * Render individual event item
   * 
   * @param item - Event data
   * @param index - Item index for animation delay
   */
  const renderEventItem = ({ item, index }: { item: CalendarEvent; index: number }) => (
    <EventCard
      event={item}
      onPress={handleEventPress}
      animationDelay={index * 50}
    />
  );

  /**
   * Render header with date and count
   */
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.dateText}>{formatDateForDisplay(date)}</Text>
      <Text style={styles.countText}>{events.length}개의 일정</Text>
    </View>
  );

  /**
   * Render empty state
   */
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>이 날짜에 일정이 없습니다</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingBottom: 16,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  dateText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  countText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default EventListScreen;
