import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Catalogo from './pages/Catalogo';
import Postulacion from './pages/Postulacion';
import MiEstado from './pages/MiEstado';
import Dashboard from './pages/Dashboard';
import './App.css';

// Componente para proteger rutas que requieren autenticación
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user, idToken } = useAuth();
  
  console.log('🛡️ ProtectedRoute - Estado:', { 
    isAuthenticated, 
    loading, 
    hasUser: !!user, 
    hasToken: !!idToken 
  });
  
  // Si está cargando, esperar un poco antes de redirigir
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Verificando autenticación...</p>
        </div>
      </div>
    );
  }
  
  // Verificar tanto isAuthenticated como la presencia de token/usuario
  const hasValidAuth = isAuthenticated && (user || idToken);
  
  if (!hasValidAuth) {
    console.log('🚫 Acceso denegado - redirigiendo a home');
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Componente de página de ayuda básica
const AyudaPage = () => (
  <div style={{ paddingTop: '70px', padding: '100px 20px', textAlign: 'center' }}>
    <h1>Página de Ayuda</h1>
    <p>Aquí encontrarás información de ayuda y soporte.</p>
    <p>Esta es una página de demostración.</p>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <OAuthHandler />
        <GlobalAuthGate>
          <div className="App">
            <Routes>
            <Route path="/" element={<Catalogo />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ayuda" element={<AyudaPage />} />
            <Route 
              path="/postulacion" 
              element={
                <ProtectedRoute>
                  <Postulacion />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/mi-estado" 
              element={
                <ProtectedRoute>
                  <MiEstado />
                </ProtectedRoute>
              } 
            />
            {/* Ruta catch-all para redirigir a home */}
            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </GlobalAuthGate>
      </AuthProvider>
    </Router>
  );
}

function OAuthHandler() {
  return null;
}

function GlobalAuthGate({ children }) {
  return children;
}

export default App;
