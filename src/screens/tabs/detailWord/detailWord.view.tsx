import { useTheme } from '@react-navigation/native';
import { Button, Pressable, StyleSheet, View } from 'react-native';
import { ScreenView } from '../../../components/ScreenView';
import { Text } from '../../../components/Text';
import DictionaryContentState from './DictionaryContentState';
import useDetailWord from './useDetailWord';
import { CustomButton } from '../../../components/CustomButton';

export default function DetailWordView() {
  const {
    word,
    isLoading,
    errorMessage,
    phonetic,
    handleSpeakPress,
    navigation,
    entries,
    handleFavoriteWord,
  } = useDetailWord();
  const { colors } = useTheme();

  return (
    <ScreenView contentContainerStyle={styles.content}>
      <Pressable
        hitSlop={8}
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={[styles.closeIcon, { color: colors.text }]}>×</Text>
      </Pressable>

      <View
        style={[
          styles.wordCard,
          { backgroundColor: '#EAD6E5', borderColor: colors.border },
        ]}
      >
        <Text variant="title" style={styles.word}>
          {word}
        </Text>
        {phonetic ? <Text style={styles.phonetic}>{phonetic}</Text> : null}
      </View>
      <View style={styles.favorite}>
        <CustomButton
          title="Favoritar palavra"
          onPress={handleFavoriteWord}
          variant="text"
        />
      </View>
      <Pressable
        onPress={handleSpeakPress}
        style={[
          styles.speakButton,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.playIcon, { color: colors.primary }]}>▶</Text>
        <Text variant="label">Ouvir palavra</Text>
      </Pressable>

      <View style={styles.meanings}>
        <Text variant="heading" style={styles.meaningsTitle}>
          Significados
        </Text>
        <DictionaryContentState
          isLoading={isLoading}
          errorMessage={errorMessage}
          isEmpty={entries.length === 0}
        >
          {entries.flatMap((entry, entryIndex) =>
            entry.meanings.map((meaning, meaningIndex) => (
              <View
                key={`${entryIndex}-${meaningIndex}`}
                style={styles.meaningGroup}
              >
                <Text variant="label" style={styles.partOfSpeech}>
                  {meaning.partOfSpeech}
                </Text>
                {meaning.definitions.map((definition, definitionIndex) => (
                  <View
                    key={`${entryIndex}-${meaningIndex}-${definitionIndex}`}
                    style={styles.definitionGroup}
                  >
                    <Text>{definition.definition}</Text>
                    {definition.example ? (
                      <Text style={styles.example}>“{definition.example}”</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            )),
          )}
        </DictionaryContentState>
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },
  backButton: {
    alignItems: 'flex-start',
    height: 48,
    justifyContent: 'center',
    marginBottom: 8,
    width: 48,
  },
  closeIcon: {
    fontSize: 36,
    fontWeight: '300',
    lineHeight: 40,
  },
  wordCard: {
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 240,
    paddingHorizontal: 20,
    paddingVertical: 36,
    width: '100%',
  },
  word: {
    textAlign: 'center',
  },
  phonetic: {
    fontSize: 24,
    marginTop: 24,
    textAlign: 'center',
  },
  speakButton: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    minHeight: 56,
    paddingHorizontal: 18,
  },
  playIcon: {
    fontSize: 22,
  },
  meanings: {
    marginTop: 30,
  },
  meaningsTitle: {
    marginBottom: 20,
  },
  meaningGroup: {
    marginBottom: 20,
  },
  partOfSpeech: {
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  definitionGroup: {
    marginBottom: 14,
    paddingLeft: 12,
  },
  example: {
    fontStyle: 'italic',
    marginTop: 6,
  },
  favorite: {
    alignItems: 'flex-end',
  },
});
