// AuthContext.tsx
import { createContext, useContext } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
