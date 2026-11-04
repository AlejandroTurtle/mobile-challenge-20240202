import AsyncStorage from '@react-native-async-storage/async-storage';
import { historyKey } from '../libs/asyncStorage';

function getUserHistoryKey(userId: string) {
  return `${historyKey}_${userId}`;
}

export async function getSearchHistory(userId: string): Promise<string[]> {
  const storedHistory = await AsyncStorage.getItem(getUserHistoryKey(userId));
  if (!storedHistory) {
    return [];
  }

  const history: string = JSON.parse(storedHistory);
  if (!Array.isArray(history)) {
    return [];
  }

  return history;
}

export async function addWordToSearchHistory(
  word: string,
  userId: string,
): Promise<void> {
  if (!word) {
    return;
  }

  const history = await getSearchHistory(userId);
  const updatedHistory = [
    word,
    ...history.filter(item => item.toLowerCase().trim() !== word),
  ];

  await AsyncStorage.setItem(
    getUserHistoryKey(userId),
    JSON.stringify(updatedHistory),
  );
}
