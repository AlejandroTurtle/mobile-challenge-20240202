import {
  KeyboardAwareScrollView,
  type KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-controller';
import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

type ScreenViewProps = KeyboardAwareScrollViewProps;

export function ScreenView({
  bottomOffset = 200,
  children,
  contentContainerStyle,
  keyboardDismissMode = 'none',
  keyboardShouldPersistTaps = 'handled',
  style,
  ...props
}: ScreenViewProps) {
  const { colors } = useTheme();

  return (
    <KeyboardAwareScrollView
      {...props}
      bottomOffset={bottomOffset}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      keyboardDismissMode={keyboardDismissMode}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      style={[styles.screen, { backgroundColor: colors.background }, style]}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
});
