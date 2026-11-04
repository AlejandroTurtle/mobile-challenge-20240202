import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import type { LoggedStackParamList } from '../../../navigation/types';
import { LOGGED } from '../../../navigation/ScreensName';
import type { DictionaryResponse } from '../../../types/dictionaryTypes';
import {
  getWordDetails,
  type DictionaryError,
} from '../../../service/dictionary.service';
import { getDictionaryErrorMessage } from './dictionaryErrorMessages';
import Speech from '@mhpdev/react-native-speech';
import Toast from 'react-native-toast-message';
import { addWordToFavorite } from '../../../service/favorite.service';
import { useAuth } from '../../../context/AuthContext';

type DetailWordViewProps = NativeStackScreenProps<
  LoggedStackParamList,
  typeof LOGGED.detailWord
>;

export default function useDetailWord() {
  const { user } = useAuth();
  const userId = user?.uid;
  const [wordDetails, setWordDetails] = useState<DictionaryResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<DictionaryError | null>(null);

  const route = useRoute<DetailWordViewProps['route']>();
  const navigation = useNavigation<DetailWordViewProps['navigation']>();
  const { word } = route.params;
  const entries: DictionaryResponse = wordDetails ?? [];
  const errorMessage = getDictionaryErrorMessage(error);
  const phonetic =
    entries.find(entry => entry.phonetic)?.phonetic ??
    entries.flatMap(entry => entry.phonetics).find(item => item.text)?.text;

  async function handleSpeakPress() {
    try {
      await Speech.speak(word, { language: 'en-US' });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1:
          'Estamos com problemas para reproduzir o audio, porfavor tente novamente mais tarde.',
      });
    }
  }

  async function handleFavoriteWord() {
    if (!userId) {
      Toast.show({
        type: 'error',
        text1: 'Não foi possível identificar sua conta.',
      });
      return;
    }

    try {
      await addWordToFavorite(word, userId);
      Toast.show({
        type: 'success',
        text1: 'Palavra salva com sucesso',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Não foi possível favoritar a palavra',
      });
    }
  }

  useEffect(() => {
    setIsLoading(true);
    setWordDetails(null);
    setError(null);
    if (!userId) {
      setError('request');
      setIsLoading(false);
      return;
    }

    getWordDetails(word, userId)
      .then(result => {
        setWordDetails(result.data);
        setError(result.error);
      })
      .finally(() => setIsLoading(false));
  }, [word, userId]);

  return {
    word,
    isLoading,
    errorMessage,
    phonetic,
    handleSpeakPress,
    navigation,
    entries,
    handleFavoriteWord,
  };
}
