/**
 * Main App Component
 * 
 * Entry point for the React Native Calendar App
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/constants';

/**
 * App Component
 * 
 * Sets up providers and renders the main navigation
 * 
 * @returns Root app component
 */
const App: React.FC = () => {
  return (
    <PaperProvider>
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle="light-content"
      />
      <AppNavigator />
    </PaperProvider>
  );
};

export default App;
