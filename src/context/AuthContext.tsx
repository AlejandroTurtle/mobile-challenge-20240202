import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  onAuthStateChanged,
  type User as FirebaseUser,
} from '@react-native-firebase/auth';
import { firebaseAuth } from '../config/firebase';
import {
  createFirebaseAccount,
  signInFirebaseAccount,
  signOutFirebaseAccount,
} from '../services/firebaseAuth';
import type { NewUser } from '../types/authTypes';

interface AuthContextValue {
  user: FirebaseUser | null;
  loading: boolean;
  register: (newUser: NewUser) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(firebaseAuth, firebaseUser => {
        setUser(firebaseUser);
        setLoading(false);
      }),
    [],
  );

  async function register(newUser: NewUser): Promise<void> {
    const firebaseUser = await createFirebaseAccount(
      newUser.email.trim().toLowerCase(),
      newUser.password,
      newUser.name.trim(),
    );
    setUser(firebaseUser);
  }

  async function login(email: string, password: string): Promise<void> {
    const firebaseUser = await signInFirebaseAccount(
      email.trim().toLowerCase(),
      password,
    );
    setUser(firebaseUser);
  }

  async function logout(): Promise<void> {
    await signOutFirebaseAccount();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return context;
}
