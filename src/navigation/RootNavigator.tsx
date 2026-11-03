import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CounterScreen } from '../features/counter/CounterScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Counter" component={CounterScreen} />
    </Stack.Navigator>
  );
}
