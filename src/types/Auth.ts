//  LOGIN INTERFACES
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

// AUTH INTERFACES
export interface AuthState {
  token: string | null;
  username: string | null;
}

export interface AuthContextValue extends AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
