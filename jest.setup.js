jest.mock('@react-native-async-storage/async-storage', () => {
  const storage = new Map();

  return {
    __esModule: true,
    default: {
      clear: jest.fn(async () => storage.clear()),
      getItem: jest.fn(async key => storage.get(key) ?? null),
      removeItem: jest.fn(async key => storage.delete(key)),
      setItem: jest.fn(async (key, value) => storage.set(key, value)),
    },
  };
});

jest.mock('@react-native-firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  updateProfile: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);

jest.mock('react-native-keyboard-controller', () => {
  const React = require('react');
  const { ScrollView } = require('react-native');

  return {
    KeyboardProvider: ({ children }) => children,
    KeyboardAwareScrollView: ({ children, ...props }) => {
      const scrollProps = { ...props };
      delete scrollProps.bottomOffset;
      return React.createElement(ScrollView, scrollProps, children);
    },
  };
});

jest.mock('@mhpdev/react-native-speech', () => ({
  __esModule: true,
  default: { speak: jest.fn().mockResolvedValue(undefined) },
}));

jest.mock('react-native-toast-message', () => {
  const Toast = () => null;
  Toast.show = jest.fn();

  return { __esModule: true, default: Toast };
});

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');

  return {
    ...actual,
    useNavigation: jest.fn(),
    useRoute: jest.fn(),
    useIsFocused: jest.fn(() => true),
  };
});
