import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  // Redirigir automáticamente al Hosted UI al entrar a /login
  useEffect(() => {
    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener la página de donde venía el usuario para redirigir después del login
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Con Cognito Hosted UI, redirigimos directamente al login federado
      await login();
      // No necesitamos navigate aquí porque Auth.federatedSignIn() redirige automáticamente
    } catch (err) {
      setError('Error al iniciar sesión. Intenta nuevamente.');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      
      <main className="login-main">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <div className="login-icon">🎓</div>
              <h1 className="login-title">Iniciar Sesión</h1>
              <p className="login-subtitle">
                Accede a tu cuenta para gestionar tus postulaciones
              </p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Tu contraseña"
                  autoComplete="current-password"
                />
              </div>

              <button 
                type="submit" 
                className="login-btn"
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>
            </form>

            <div className="login-footer">
              <p>¿No tenés cuenta? <Link to="/registro" className="register-link">Crear cuenta</Link></p>
              <Link to="/recuperar-password" className="forgot-link">¿Olvidaste tu contraseña?</Link>
            </div>

            <div className="demo-credentials">
              <h3>Credenciales de demostración:</h3>
              <p><strong>Email:</strong> usuario@example.com</p>
              <p><strong>Contraseña:</strong> password</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
