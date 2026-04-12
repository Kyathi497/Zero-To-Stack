"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { loginApi, logoutApi, meApi, signupApi, User } from "@/lib/api/auth";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    meApi()
      .then((res) => {
        if (res.success && res.data) setUser(res.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await loginApi({ email, password });
    if (res.success && res.data) {
      setUser(res.data);
      return {};
    }
    return { error: res.error?.message ?? "Login failed" };
  }, []);

  const signup = useCallback(
    async (data: {
      name: string;
      email: string;
      password: string;
      phone?: string;
    }) => {
      const res = await signupApi(data);
      if (res.success && res.data) {
        setUser(res.data);
        return {};
      }
      return { error: res.error?.message ?? "Sign up failed" };
    },
    []
  );

  const logout = useCallback(async () => {
    await logoutApi();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
