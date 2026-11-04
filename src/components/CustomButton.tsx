import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from './Text';

type CustomButtonVariant = 'primary' | 'text';

interface CustomButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  title: string;
  variant?: CustomButtonVariant;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
}

export function CustomButton({
  style,
  textStyle,
  title,
  loading,
  variant = 'primary',
  ...props
}: CustomButtonProps) {
  const { colors } = useTheme();
  const isTextButton = variant === 'text';

  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        isTextButton ? styles.textButton : { backgroundColor: colors.primary },
        pressed && !props.disabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={isTextButton ? colors.primary : colors.card}
        />
      ) : (
        <Text
          variant="button"
          style={[
            { color: isTextButton ? colors.primary : colors.card },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 14,
    justifyContent: 'center',
    minHeight: 54,
  },
  textButton: {
    backgroundColor: 'transparent',
    minHeight: 44,
    paddingHorizontal: 8,
  },
  pressed: {
    opacity: 0.72,
  },
});
