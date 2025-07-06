'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext<any>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {

      const userData = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };




  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    
    // Создаем нового пользователя
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name
    };

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const userData = { id: newUser.id, email: newUser.email, name: newUser.name };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    setLoading(false);
    return true;
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 