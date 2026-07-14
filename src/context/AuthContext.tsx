import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextValue, AuthState } from "../types/Auth";
import { login as loginRequest } from "../api/auth";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function readStoredAuth(): AuthState {
  try {
    const raw = localStorage.getItem("auth");

    if (!raw) return { token: null, username: null };
    return JSON.parse(raw);
  } catch {
    return { token: null, username: null };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(readStoredAuth);

  const login = async (username: string, password: string) => {
    const { token } = await loginRequest({ username, password });
    setAuth({ token, username });
  };

  const logout = () => {
    setAuth({ token: null, username: null });
  };

  useEffect(() => {
    if (auth.token) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  return <AuthContext.Provider value={{ ...auth, login, logout, isAuthenticated: !!auth.token }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("useAuth deve essere usato dentro AuthProvider");
  return ctx;
}
