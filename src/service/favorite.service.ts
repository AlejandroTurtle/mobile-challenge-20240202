import AsyncStorage from '@react-native-async-storage/async-storage';
import { favoritekey } from '../libs/asyncStorage';

function getUserFavoriteKey(userId: string) {
  return `${favoritekey}_${userId}`;
}

export async function getFavorites(userId: string): Promise<string[]> {
  const favorites = await AsyncStorage.getItem(getUserFavoriteKey(userId));
  if (!favorites) {
    return [];
  }

  const favorite: string = JSON.parse(favorites);
  if (!Array.isArray(favorite)) {
    return [];
  }

  return favorite;
}

export async function addWordToFavorite(word: string, userId: string) {
  if (!word || !userId) {
    return;
  }

  const normalizedWord = word.toLowerCase().trim();
  const favorite = await getFavorites(userId);
  const updatedFavorite = [
    normalizedWord,
    ...favorite.filter(item => item.toLowerCase().trim() !== normalizedWord),
  ];

  await AsyncStorage.setItem(
    getUserFavoriteKey(userId),
    JSON.stringify(updatedFavorite),
  );
}
