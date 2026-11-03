import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { decrement, increment, reset } from './counterSlice';

export function CounterScreen() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(state => state.counter.value);

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>MOBILE CHALLENGE</Text>
        <Text style={styles.title}>React Native está pronto.</Text>
        <Text style={styles.description}>
          Redux Toolkit controla o estado e o AsyncStorage mantém os dados no
          dispositivo.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>CONTADOR PERSISTIDO</Text>
          <Text accessibilityLabel={`Contador: ${count}`} style={styles.count}>
            {count}
          </Text>

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Diminuir contador"
              onPress={() => dispatch(decrement())}
              style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
              <Text style={styles.secondaryButtonText}>−</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Aumentar contador"
              onPress={() => dispatch(increment())}
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
              <Text style={styles.primaryButtonText}>Adicionar</Text>
            </Pressable>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Zerar contador"
            onPress={() => dispatch(reset())}
            style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Zerar contador</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>Edite App.tsx e comece a construir.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  eyebrow: {
    color: '#3157d5',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 14,
  },
  title: {
    color: '#15213b',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.6,
    lineHeight: 39,
    marginBottom: 12,
  },
  description: {
    color: '#5c6780',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e9f2',
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    shadowColor: '#15213b',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 3,
  },
  cardLabel: {
    color: '#727d95',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  count: {
    color: '#15213b',
    fontSize: 64,
    fontWeight: '700',
    lineHeight: 78,
    marginVertical: 12,
    textAlign: 'center',
  },
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#3157d5',
    borderRadius: 14,
    flex: 1,
    justifyContent: 'center',
    minHeight: 54,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#eef1f8',
    borderRadius: 14,
    height: 54,
    justifyContent: 'center',
    width: 54,
  },
  secondaryButtonText: {
    color: '#263656',
    fontSize: 26,
    fontWeight: '500',
  },
  pressed: {
    opacity: 0.72,
  },
  resetButton: {
    alignSelf: 'center',
    marginTop: 20,
    padding: 8,
  },
  resetButtonText: {
    color: '#5c6780',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    color: '#8a94a8',
    fontSize: 13,
    marginTop: 28,
    textAlign: 'center',
  },
});
