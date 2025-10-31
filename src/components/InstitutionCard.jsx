import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TenantInstitutionCard from './TenantInstitutionCard';
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

  // TODAS las instituciones intentarán usar el componente personalizado
  // Si no tienen configuración de tenant, se mostrará el diseño por defecto
  return <TenantInstitutionCard institution={institution} onViewMore={onViewMore} />;
};

export default InstitutionCard;
