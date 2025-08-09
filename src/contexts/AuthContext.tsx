
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'investor' | 'entrepreneur' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Mock authentication functions
  const login = async (email: string, password: string, role: UserRole) => {
    // In a real app, this would be an API call
    console.log(`Logging in with ${email}, ${password}, role: ${role}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login - would normally come from API
    setUser({
      id: '123',
      name: role === 'investor' ? 'John Smith' : 'Sarah Johnson',
      email,
      role,
    });
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    // In a real app, this would be an API call
    console.log(`Registering with ${name}, ${email}, ${password}, role: ${role}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful registration - would normally come from API
    setUser({
      id: '123',
      name,
      email,
      role,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
