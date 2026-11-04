import { StyleSheet, Text as NativeText, type TextProps } from 'react-native';
import { useTheme } from '@react-navigation/native';

type TextVariant =
  | 'title'
  | 'heading'
  | 'description'
  | 'label'
  | 'feedback'
  | 'button';

type ThemeColor =
  | 'primary'
  | 'background'
  | 'card'
  | 'text'
  | 'border'
  | 'notification';

interface TextPropsWithVariant extends TextProps {
  color?: ThemeColor;
  variant?: TextVariant;
}

export function Text({
  color: colorName,
  style,
  variant = 'description',
  ...props
}: TextPropsWithVariant) {
  const { colors } = useTheme();
  const defaultColor =
    variant === 'button'
      ? 'card'
      : variant === 'feedback'
        ? 'notification'
        : 'text';
  const textColor = colors[colorName ?? defaultColor];

  return (
    <NativeText {...props} style={[styles[variant], { color: textColor }, style]} />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: '700',
  },
  heading: {
    fontSize: 30,
    fontWeight: '700',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  feedback: {
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    fontSize: 16,
    fontWeight: '700',
  },
});
