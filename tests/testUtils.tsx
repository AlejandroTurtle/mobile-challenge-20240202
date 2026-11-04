import type { ReactElement } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User as FirebaseUser,
} from '@react-native-firebase/auth';
import {
  NavigationContainer,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import { AuthProvider } from '../src/context/AuthContext';

export const signedInUser = {
  uid: 'test-user',
  email: 'user@example.com',
  displayName: 'Test User',
} as FirebaseUser;

export const authMocks = {
  createAccount: createUserWithEmailAndPassword as jest.Mock,
  onAuthStateChanged: onAuthStateChanged as jest.Mock,
  signIn: signInWithEmailAndPassword as jest.Mock,
  signOut: signOut as jest.Mock,
  updateProfile: updateProfile as jest.Mock,
};

export const mockNavigate = jest.fn();
export const mockGoBack = jest.fn();

export function configureNavigation(params = { word: 'apple' }) {
  (useNavigation as jest.Mock).mockReturnValue({
    navigate: mockNavigate,
    goBack: mockGoBack,
  });
  (useRoute as jest.Mock).mockReturnValue({
    key: 'test-route',
    name: 'DetailWordScreen',
    params,
  });
  (useIsFocused as jest.Mock).mockReturnValue(true);
}

export async function resetTestState(user: FirebaseUser | null = null) {
  await AsyncStorage.clear();
  jest.clearAllMocks();

  authMocks.onAuthStateChanged.mockImplementation((_auth, listener) => {
    listener(user);
    return jest.fn();
  });
  authMocks.createAccount.mockResolvedValue({ user: signedInUser });
  authMocks.signIn.mockResolvedValue({ user: signedInUser });
  authMocks.signOut.mockResolvedValue(undefined);
  authMocks.updateProfile.mockResolvedValue(undefined);

  configureNavigation();
}

export async function renderWithProviders(element: ReactElement) {
  return render(
    <AuthProvider>
      <NavigationContainer>{element}</NavigationContainer>
    </AuthProvider>,
  );
}
