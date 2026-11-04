import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { LoggedStackParamList } from './types';
import { LOGGED } from './ScreensName';
import AuthenticatedScreenView from '../screens/tabs/authenticatedScreen/authenticatedScreen.view';
import DetailWordView from '../screens/tabs/detailWord/detailWord.view';

const Stack = createNativeStackNavigator<LoggedStackParamList>();

const LoggedNavigator = (): React.ReactElement => {
  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        animation: 'slide_from_right',
        gestureEnabled: Platform.OS === 'ios',
      }}
    >
      <Stack.Screen
        name={LOGGED.authenticated}
        options={{ title: 'Home', headerShown: false }}
        component={AuthenticatedScreenView}
      />
      <Stack.Screen
        name={LOGGED.detailWord}
        options={{ title: 'Detail Word', headerShown: false }}
        component={DetailWordView}
      />
    </Stack.Navigator>
  );
};

export default LoggedNavigator;
