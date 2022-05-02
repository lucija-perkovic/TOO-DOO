import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  token: '',
  userId: '',
  login: (token: string, userId: string, expirationDate?: Date) => {},
  logout: () => {}
});
