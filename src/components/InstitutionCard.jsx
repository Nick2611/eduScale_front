import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './InstitutionCard.css';

const InstitutionCard = ({ institution, onViewMore }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handlePostular = () => {
    if (isAuthenticated) {
      navigate('/postulacion', { state: { institution } });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="institution-card">
      <div className="card-header">
        <div className="institution-logo">
          {institution.logo}
        </div>
        <div className="institution-info">
          <h3 className="institution-name">{institution.nombre}</h3>
          <div className="institution-location">
            📍 {institution.ciudad}, {institution.provincia}
          </div>
        </div>
      </div>

      <div className="institution-tags">
        <span className="tag level-tag">{institution.nivel}</span>
        <span className="tag type-tag">{institution.tipo}</span>
        {institution.becas && (
          <span className="tag scholarship-tag">Becas</span>
        )}
      </div>

      <p className="institution-description">
        {institution.descripcion}
      </p>

      <div className="card-actions">
        <button 
          className="btn-secondary"
          onClick={() => onViewMore(institution)}
        >
          Ver más
        </button>
        <button 
          className="btn-primary"
          onClick={handlePostular}
        >
          Postular
        </button>
      </div>
    </div>
  );
};

export default InstitutionCard;
