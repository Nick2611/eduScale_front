// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoSvg from '../assets/eduscale-logo.svg';
import './Navbar.css';

const Navbar = () => {
  const { user, profile, logout, isAuthenticated, login, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logoSvg} alt="EduScale Logo" className="logo-icon" />
          <span className="logo-text">
            EduScale <span className="logo-subtitle">– Ministerio de Educación</span>
          </span>
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Catálogo</Link>
          <Link to="/ayuda" className="navbar-link">Ayuda</Link>

          {loading ? (
            <div className="login-btn" style={{ opacity: 0.7 }}>
              Cargando...
            </div>
          ) : isAuthenticated && (user || profile) ? (
            <UserMenu user={user} profile={profile} onLogout={handleLogout} />
          ) : (
            <button onClick={login} className="login-btn">
              Ingresar
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

function UserMenu({ user, profile, onLogout }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onDocClick = (e) => {
      if (!e.target.closest('.user-menu')) setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const displayName =
    profile?.name ||
    user?.signInDetails?.loginId ||
    user?.username ||
    profile?.email ||
    '';

  const displayEmail = profile?.email || '';

  return (
    <div className="user-menu">
      <button
        className="user-avatar"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        title={displayEmail}
      >
        <span className="user-initials">👤</span>
      </button>

      <div className={`user-dropdown ${open ? 'open' : ''}`} role="menu">
        <div className="user-info">
          <div className="user-info-name">{displayName}</div>
          <div className="user-info-email">{displayEmail}</div>
        </div>

        <Link to="/mi-estado" className="user-dropdown-item" role="menuitem">
          Ver estado de mis solicitudes
        </Link>

        <button className="user-dropdown-item" onClick={onLogout} role="menuitem">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Navbar;