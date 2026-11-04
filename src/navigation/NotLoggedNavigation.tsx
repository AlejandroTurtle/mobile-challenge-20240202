import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Platform } from 'react-native';
import { NotLoggedStackParamList } from './types';
import { NOT_LOGGED } from './ScreensName';
import InitialScreenView from '../screens/auth/initialScreen/initialScreen.view';
import LoginScreenView from '../screens/auth/loginScreen/loginScreen.view';
import CreateAccountScreenView from '../screens/auth/createAccountScreen/createAccountScreen.view';

const Stack = createNativeStackNavigator<NotLoggedStackParamList>();

const NotLoggedNavigator = (): React.ReactElement => {
  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        animation: 'slide_from_right',
        gestureEnabled: Platform.OS === 'ios',
      }}
    >
      <Stack.Screen
        name={NOT_LOGGED.initial}
        options={{ title: 'Home', headerShown: false }}
        component={InitialScreenView}
      />
      <Stack.Screen
        name={NOT_LOGGED.login}
        options={{ title: 'Login' }}
        component={LoginScreenView}
      />
      <Stack.Screen
        name={NOT_LOGGED.createAccount}
        options={{ title: 'Criar conta' }}
        component={CreateAccountScreenView}
      />
    </Stack.Navigator>
  );
};

export default NotLoggedNavigator;
