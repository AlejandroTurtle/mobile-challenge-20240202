import { StyleSheet, View } from 'react-native';
import { CustomButton } from '../../../components/CustomButton';
import { ScreenView } from '../../../components/ScreenView';
import { Text } from '../../../components/Text';
import useInitialScreen from './useInitialScreen';

export default function InitialScreenView() {
  const { handleLoginPress } = useInitialScreen();

  return (
    <ScreenView>
      <View style={styles.content}>
        <Text variant="title" style={styles.title}>
          Bem-vindo
        </Text>
        <Text variant="description" style={styles.description}>
          Acesse sua conta para começar.
        </Text>

        <CustomButton title="Entrar" onPress={handleLoginPress} />
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
});
