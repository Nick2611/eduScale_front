import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un token almacenado al cargar la aplicación
    const token = localStorage.getItem('eduscale_token');
    const userData = localStorage.getItem('eduscale_user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('eduscale_token');
        localStorage.removeItem('eduscale_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulación de autenticación
    if (email === 'usuario@example.com' && password === 'password') {
      const mockUser = {
        id: 1,
        email: 'usuario@example.com',
        nombre: 'Juan',
        apellido: 'Pérez'
      };
      
      const mockToken = 'mock-jwt-token-12345';
      
      localStorage.setItem('eduscale_token', mockToken);
      localStorage.setItem('eduscale_user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { success: true };
    } else {
      return { success: false, error: 'Credenciales inválidas' };
    }
  };

  const logout = () => {
    localStorage.removeItem('eduscale_token');
    localStorage.removeItem('eduscale_user');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
