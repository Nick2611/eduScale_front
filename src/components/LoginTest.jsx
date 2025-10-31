// src/components/LoginTest.jsx
import React, { useState } from 'react';

const LoginTest = () => {
  const [testResults, setTestResults] = useState([]);

  const addResult = (message, type = 'info') => {
    setTestResults(prev => [...prev, { 
      message, 
      type, 
      timestamp: new Date().toLocaleTimeString() 
    }]);
  };

  const testCognitoUrls = () => {
    addResult('🧪 Iniciando test de URLs de Cognito...', 'info');
    
    const domain = 'eduscale.auth.us-east-1.amazoncognito.com';
    const clientId = '2lrf45k9iseeoa7umn702b4v7o';
    const redirectUri = `${window.location.origin}/`;
    
    // Test 1: URL básica
    const basicUrl = `https://${domain}/oauth2/authorize?client_id=${clientId}&response_type=code&scope=openid+email+profile&redirect_uri=${encodeURIComponent(redirectUri)}`;
    addResult(`📋 URL generada: ${basicUrl}`, 'info');
    
    // Test 2: Verificar componentes
    addResult(`🔧 Domain: ${domain}`, 'info');
    addResult(`🔧 Client ID: ${clientId}`, 'info');
    addResult(`🔧 Redirect URI: ${redirectUri}`, 'info');
    addResult(`🔧 Current Origin: ${window.location.origin}`, 'info');
    
    // Test 3: Intentar acceso directo
    addResult('🚀 Redirigiendo a Cognito en 3 segundos...', 'warning');
    setTimeout(() => {
      window.location.assign(basicUrl);
    }, 3000);
  };

  const testAmplifyConfig = async () => {
    addResult('🔧 Testeando configuración de Amplify...', 'info');
    
    try {
      const { fetchAuthSession } = await import('aws-amplify/auth');
      const session = await fetchAuthSession();
      
      addResult(`✅ Amplify configurado correctamente`, 'success');
      addResult(`📋 Session keys: ${Object.keys(session).join(', ')}`, 'info');
      
      if (session.tokens) {
        addResult(`🎫 Tokens presentes: ${Object.keys(session.tokens).join(', ')}`, 'info');
      } else {
        addResult(`❌ No hay tokens en la sesión`, 'error');
      }
    } catch (error) {
      addResult(`❌ Error con Amplify: ${error.message}`, 'error');
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'white',
      border: '2px solid #ccc',
      borderRadius: '8px',
      padding: '20px',
      maxWidth: '600px',
      maxHeight: '400px',
      overflow: 'auto',
      zIndex: 10000,
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
    }}>
      <h3>🔍 Login Debug Test</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <button onClick={testCognitoUrls} style={{ marginRight: '10px', padding: '8px 12px' }}>
          🚀 Test Cognito Login
        </button>
        <button onClick={testAmplifyConfig} style={{ marginRight: '10px', padding: '8px 12px' }}>
          🔧 Test Amplify Config
        </button>
        <button onClick={clearResults} style={{ padding: '8px 12px' }}>
          🧹 Clear
        </button>
      </div>
      
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '10px',
        maxHeight: '200px',
        overflow: 'auto',
        backgroundColor: '#f9f9f9'
      }}>
        {testResults.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            Haz clic en "Test Cognito Login" para probar el login
          </p>
        ) : (
          testResults.map((result, index) => (
            <div key={index} style={{
              marginBottom: '5px',
              padding: '4px 8px',
              borderRadius: '3px',
              fontSize: '12px',
              fontFamily: 'monospace',
              backgroundColor: 
                result.type === 'success' ? '#d4edda' :
                result.type === 'error' ? '#f8d7da' :
                result.type === 'warning' ? '#fff3cd' : '#d1ecf1',
              color:
                result.type === 'success' ? '#155724' :
                result.type === 'error' ? '#721c24' :
                result.type === 'warning' ? '#856404' : '#0c5460'
            }}>
              <span style={{ color: '#666' }}>[{result.timestamp}]</span> {result.message}
            </div>
          ))
        )}
      </div>
      
      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        <strong>Nota:</strong> Este componente es solo para debugging. 
        Si el login funciona, elimínalo después.
      </div>
    </div>
  );
};

export default LoginTest;
