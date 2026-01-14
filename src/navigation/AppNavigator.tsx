/**
 * Navigation Configuration
 * 
 * Sets up React Navigation stack for the app
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { COLORS } from '../constants';

// Import screens
import CalendarScreen from '../screens/CalendarScreen';
import EventFormScreen from '../screens/EventFormScreen';
import EventListScreen from '../screens/EventListScreen';

const Stack = createStackNavigator<RootStackParamList>();

/**
 * App Navigator Component
 * 
 * Configures navigation stack with custom styling
 * 
 * @returns Navigation container with stack navigator
 */
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Calendar"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: COLORS.backgroundLight,
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 20,
          },
          headerBackTitleVisible: false,
          cardStyle: {
            backgroundColor: COLORS.background,
          },
        }}
      >
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            title: '캘린더',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="EventForm"
          component={EventFormScreen}
          options={({ route }) => ({
            title: route.params?.event ? '일정 수정' : '일정 추가',
            headerShown: true,
          })}
        />
        <Stack.Screen
          name="EventList"
          component={EventListScreen}
          options={{
            title: '일정 목록',
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
