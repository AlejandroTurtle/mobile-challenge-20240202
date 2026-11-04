import { useAuth } from '../context/AuthContext';
import NotLoggedNavigator from './NotLoggedNavigation';
import LoggedNavigator from './LoggedNavigation';

export function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return user ? <LoggedNavigator /> : <NotLoggedNavigator />;
}
