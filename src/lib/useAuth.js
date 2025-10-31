import { useEffect, useState, useCallback } from 'react';
import { fetchAuthSession, signInWithRedirect } from 'aws-amplify/auth';
import { getCurrentUser, fetchUserAttributes, signOut } from 'aws-amplify/auth/cognito';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  // Función para limpiar el estado de autenticación
  const clearAuthState = useCallback(() => {
    setUser(null);
    setIdToken(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  const checkAuthStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Limpiar parámetros OAuth de la URL
      const urlParams = new URLSearchParams(window.location.search);
      const hasOAuthParams = urlParams.get('code') || urlParams.get('state') || urlParams.get('error');
      
      if (hasOAuthParams) {
        window.history.replaceState({}, document.title, window.location.pathname);
        if (urlParams.get('error')) {
          setError('Error en autenticación');
          clearAuthState();
          return;
        }
        // Esperar procesamiento de OAuth
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      // Obtener sesión
      const session = await fetchAuthSession({ forceRefresh: hasOAuthParams });
      
      if (!session?.tokens?.idToken) {
        clearAuthState();
        return;
      }
      
      const idTokenString = session.tokens.idToken.toString();
      setIdToken(idTokenString);
      
      // Obtener datos del usuario
      try {
        const currentUser = await getCurrentUser();
        const userAttributes = await fetchUserAttributes();
        
        setUser({
          username: currentUser.username,
          userId: currentUser.userId,
          signInDetails: currentUser.signInDetails,
          attributes: userAttributes
        });
        setIsAuthenticated(true);
      } catch (userError) {
        // Fallback usando token
        try {
          const tokenPayload = JSON.parse(atob(idTokenString.split('.')[1]));
          setUser({
            username: tokenPayload.email || tokenPayload['cognito:username'] || 'usuario',
            attributes: {
              email: tokenPayload.email,
              sub: tokenPayload.sub,
              name: tokenPayload.name || tokenPayload.given_name
            }
          });
          setIsAuthenticated(true);
        } catch (fallbackError) {
          clearAuthState();
        }
      }
      
    } catch (error) {
      setError(error.message);
      clearAuthState();
    } finally {
      setLoading(false);
    }
  }, [clearAuthState]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithRedirect({ provider: 'COGNITO' });
    } catch (error) {
      setError('Error al iniciar sesión');
      setLoading(false);
    }
  }, []);
  
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await signOut();
      clearAuthState();
    } catch (error) {
      setError(error.message);
      clearAuthState();
    } finally {
      setLoading(false);
    }
  }, [clearAuthState]);
  
  const refreshAuthStatus = useCallback(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return { 
    loading, 
    user, 
    idToken, 
    isAuthenticated, 
    error,
    login, 
    logout, 
    refreshAuthStatus,
    clearAuthState 
  };
}


