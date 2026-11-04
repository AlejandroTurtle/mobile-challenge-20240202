import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NOT_LOGGED } from '../../../navigation/ScreensName';
import type { NotLoggedStackParamList } from '../../../navigation/types';

type InitialScreenNavigation = NativeStackNavigationProp<
  NotLoggedStackParamList,
  typeof NOT_LOGGED.initial
>;

export default function useInitialScreen() {
  const navigation = useNavigation<InitialScreenNavigation>();

  function handleLoginPress() {
    navigation.navigate(NOT_LOGGED.login);
  }

  return { handleLoginPress };
}
