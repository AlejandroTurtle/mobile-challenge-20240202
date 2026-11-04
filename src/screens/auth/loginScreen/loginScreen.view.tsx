import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CustomButton } from '../../../components/CustomButton';
import { CustomInput } from '../../../components/CustomInput';
import { ScreenView } from '../../../components/ScreenView';
import { Text } from '../../../components/Text';
import useLoginScreen from './useLoginScreen';

export default function LoginScreenView() {
  const {
    email,
    password,
    feedback,
    isSubmitting,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    handleCreateAccount,
  } = useLoginScreen();
  const { colors } = useTheme();

  return (
    <ScreenView>
      <View style={styles.content}>
        <Text variant="heading" style={styles.title}>
          Acesse sua conta
        </Text>
        <Text variant="description" style={styles.description}>
          Informe seus dados para continuar.
        </Text>

        <View
          style={[
            styles.form,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.field}>
            <Text variant="label">E-mail</Text>
            <CustomInput
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={handleEmailChange}
              placeholder="voce@exemplo.com"
              value={email}
            />
          </View>

          <View style={styles.field}>
            <Text variant="label">Senha</Text>
            <CustomInput
              autoCapitalize="none"
              onChangeText={handlePasswordChange}
              onSubmitEditing={handleSubmit}
              placeholder="Digite sua senha"
              returnKeyType="done"
              secureTextEntry
              value={password}
            />
          </View>

          {feedback ? <Text variant="feedback">{feedback}</Text> : null}

          <CustomButton
            disabled={isSubmitting}
            variant="text"
            title="Criar conta"
            onPress={handleCreateAccount}
            style={styles.button}
          />
          <CustomButton
            disabled={isSubmitting}
            title={isSubmitting ? 'Entrando...' : 'Entrar'}
            onPress={handleSubmit}
            style={styles.button}
          />
        </View>
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  content: {
    alignSelf: 'center',
    maxWidth: 480,
    width: '100%',
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 28,
  },
  form: {
    borderRadius: 20,
    borderWidth: 1,
    gap: 18,
    padding: 22,
  },
  field: {
    gap: 8,
  },
  button: {
    marginTop: 4,
  },
  createAccount: {
    marginTop: 12,
  },
  createAccountText: {
    textAlign: 'center',
  },
});
