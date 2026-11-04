import type { DictionaryError } from '../../../service/dictionary.service';

const messages: Record<DictionaryError, string> = {
  notFound:
    'Não conseguimos encontrar definições para a palavra que você estava procurando.',
  server:
    'O dicionário está temporariamente indisponível. Tente novamente em instantes.',
  network:
    'Não foi possível carregar a palavra. Verifique sua conexão e tente novamente.',
  request: 'Não foi possível buscar os significados desta palavra.',
};

export function getDictionaryErrorMessage(error: DictionaryError | null) {
  return error ? messages[error] : null;
}
