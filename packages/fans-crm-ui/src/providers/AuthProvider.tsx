import React, { ReactNode, createContext, useContext, useState } from 'react';
import { User, UserLoginResponse } from '../types/user.type';
import axios from 'axios';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthContextType {
  auth: AuthState;
  login: (email: string, password: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const login = async (email: string, password: string) => {
    const { data } = (await axios.post('http://localhost:1488/api/v1/login', {
      email,
      password,
    })) as { data: UserLoginResponse };

    if (data.token && data.user) {
      localStorage.setItem('jwt-token', data.token);
      localStorage.setItem('user-id', String(data.user.id));
      setAuth({ isAuthenticated: true, user: data.user });
    } else {
      alert('Invalid Credentials');
    }
  };

  const setUser = (user: User) => {
    setAuth({ isAuthenticated: true, user });
  };

  const logout = () => {
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('user-id');
    setAuth({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
