import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">
            EduScale <span className="logo-subtitle">– Ministerio de Educación</span>
          </span>
        </Link>
        
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">
            Catálogo
          </Link>
          
          {isAuthenticated && (
            <Link to="/mi-estado" className="navbar-link">
              Mi Estado
            </Link>
          )}
          
          <Link to="/ayuda" className="navbar-link">
            Ayuda
          </Link>
          
          {isAuthenticated ? (
            <div className="navbar-user">
              <span className="user-name">
                {user.nombre} {user.apellido}
              </span>
              <button onClick={handleLogout} className="logout-btn">
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              Ingresar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
