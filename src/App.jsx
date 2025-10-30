import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import Postulacion from './pages/Postulacion';
import MiEstado from './pages/MiEstado';
import './App.css';

// Componente para proteger rutas que requieren autenticación
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
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
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Catalogo />} />
            <Route path="/login" element={<Login />} />
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
      </Router>
    </AuthProvider>
  );
}

export default App;
