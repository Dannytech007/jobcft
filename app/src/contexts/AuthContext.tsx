import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, AuthContextType, AuthState } from '@/types';
import { userDB, sessionDB, initializeDatabase } from '@/data/database';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Initialize database with default data
    initializeDatabase();
    
    // Check for existing session
    const currentUser = sessionDB.getUser();
    if (currentUser) {
      setState({
        user: currentUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const user = userDB.getByEmail(email);
    if (user && user.password === password) {
      if (user.status === 'suspended') {
        alert('Your account has been suspended. Please contact support.');
        return false;
      }
      if (user.status === 'pending') {
        alert('Your account is pending activation. Please complete payment.');
        return false;
      }
      
      sessionDB.setUser(user);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    }
    return false;
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    if (!userData.email || !userData.password || !userData.fullName) {
      return false;
    }

    // Check if email already exists
    const existing = userDB.getByEmail(userData.email);
    if (existing) {
      alert('Email already registered. Please use a different email.');
      return false;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email,
      password: userData.password,
      fullName: userData.fullName,
      phone: userData.phone || '',
      role: 'user',
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    userDB.create(newUser);
    return true;
  };

  const logout = () => {
    sessionDB.setUser(null);
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateUser = (userData: Partial<User>) => {
    if (state.user) {
      const updated = userDB.update(state.user.id, {
        ...userData,
        updatedAt: new Date().toISOString(),
      });
      if (updated) {
        sessionDB.setUser(updated);
        setState(prev => ({
          ...prev,
          user: updated,
        }));
      }
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, updateUser }}>
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
