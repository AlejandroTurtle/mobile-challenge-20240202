import {
  StyleSheet,
  TextInput,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

interface CustomInputProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
}

export function CustomInput({
  placeholderTextColor,
  style,
  ...props
}: CustomInputProps) {
  const { colors } = useTheme();

  return (
    <TextInput
      {...props}
      placeholderTextColor={placeholderTextColor ?? colors.border}
      style={[
        styles.input,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          color: colors.text,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 52,
    paddingHorizontal: 14,
  },
});
