/**
 * Event Form Screen
 * 
 * Screen for creating new events or editing existing ones
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
  Platform,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RootStackParamList, EventFormData, EventColor } from '../types';
import { useEventStore } from '../store/eventStore';
import { COLORS, EVENT_COLORS, DEFAULT_EVENT_COLOR } from '../constants';
import {
  formatDateForDisplay,
  formatDateToString,
  getCurrentDateString,
  getCurrentTimeString,
  roundTimeToQuarter,
} from '../utils/dateUtils';

type EventFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EventForm'>;
type EventFormScreenRouteProp = RouteProp<RootStackParamList, 'EventForm'>;

interface EventFormScreenProps {
  navigation: EventFormScreenNavigationProp;
  route: EventFormScreenRouteProp;
}

/**
 * Event Form Screen Component
 * 
 * Provides form for creating or editing calendar events
 * Includes validation and color selection
 * 
 * @param props - Component props including navigation and route
 * @returns Event form screen component
 */
const EventFormScreen: React.FC<EventFormScreenProps> = ({ navigation, route }) => {
  const { event, date } = route.params || {};
  const { addEvent, updateEvent, deleteEvent } = useEventStore();

  // Form state
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [selectedDate, setSelectedDate] = useState(
    event?.date || date || getCurrentDateString()
  );
  const [startTime, setStartTime] = useState(
    event?.startTime || roundTimeToQuarter(getCurrentTimeString())
  );
  const [endTime, setEndTime] = useState(() => {
    if (event?.endTime) return event.endTime;
    const [hours, minutes] = (event?.startTime || getCurrentTimeString()).split(':');
    const endHour = (parseInt(hours) + 1).toString().padStart(2, '0');
    return `${endHour}:${minutes}`;
  });
  const [selectedColor, setSelectedColor] = useState<EventColor>(
    (event?.color as EventColor) || DEFAULT_EVENT_COLOR
  );

  // Date/time picker state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  // Loading state
  const [isSaving, setIsSaving] = useState(false);

  /**
   * Handle date change from date picker
   */
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setSelectedDate(formatDateToString(selectedDate));
    }
  };

  /**
   * Handle start time change from time picker
   */
  const handleStartTimeChange = (event: any, selectedTime?: Date) => {
    setShowStartTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      setStartTime(`${hours}:${minutes}`);
    }
  };

  /**
   * Handle end time change from time picker
   */
  const handleEndTimeChange = (event: any, selectedTime?: Date) => {
    setShowEndTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      setEndTime(`${hours}:${minutes}`);
    }
  };

  /**
   * Validate form data
   * 
   * @returns True if valid, false otherwise
   */
  const validateForm = (): boolean => {
    if (!title.trim()) {
      Alert.alert('오류', '제목을 입력해주세요.');
      return false;
    }

    if (endTime <= startTime) {
      Alert.alert('오류', '종료 시간은 시작 시간보다 늦어야 합니다.');
      return false;
    }

    return true;
  };

  /**
   * Handle form submission (create or update event)
   */
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSaving(true);

    const formData: EventFormData = {
      title: title.trim(),
      description: description.trim(),
      date: selectedDate,
      startTime,
      endTime,
      color: selectedColor,
    };

    try {
      if (event) {
        // Update existing event
        await updateEvent(event.id, formData);
        Alert.alert('성공', '일정이 수정되었습니다.');
      } else {
        // Create new event
        await addEvent(formData);
        Alert.alert('성공', '일정이 추가되었습니다.');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('오류', error instanceof Error ? error.message : '일정 저장 실패');
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Handle event deletion
   */
  const handleDelete = () => {
    if (!event) return;

    Alert.alert(
      '일정 삭제',
      '정말 이 일정을 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteEvent(event.id);
              Alert.alert('성공', '일정이 삭제되었습니다.');
              navigation.goBack();
            } catch (error) {
              Alert.alert('오류', '일정 삭제 실패');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        {/* Title Input */}
        <TextInput
          label="제목 *"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
          outlineColor={COLORS.border}
          activeOutlineColor={COLORS.primary}
          maxLength={100}
        />

        {/* Description Input */}
        <TextInput
          label="설명"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={styles.input}
          outlineColor={COLORS.border}
          activeOutlineColor={COLORS.primary}
          maxLength={500}
        />

        {/* Date Picker */}
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.pickerLabel}>날짜</Text>
          <Text style={styles.pickerValue}>
            {formatDateForDisplay(selectedDate)}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={new Date(selectedDate)}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Start Time Picker */}
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setShowStartTimePicker(true)}
        >
          <Text style={styles.pickerLabel}>시작 시간</Text>
          <Text style={styles.pickerValue}>{startTime}</Text>
        </TouchableOpacity>

        {showStartTimePicker && (
          <DateTimePicker
            value={new Date(`2000-01-01T${startTime}:00`)}
            mode="time"
            display="default"
            onChange={handleStartTimeChange}
          />
        )}

        {/* End Time Picker */}
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setShowEndTimePicker(true)}
        >
          <Text style={styles.pickerLabel}>종료 시간</Text>
          <Text style={styles.pickerValue}>{endTime}</Text>
        </TouchableOpacity>

        {showEndTimePicker && (
          <DateTimePicker
            value={new Date(`2000-01-01T${endTime}:00`)}
            mode="time"
            display="default"
            onChange={handleEndTimeChange}
          />
        )}

        {/* Color Picker */}
        <View style={styles.colorSection}>
          <Text style={styles.colorLabel}>색상</Text>
          <View style={styles.colorPicker}>
            {EVENT_COLORS.map(({ label, value }) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.colorOption,
                  { backgroundColor: value },
                  selectedColor === value && styles.colorOptionSelected,
                ]}
                onPress={() => setSelectedColor(value as EventColor)}
              >
                {selectedColor === value && (
                  <View style={styles.colorCheckmark} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isSaving}
          disabled={isSaving}
          style={styles.submitButton}
          buttonColor={COLORS.primary}
          textColor={COLORS.backgroundLight}
        >
          {event ? '수정하기' : '추가하기'}
        </Button>

        {event && (
          <Button
            mode="outlined"
            onPress={handleDelete}
            style={styles.deleteButton}
            textColor={COLORS.error}
          >
            삭제하기
          </Button>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  form: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: COLORS.backgroundLight,
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  pickerValue: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
  },
  colorSection: {
    marginBottom: 24,
  },
  colorLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginBottom: 12,
  },
  colorPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorOptionSelected: {
    borderWidth: 3,
    borderColor: COLORS.text,
  },
  colorCheckmark: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.backgroundLight,
  },
  submitButton: {
    marginBottom: 12,
    paddingVertical: 6,
  },
  deleteButton: {
    paddingVertical: 6,
    borderColor: COLORS.error,
  },
});

export default EventFormScreen;
