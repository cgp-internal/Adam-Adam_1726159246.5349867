import { useState, createContext, useContext } from 'react';
import axios from 'axios';
import { authenticate, registerUser } from '../api/auth';

interface AuthState {
  token: string | null;
  userId: number | null;
  isLoggedIn: boolean;
}

interface AuthContextType {
  state: AuthState;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  isLoggedIn: false,
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthStore = () => {
  const [state, setState] = useState<AuthState>(initialState);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('/api/authenticate', { username, password });
      const token = response.data.token;
      setState({ token, userId: response.data.userId, isLoggedIn: true });
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await axios.post('/api/register', { username, email, password });
      login(username, password);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setState(initialState);
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthStore provider');
  }
  return context;
};

export { AuthStore, useAuth };