// src/context/AuthContext.jsx
import React, { createContext, useContext } from 'react';
import { useAuth as useAuthHook } from '../lib/useAuth';

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const base = useAuthHook();
  
  // Crear el perfil del usuario basado en los atributos
  const profile = base?.user?.attributes
    ? {
        name: base.user.attributes.name || 
              base.user.attributes.given_name || 
              base.user.attributes.preferred_username || 
              '',
        email: base.user.attributes.email || ''
      }
    : null;
  
  // El usuario está autenticado si tenemos tanto el token como el usuario
  const isAuthenticated = !!(base?.idToken && base?.user);
  
  const value = { 
    ...base, 
    profile, 
    isAuthenticated
  };
  
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}