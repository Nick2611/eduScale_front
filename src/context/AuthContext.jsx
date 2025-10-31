// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useAuth as useAuthHook } from '../lib/useAuth';

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const base = useAuthHook();
  
  // Crear el perfil del usuario basado en los atributos usando useMemo para evitar re-renders
  const profile = useMemo(() => {
    if (!base?.user?.attributes) return null;
    
    return {
      name: base.user.attributes.name || 
            base.user.attributes.given_name || 
            base.user.attributes.preferred_username ||
            base.user.username ||
            'Usuario',
      email: base.user.attributes.email || '',
      sub: base.user.attributes.sub || '',
      username: base.user.username || ''
    };
  }, [base?.user]);
  
  // Usar el isAuthenticated del hook directamente con validación adicional
  const isAuthenticated = useMemo(() => {
    return !!(base?.isAuthenticated && base?.user && base?.idToken);
  }, [base?.isAuthenticated, base?.user, base?.idToken]);
  
  // Debug simplificado
  useEffect(() => {
    if (!base?.loading && base?.isAuthenticated !== isAuthenticated) {
      console.log('Auth state changed:', { isAuthenticated, hasUser: !!base?.user });
    }
  }, [base?.loading, base?.isAuthenticated, isAuthenticated, base?.user]);
  
  // Función para refrescar autenticación desde el contexto
  const refreshAuth = useMemo(() => base?.refreshAuthStatus, [base?.refreshAuthStatus]);
  
  const value = useMemo(() => ({
    ...base, 
    profile, 
    isAuthenticated,
    refreshAuth
  }), [base, profile, isAuthenticated, refreshAuth]);
  
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}