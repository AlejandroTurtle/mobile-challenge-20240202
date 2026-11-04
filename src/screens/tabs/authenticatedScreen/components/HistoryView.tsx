import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useIsFocused, useTheme } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Text } from '../../../../components/Text';
import { getSearchHistory } from '../../../../service/searchHistory.service';
import { useAuth } from '../../../../context/AuthContext';

interface HistoryViewProps {
  onWordPress: (word: string) => void;
}

export default function HistoryView({ onWordPress }: HistoryViewProps) {
  const isFocused = useIsFocused();
  const { user } = useAuth();
  const userId = user?.uid;
  const { colors } = useTheme();
  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    if (!userId) {
      setHistory([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    getSearchHistory(userId)
      .then(setHistory)
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Não foi possível carregar o histórico.',
        });
      })
      .finally(() => setIsLoading(false));
  }, [isFocused, userId]);

  return (
    <View style={styles.container}>
      <Text variant="heading">Histórico</Text>

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
          <Text>Carregando histórico...</Text>
        </View>
      ) : history.length === 0 ? (
        <Text>Você ainda não pesquisou nenhuma palavra.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={word => word}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onWordPress(item)}
              style={[
                styles.wordItem,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text>{item}</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 24,
  },
  loading: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 32,
  },
  wordItem: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    padding: 16,
  },
});
