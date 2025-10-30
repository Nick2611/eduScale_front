import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ModalInstitutionInfo.css';

const ModalInstitutionInfo = ({ institution, isOpen, onClose }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isOpen || !institution) return null;

  const handlePostular = () => {
    if (isAuthenticated) {
      navigate('/postulacion', { state: { institution } });
    } else {
      navigate('/login');
    }
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        
        <div className="modal-header">
          <div className="modal-logo">
            {institution.logo}
          </div>
          <div className="modal-title-section">
            <h2 className="modal-title">{institution.nombre}</h2>
            <div className="modal-location">
              📍 {institution.ciudad}, {institution.provincia}
            </div>
          </div>
        </div>

        <div className="modal-tags">
          <span className="tag level-tag">{institution.nivel}</span>
          <span className="tag type-tag">{institution.tipo}</span>
          {institution.becas && (
            <span className="tag scholarship-tag">Becas Disponibles</span>
          )}
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3>Descripción</h3>
            <p>{institution.descripcionCompleta}</p>
          </div>

          <div className="modal-section">
            <h3>Carreras Disponibles</h3>
            <ul className="carreras-list">
              {institution.carreras.map((carrera, index) => (
                <li key={index}>{carrera}</li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <h3>Información de Contacto</h3>
            <div className="contact-info">
              <div className="contact-item">
                <strong>Email:</strong> {institution.email}
              </div>
              <div className="contact-item">
                <strong>Dirección:</strong> {institution.direccion}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cerrar
          </button>
          <button className="btn-primary" onClick={handlePostular}>
            Iniciar Postulación
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInstitutionInfo;
