/**
 * @format
 */

import { render, screen, userEvent } from '@testing-library/react-native';
import App from '../App';

test('shows the persisted counter and responds to user input', async () => {
  await render(<App />);

  expect(await screen.findByText('React Native está pronto.')).toBeOnTheScreen();
  expect(screen.getByLabelText('Contador: 0')).toBeOnTheScreen();

  const user = userEvent.setup();
  await user.press(screen.getByRole('button', { name: 'Aumentar contador' }));

  expect(screen.getByLabelText('Contador: 1')).toBeOnTheScreen();
});
