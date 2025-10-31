import React from 'react';
import { useAuth } from '../lib/useAuth';

export default function AuthButtons() {
  const { loading, user, login, logout } = useAuth();
  if (loading) return null;
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      {user ? (
        <>
          <span>Hola, {user?.attributes?.email || 'Usuario'}</span>
          <button onClick={logout}>Salir</button>
        </>
      ) : (
        <button onClick={login}>Ingresar</button>
      )}
    </div>
  );
}


