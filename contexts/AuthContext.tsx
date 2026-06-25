import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
        return window.localStorage.getItem('isAdminAuthenticated') === 'true';
    } catch {
        return false;
    }
  });

  useEffect(() => {
    try {
        window.localStorage.setItem('isAdminAuthenticated', String(isAuthenticated));
    } catch (error) {
        console.error("Failed to update localStorage", error);
    }
  }, [isAuthenticated]);

  const login = (email: string, password: string) => {
    if (email.toLowerCase() === 'tygachamps@gmail.com' && password === 'TYGA@Pro') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};