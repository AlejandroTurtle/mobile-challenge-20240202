import type { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../../components/Text';

interface DictionaryContentStateProps {
  isLoading: boolean;
  errorMessage: string | null;
  isEmpty: boolean;
  children: ReactNode;
}

type ContentState = 'loading' | 'error' | 'empty' | 'ready';

function getContentState(
  isLoading: boolean,
  errorMessage: string | null,
  isEmpty: boolean,
): ContentState {
  if (isLoading) {
    return 'loading';
  }
  if (errorMessage) {
    return 'error';
  }
  if (isEmpty) {
    return 'empty';
  }
  return 'ready';
}

export default function DictionaryContentState({
  isLoading,
  errorMessage,
  isEmpty,
  children,
}: DictionaryContentStateProps) {
  const { colors } = useTheme();
  const state = getContentState(isLoading, errorMessage, isEmpty);

  switch (state) {
    case 'loading':
      return (
        <View style={styles.status}>
          <ActivityIndicator color={colors.primary} size="large" />
          <Text>Buscando significados...</Text>
        </View>
      );
    case 'error':
      return (
        <Text variant="feedback" style={styles.errorMessage}>
          {errorMessage}
        </Text>
      );
    case 'empty':
      return <Text>Nenhum significado disponível.</Text>;
    case 'ready':
      return children;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  status: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 32,
  },
  errorMessage: {
    textAlign: 'center',
  },
});
