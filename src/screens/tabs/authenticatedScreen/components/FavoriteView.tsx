import { useIsFocused, useTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { getFavorites } from '../../../../service/favorite.service';
import Toast from 'react-native-toast-message';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Text } from '../../../../components/Text';
import { useAuth } from '../../../../context/AuthContext';

interface FavoriteViewProps {
  onWordPress: (word: string) => void;
}

export default function FavoriteView({ onWordPress }: FavoriteViewProps) {
  const isFocused = useIsFocused();
  const { user } = useAuth();
  const userId = user?.uid;
  const { colors } = useTheme();
  const [favorite, setFavorite] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    if (!userId) {
      setFavorite([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    getFavorites(userId)
      .then(setFavorite)
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
      <Text variant="heading">Favoritos</Text>

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
          <Text>Carregando favoritos...</Text>
        </View>
      ) : favorite.length === 0 ? (
        <Text>Você ainda não favoritou nenhuma palavra.</Text>
      ) : (
        <FlatList
          data={favorite}
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
