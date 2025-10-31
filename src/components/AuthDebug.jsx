// src/components/AuthDebug.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const AuthDebug = () => {
  const auth = useAuth();
  
  const debugInfo = {
    loading: auth?.loading,
    isAuthenticated: auth?.isAuthenticated,
    hasUser: !!auth?.user,
    hasProfile: !!auth?.profile,
    hasToken: !!auth?.idToken,
    error: auth?.error,
    userEmail: auth?.profile?.email || auth?.user?.attributes?.email,
    userName: auth?.profile?.name || auth?.user?.username,
    debug: auth?._debug
  };

  const handleRefresh = () => {
    if (auth?.refreshAuth) {
      console.log('🔄 Refrescando autenticación manualmente...');
      auth.refreshAuth();
    }
  };

  const handleTestSession = async () => {
    try {
      console.log('🧪 Testeando sesión directamente...');
      const { fetchAuthSession } = await import('aws-amplify/auth');
      const session = await fetchAuthSession({ forceRefresh: true });
      console.log('📋 Resultado del test:', {
        hasSession: !!session,
        hasTokens: !!session?.tokens,
        hasIdToken: !!session?.tokens?.idToken,
        tokens: session?.tokens
      });
    } catch (error) {
      console.error('❌ Error en test de sesión:', error);
    }
  };

  const handleClear = () => {
    if (auth?.clearAuthState) {
      console.log('🧹 Limpiando estado de autenticación...');
      auth.clearAuthState();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      background: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px',
      fontFamily: 'monospace'
    }}>
      <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
        🔍 Debug Auth State
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        {Object.entries(debugInfo).map(([key, value]) => (
          <div key={key} style={{ marginBottom: '2px' }}>
            <span style={{ color: '#ffd700' }}>{key}:</span>{' '}
            <span style={{ color: typeof value === 'boolean' ? (value ? '#90EE90' : '#FFB6C1') : '#87CEEB' }}>
              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
            </span>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
        <button 
          onClick={handleRefresh}
          style={{
            background: '#4CAF50',
            border: 'none',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '10px',
            cursor: 'pointer'
          }}
        >
          🔄 Refresh
        </button>
        
        <button 
          onClick={handleClear}
          style={{
            background: '#f44336',
            border: 'none',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '10px',
            cursor: 'pointer'
          }}
        >
          🧹 Clear
        </button>
        
        <button 
          onClick={() => console.log('🔍 Estado completo:', auth)}
          style={{
            background: '#2196F3',
            border: 'none',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '10px',
            cursor: 'pointer'
          }}
        >
          📝 Log
        </button>
        
        <button 
          onClick={handleTestSession}
          style={{
            background: '#9C27B0',
            border: 'none',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '10px',
            cursor: 'pointer'
          }}
        >
          🧪 Test
        </button>
      </div>
      
      {/* URL Info */}
      <div style={{ marginTop: '8px', fontSize: '10px', color: '#ddd' }}>
        URL: {window.location.href.length > 50 ? 
          window.location.href.substring(0, 50) + '...' : 
          window.location.href}
      </div>
      
      {/* Helper Info */}
      <div style={{ marginTop: '8px', fontSize: '10px', color: '#ffd700' }}>
        💡 Presiona Ctrl+L para abrir Login Test
      </div>
    </div>
  );
};

export default AuthDebug;
