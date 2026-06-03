"use client";

import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getClientAuth } from "@/firebase";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const allowedEmails = new Set([
  "siddharthosarker219@gmail.com",
  "ssb123890@gmail.com",
]);

function isAllowedUser(user: User | null) {
  return Boolean(user?.email && allowedEmails.has(user.email.toLowerCase()));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getClientAuth();
    if (!auth) {
      setLoading(false);
      return;
    }

    return onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && !isAllowedUser(currentUser)) {
        await signOut(auth);
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const auth = getClientAuth();
    if (!auth) {
      throw new Error("Firebase is not configured.");
    }

    const credential = await signInWithEmailAndPassword(auth, email, password);

    if (!isAllowedUser(credential.user)) {
      await signOut(auth);
      throw new Error("This account is not authorized for the CMS.");
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const auth = getClientAuth();
    if (!auth) {
      throw new Error("Firebase is not configured.");
    }

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const credential = await signInWithPopup(auth, provider);

    if (!isAllowedUser(credential.user)) {
      await signOut(auth);
      throw new Error("This Google account is not authorized for the CMS.");
    }
  }, []);

  const logout = useCallback(async () => {
    const auth = getClientAuth();
    if (!auth) return;
    await signOut(auth);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, loginWithGoogle, logout }),
    [loading, login, loginWithGoogle, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
