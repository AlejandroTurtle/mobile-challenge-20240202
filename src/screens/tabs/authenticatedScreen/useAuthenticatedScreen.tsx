import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { LoggedStackParamList } from '../../../navigation/types';
import { LOGGED } from '../../../navigation/ScreensName';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../../context/AuthContext';

type InitialScreenNavigation = NativeStackNavigationProp<
  LoggedStackParamList,
  typeof LOGGED.authenticated
>;

const menus = [
  { key: 'list', label: 'Lista' },
  { key: 'history', label: 'Histórico' },
  { key: 'favorites', label: 'Favoritos' },
  { key: 'settings', label: 'Configurações' },
] as const;

type MenuKey = (typeof menus)[number]['key'];

export default function useAuthenticatedScreen() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>('list');
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [searchWord, setSearchWord] = useState('');

  const { logout } = useAuth();
  const navigation = useNavigation<InitialScreenNavigation>();

  function handleListItemPress(word: string) {
    navigation.navigate(LOGGED.detailWord, { word });
  }
  function handleWordSearch() {
    const word = searchWord.trim();
    if (word) {
      handleListItemPress(word);
    }
    setSearchWord('');
  }

  async function handleSignOut() {
    if (isSigningOut) {
      return;
    }
    setIsSigningOut(true);
    try {
      await logout();
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Não foi possível sair da conta. Tente novamente.',
      });
    } finally {
      setIsSigningOut(false);
    }
  }
  return {
    handleListItemPress,
    handleWordSearch,
    handleSignOut,
    activeMenu,
    setActiveMenu,
    isSigningOut,
    searchWord,
    setSearchWord,
    menus,
  };
}
