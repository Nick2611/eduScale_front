// src/context/AuthContext.jsx
import React, { createContext, useContext } from 'react';
import { useAuth as useAuthHook } from '../lib/useAuth';

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const base = useAuthHook();
  const profile = base?.user?.attributes
    ? {
        name: base.user.attributes.name || base.user.attributes.given_name || '',
        email: base.user.attributes.email || ''
      }
    : null;
  const value = { ...base, profile, isAuthenticated: !!base?.idToken };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}