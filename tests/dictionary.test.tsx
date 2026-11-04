import AsyncStorage from '@react-native-async-storage/async-storage';
import { screen, userEvent, waitFor } from '@testing-library/react-native';
import Speech from '@mhpdev/react-native-speech';
import AuthenticatedScreenView from '../src/screens/tabs/authenticatedScreen/authenticatedScreen.view';
import FavoriteView from '../src/screens/tabs/authenticatedScreen/components/FavoriteView';
import HistoryView from '../src/screens/tabs/authenticatedScreen/components/HistoryView';
import DetailWordView from '../src/screens/tabs/detailWord/detailWord.view';
import { addWordToFavorite } from '../src/service/favorite.service';
import { addWordToSearchHistory } from '../src/service/searchHistory.service';
import { LOGGED } from '../src/navigation/ScreensName';
import { useRoute } from '@react-navigation/native';
import {
  authMocks,
  configureNavigation,
  mockGoBack,
  mockNavigate,
  renderWithProviders,
  resetTestState,
  signedInUser,
} from './testUtils';

jest.mock('../src/jsons/words_dictionary.json', () => ({
  apple: 1,
  peach: 1,
}));

describe('dicionário e palavras salvas', () => {
  beforeEach(async () => {
    await resetTestState(signedInUser);
  });

  it('abre a busca com a palavra informada', async () => {
    await renderWithProviders(<AuthenticatedScreenView />);

    const user = userEvent.setup();
    const searchInput = screen.getByPlaceholderText('Buscar palavra em inglês');
    await user.type(searchInput, '  peach  ');
    await user.press(screen.getByRole('button', { name: 'Buscar' }));

    expect(mockNavigate).toHaveBeenCalledWith(LOGGED.detailWord, {
      word: 'peach',
    });
  });

  it('encerra a sessão pelo menu de configurações', async () => {
    await renderWithProviders(<AuthenticatedScreenView />);

    const user = userEvent.setup();
    await user.press(screen.getByText('Configurações'));
    await user.press(screen.getByRole('button', { name: 'Sair' }));

    await waitFor(() => expect(authMocks.signOut).toHaveBeenCalled());
  });

  it('carrega o histórico e permite abrir uma palavra pesquisada', async () => {
    await addWordToSearchHistory('apple', signedInUser.uid);
    const onWordPress = jest.fn();
    await renderWithProviders(<HistoryView onWordPress={onWordPress} />);

    const user = userEvent.setup();
    await user.press(await screen.findByText('apple'));

    expect(onWordPress).toHaveBeenCalledWith('apple');
  });

  it('carrega favoritos e permite abrir uma palavra salva', async () => {
    await addWordToFavorite('peach', signedInUser.uid);
    const onWordPress = jest.fn();
    await renderWithProviders(<FavoriteView onWordPress={onWordPress} />);

    const user = userEvent.setup();
    await user.press(await screen.findByText('peach'));

    expect(onWordPress).toHaveBeenCalledWith('peach');
  });

  it('exibe a definição, reproduz o áudio e salva a palavra nos favoritos', async () => {
    const dictionaryResponse = [
      {
        word: 'apple',
        phonetic: '/ˈæp.əl/',
        phonetics: [],
        meanings: [
          {
            partOfSpeech: 'noun',
            definitions: [
              {
                definition: 'A round fruit with sweet flesh.',
                synonyms: [],
                antonyms: [],
                example: 'She ate an apple.',
              },
            ],
            synonyms: [],
            antonyms: [],
          },
        ],
        license: { name: 'Test license', url: 'https://example.com' },
        sourceUrls: [],
      },
    ];
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(dictionaryResponse),
    } as unknown as Response);

    await renderWithProviders(<DetailWordView />);

    expect(
      await screen.findByText('A round fruit with sweet flesh.'),
    ).toBeOnTheScreen();

    const user = userEvent.setup();
    await user.press(screen.getByText('Ouvir palavra'));
    expect(Speech.speak).toHaveBeenCalledWith('apple', { language: 'en-US' });

    await user.press(screen.getByRole('button', { name: 'Favoritar palavra' }));
    await waitFor(async () => {
      expect(await AsyncStorage.getItem('FAVORITE_test-user')).toBe(
        JSON.stringify(['apple']),
      );
    });

    await user.press(screen.getByText('×'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('mostra uma mensagem quando a palavra não existe no dicionário', async () => {
    configureNavigation({ word: 'unlistedword' });
    (useRoute as jest.Mock).mockReturnValue({
      key: 'missing-word-route',
      name: 'DetailWordScreen',
      params: { word: 'unlistedword' },
    });
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    await renderWithProviders(<DetailWordView />);

    expect(
      await screen.findByText(
        'Não conseguimos encontrar definições para a palavra que você estava procurando.',
      ),
    ).toBeOnTheScreen();
  });
});
