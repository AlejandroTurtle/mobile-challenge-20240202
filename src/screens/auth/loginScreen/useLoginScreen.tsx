import { useState } from 'react';
import { NOT_LOGGED } from '../../../navigation/ScreensName';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NotLoggedStackParamList } from '../../../navigation/types';
import { useAuth } from '../../../context/AuthContext';
import { getFirebaseAuthErrorMessage } from '../../../services/firebaseAuth';

type InitialScreenNavigation = NativeStackNavigationProp<
  NotLoggedStackParamList,
  typeof NOT_LOGGED.login
>;

export default function useLoginScreen() {
  const navigation = useNavigation<InitialScreenNavigation>();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleEmailChange(value: string) {
    setEmail(value);
    setFeedback('');
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
    setFeedback('');
  }

  async function handleSubmit() {
    if (isSubmitting) {
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setFeedback('Preencha o e-mail e a senha para continuar.');
      return;
    }

    setIsSubmitting(true);

    try {
      await login(normalizedEmail, password);
      setPassword('');
      setFeedback('Login realizado com sucesso.');
    } catch (error) {
      setFeedback(getFirebaseAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCreateAccount() {
    navigation.navigate(NOT_LOGGED.createAccount);
  }

  return {
    email,
    password,
    feedback,
    isSubmitting,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    handleCreateAccount,
  };
}
