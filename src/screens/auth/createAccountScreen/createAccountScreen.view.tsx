import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CustomButton } from '../../../components/CustomButton';
import { CustomInput } from '../../../components/CustomInput';
import { ScreenView } from '../../../components/ScreenView';
import { Text } from '../../../components/Text';
import useCreateAccountScreen from './useCreateAccountScreen';

export default function CreateAccountScreenView() {
  const {
    name,
    email,
    password,
    isSubmitting,
    setName,
    setEmail,
    setPassword,
    handleSubmit,
  } = useCreateAccountScreen();
  const { colors } = useTheme();

  return (
    <ScreenView>
      <View style={styles.content}>
        <Text variant="heading" style={styles.title}>
          Criar conta
        </Text>
        <Text variant="description" style={styles.description}>
          Preencha seus dados para criar seu perfil.
        </Text>

        <View
          style={[
            styles.form,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.field}>
            <Text variant="label">Nome</Text>
            <CustomInput
              autoCapitalize="words"
              autoComplete="name"
              onChangeText={setName}
              placeholder="Seu nome"
              returnKeyType="next"
              value={name}
            />
          </View>

          <View style={styles.field}>
            <Text variant="label">E-mail</Text>
            <CustomInput
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="voce@exemplo.com"
              returnKeyType="next"
              value={email}
            />
          </View>

          <View style={styles.field}>
            <Text variant="label">Senha</Text>
            <CustomInput
              autoCapitalize="none"
              onChangeText={setPassword}
              onSubmitEditing={handleSubmit}
              placeholder="Mínimo de 8 caracteres"
              returnKeyType="done"
              secureTextEntry
              value={password}
            />
          </View>

          <CustomButton
            loading={isSubmitting}
            disabled={isSubmitting}
            title={isSubmitting ? 'Criando conta...' : 'Criar conta'}
            onPress={handleSubmit}
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
});
