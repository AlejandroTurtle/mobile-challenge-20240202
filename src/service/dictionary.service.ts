import AsyncStorage from '@react-native-async-storage/async-storage';
import { wordKey } from '../libs/asyncStorage';
import type { DictionaryResponse } from '../types/dictionaryTypes';
import Toast from 'react-native-toast-message';
import { addWordToSearchHistory } from './searchHistory.service';

const wordCache = new Map<string, DictionaryResponse>();

export type DictionaryError = 'notFound' | 'server' | 'network' | 'request';

export interface DictionaryResult {
  data: DictionaryResponse | null;
  error: DictionaryError | null;
}

function normalizeWord(word: string) {
  return word.toLowerCase().trim();
}

export async function getWordAsyncStorage(
  normalizedWord: string,
  userId: string,
): Promise<DictionaryResponse | null> {
  try {
    const stored = await AsyncStorage.getItem(
      `${userId}_${wordKey}_${normalizedWord}`,
    );
    return stored ? (JSON.parse(stored) as DictionaryResponse) : null;
  } catch (error) {
    return null;
  }
}

export async function getWordDetails(
  word: string,
  userId: string,
): Promise<DictionaryResult> {
  const normalizedWord = normalizeWord(word);
  if (!normalizedWord || !userId) {
    return { data: null, error: 'request' };
  }

  try {
    await addWordToSearchHistory(normalizedWord, userId);
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Não foi possível salvar a palavra no histórico.',
    });
  }

  const cacheKey = `${userId}_${normalizedWord}`;
  const cachedWord = wordCache.get(cacheKey);
  if (cachedWord) {
    return { data: cachedWord, error: null };
  }

  const storedWord = await getWordAsyncStorage(normalizedWord, userId);
  if (storedWord?.[0]?.word?.toLowerCase().trim() === normalizedWord) {
    wordCache.set(cacheKey, storedWord);
    return { data: storedWord, error: null };
  }

  try {
    const encodedWord = encodeURIComponent(normalizedWord);
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodedWord}`,
    );
    if (!response.ok) {
      const error =
        response.status === 404
          ? 'notFound'
          : response.status >= 500
          ? 'server'
          : 'request';
      return { data: null, error };
    }

    const result = (await response.json()) as DictionaryResponse;
    wordCache.set(cacheKey, result);
    try {
      await AsyncStorage.setItem(
        `${userId}_${wordKey}_${normalizedWord}`,
        JSON.stringify(result),
      );
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Ocorreu um erro ao salvar a palavra',
      });
    }

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error: 'network' };
  }
}
