/**
 * Event Card Component
 * 
 * Displays a single event with title, time, and color indicator
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { CalendarEvent } from '../types';
import { COLORS } from '../constants';
import { getTimeRangeString } from '../utils/dateUtils';

interface EventCardProps {
  /** Event data to display */
  event: CalendarEvent;
  /** Callback when card is pressed */
  onPress: (event: CalendarEvent) => void;
  /** Optional animation delay for staggered appearance */
  animationDelay?: number;
}

/**
 * Event Card Component
 * 
 * Renders an individual event card with animation and press handling
 * 
 * @param props - Component props
 * @returns Event card component
 */
const EventCard: React.FC<EventCardProps> = ({
  event,
  onPress,
  animationDelay = 0,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(20)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: animationDelay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        delay: animationDelay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, animationDelay]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={() => onPress(event)}
        activeOpacity={0.7}
      >
        {/* Color indicator */}
        <View style={[styles.colorBar, { backgroundColor: event.color }]} />

        {/* Event content */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {event.title}
          </Text>
          <Text style={styles.time}>
            {getTimeRangeString(event.startTime, event.endTime)}
          </Text>
          {event.description && (
            <Text style={styles.description} numberOfLines={2}>
              {event.description}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  colorBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: COLORS.textLight,
    lineHeight: 18,
  },
});

export default EventCard;
