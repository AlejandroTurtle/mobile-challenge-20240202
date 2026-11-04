import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../../../components/Text';
import dictionary from '../../../../jsons/words_dictionary.json';
import Speech from '@mhpdev/react-native-speech';

interface ListViewItemProps {
  onPress: (item: string) => void;
}

const words = Object.keys(dictionary);

export default function ListView({ onPress }: ListViewItemProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text variant="heading" style={styles.title}>
        Lista de palavras
      </Text>
      <FlatList
        data={words}
        numColumns={3}
        keyExtractor={word => word}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onPress(item)}
            style={[
              styles.wordCell,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text variant="description" style={styles.word}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: 16,
  },
  wordCell: {
    alignItems: 'center',
    aspectRatio: 1,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
  },
  word: {
    fontSize: 20,
  },
});
