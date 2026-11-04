import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getFirebaseAuthErrorMessage } from '../../../services/firebaseAuth';
import Toast from 'react-native-toast-message';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function useCreateAccountScreen() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleNameChange(value: string) {
    setName(value);
  }

  function handleEmailChange(value: string) {
    setEmail(value);
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
  }

  async function handleSubmit() {
    if (isSubmitting) {
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!name.trim() || !normalizedEmail || !password) {
      Toast.show({
        type: 'error',
        text1: 'Preencha nome, e-mail e senha para continuar.',
      });
      return;
    }

    if (!emailPattern.test(normalizedEmail)) {
      Toast.show({
        type: 'error',
        text1: 'Informe um e-mail válido.',
      });
      return;
    }

    if (password.length < 8) {
      Toast.show({
        type: 'error',
        text1: 'A senha deve ter pelo menos 8 caracteres.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        name: name.trim(),
        email: normalizedEmail,
        password,
      });

      setPassword('');
      Toast.show({
        type: 'success',
        text1: 'Conta criada e login realizado com sucesso.',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: getFirebaseAuthErrorMessage(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    name,
    email,
    password,
    isSubmitting,
    setName,
    setEmail,
    setPassword,
    handleSubmit,
  };
}
