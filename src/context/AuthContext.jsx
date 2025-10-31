import React, { createContext, useContext, useEffect } from 'react';
import { fetchAuthSession, getCurrentUser, signInWithRedirect, signOut } from 'aws-amplify/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [idToken, setIdToken] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Manejar el callback de OAuth después del redirect
  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Verificar si hay un código en la URL (callback de OAuth)
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
        if (code) {
          // Amplify maneja automáticamente el código, solo necesitamos verificar la sesión
          const session = await fetchAuthSession();
          const usr = await getCurrentUser();
          
          setUser(usr);
          setIdToken(session.tokens?.idToken?.toString() || null);
          
          // Limpiar la URL del código
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (error) {
        console.error('Error en callback de autenticación:', error);
      }
    };

    handleAuthCallback();
  }, []);

  // Verificar sesión actual al cargar
  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const session = await fetchAuthSession();
        if (!mounted) return;
        
        setIdToken(session.tokens?.idToken?.toString() || null);
        const usr = await getCurrentUser();
        
        if (!mounted) return;
        setUser(usr);
      } catch (error) {
        // No hay sesión activa
        if (mounted) {
          setUser(null);
          setIdToken(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkSession();

    return () => { mounted = false; };
  }, []);

  const login = async (email, password) => {
    // Si se llama con email/password (desde Login.jsx), usar Hosted UI
    if (email && password) {
      // Redirigir a Hosted UI (no manejamos login directo, solo OAuth)
      await signInWithRedirect({ provider: 'COGNITO' });
      return { success: true };
    } else {
      // Llamada sin parámetros: usar Hosted UI
      await signInWithRedirect({ provider: 'COGNITO' });
      return { success: true };
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setIdToken(null);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const value = {
    user: user ? {
      id: user.attributes?.sub,
      email: user.attributes?.email,
      nombre: user.attributes?.given_name || user.attributes?.name?.split(' ')[0] || '',
      apellido: user.attributes?.family_name || user.attributes?.name?.split(' ').slice(1).join(' ') || '',
      ...user.attributes
    } : null,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    idToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
