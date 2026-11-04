import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from '@react-native-firebase/auth';
import { firebaseAuth } from '../config/firebase';

export async function createFirebaseAccount(
  email: string,
  password: string,
  name: string,
): Promise<User> {
  const { user } = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password,
  );

  await updateProfile(user, { displayName: name });

  return user;
}

export async function signInFirebaseAccount(
  email: string,
  password: string,
): Promise<User> {
  const { user } = await signInWithEmailAndPassword(
    firebaseAuth,
    email,
    password,
  );

  return user;
}

export async function signOutFirebaseAccount(): Promise<void> {
  await signOut(firebaseAuth);
}

export function getFirebaseAuthErrorMessage(error: unknown): string {
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? error.code
      : undefined;

  switch (code) {
    case 'auth/email-already-in-use':
      return 'Já existe uma conta cadastrada com esse e-mail.';
    case 'auth/invalid-email':
      return 'Informe um e-mail válido.';
    case 'auth/weak-password':
      return 'A senha não atende aos requisitos do Firebase.';
    case 'auth/user-disabled':
      return 'Esta conta foi desativada.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'E-mail ou senha inválidos.';
    case 'auth/operation-not-allowed':
      return 'Ative o provedor E-mail/senha nas configurações do Firebase.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Aguarde um pouco e tente novamente.';
    case 'auth/network-request-failed':
      return 'Não foi possível conectar. Verifique sua internet.';
    default:
      return 'Não foi possível autenticar. Tente novamente.';
  }
}
