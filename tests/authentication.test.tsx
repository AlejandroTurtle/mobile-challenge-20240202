import { screen, userEvent } from '@testing-library/react-native';
import Toast from 'react-native-toast-message';
import InitialScreenView from '../src/screens/auth/initialScreen/initialScreen.view';
import LoginScreenView from '../src/screens/auth/loginScreen/loginScreen.view';
import CreateAccountScreenView from '../src/screens/auth/createAccountScreen/createAccountScreen.view';
import { NOT_LOGGED } from '../src/navigation/ScreensName';
import {
  authMocks,
  mockNavigate,
  renderWithProviders,
  resetTestState,
  signedInUser,
} from './testUtils';

describe('autenticação', () => {
  beforeEach(async () => {
    await resetTestState();
  });

  it('encaminha da tela inicial para o login', async () => {
    await renderWithProviders(<InitialScreenView />);

    const user = userEvent.setup();
    await user.press(screen.getByRole('button', { name: 'Entrar' }));

    expect(mockNavigate).toHaveBeenCalledWith('LoginScreen');
  });

  it('valida os campos obrigatórios do login', async () => {
    await renderWithProviders(<LoginScreenView />);

    const user = userEvent.setup();
    await user.press(screen.getByRole('button', { name: 'Entrar' }));

    expect(
      await screen.findByText('Preencha o e-mail e a senha para continuar.'),
    ).toBeOnTheScreen();
    expect(authMocks.signIn).not.toHaveBeenCalled();
  });

  it('abre o cadastro a partir da tela de login', async () => {
    await renderWithProviders(<LoginScreenView />);

    const user = userEvent.setup();
    await user.press(screen.getByRole('button', { name: 'Criar conta' }));

    expect(mockNavigate).toHaveBeenCalledWith(NOT_LOGGED.createAccount);
  });

  it('normaliza o e-mail e mostra sucesso ao entrar', async () => {
    await renderWithProviders(<LoginScreenView />);

    const user = userEvent.setup();
    await user.type(
      screen.getByPlaceholderText('voce@exemplo.com'),
      '  USER@EXAMPLE.COM  ',
    );
    await user.type(screen.getByPlaceholderText('Digite sua senha'), 'senha123');
    await user.press(screen.getByRole('button', { name: 'Entrar' }));

    expect(await screen.findByText('Login realizado com sucesso.')).toBeOnTheScreen();
    expect(authMocks.signIn).toHaveBeenCalledWith(
      expect.anything(),
      'user@example.com',
      'senha123',
    );
  });

  it('rejeita e-mail inválido no cadastro sem chamar o Firebase', async () => {
    await renderWithProviders(<CreateAccountScreenView />);

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Seu nome'), 'Ana');
    await user.type(screen.getByPlaceholderText('voce@exemplo.com'), 'email-invalido');
    await user.type(
      screen.getByPlaceholderText('Mínimo de 8 caracteres'),
      'senha123',
    );
    await user.press(screen.getByRole('button', { name: 'Criar conta' }));

    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
        text1: 'Informe um e-mail válido.',
      }),
    );
    expect(authMocks.createAccount).not.toHaveBeenCalled();
  });

  it('cria a conta com dados normalizados e autentica o usuário', async () => {
    await renderWithProviders(<CreateAccountScreenView />);

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Seu nome'), ' Ana Silva ');
    await user.type(
      screen.getByPlaceholderText('voce@exemplo.com'),
      ' ANA@EXAMPLE.COM ',
    );
    await user.type(
      screen.getByPlaceholderText('Mínimo de 8 caracteres'),
      'senha123',
    );
    await user.press(screen.getByRole('button', { name: 'Criar conta' }));

    expect(authMocks.createAccount).toHaveBeenCalledWith(
      expect.anything(),
      'ana@example.com',
      'senha123',
    );
    expect(authMocks.updateProfile).toHaveBeenCalledWith(signedInUser, {
      displayName: 'Ana Silva',
    });
    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'success',
        text1: 'Conta criada e login realizado com sucesso.',
      }),
    );
  });
});
