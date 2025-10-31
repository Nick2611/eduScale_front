import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useTenantConfig from '../hooks/useTenantConfig';
import './ModalInstitutionInfo.css';

const ModalInstitutionInfo = ({ institution, isOpen, onClose }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { tenantConfig, loading, hasConfig } = useTenantConfig(institution?.tenant_id);

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

  // Estilos dinámicos basados en la configuración del tenant
  const modalStyle = hasConfig && tenantConfig?.theme ? {
    backgroundColor: tenantConfig.theme.background || '#ffffff',
    color: tenantConfig.theme.textColor || '#1f2937',
    fontFamily: tenantConfig.theme.fontFamily || 'Inter, system-ui, sans-serif'
  } : {};

  const primaryButtonStyle = hasConfig && tenantConfig?.theme ? {
    backgroundColor: tenantConfig.theme.primaryColor,
    borderRadius: `${tenantConfig.theme.buttonRadius || 8}px`
  } : {};

  const secondaryButtonStyle = hasConfig && tenantConfig?.theme ? {
    backgroundColor: tenantConfig.theme.surface || '#f9fafb',
    borderRadius: `${tenantConfig.theme.buttonRadius || 8}px`,
    color: tenantConfig.theme.textColor
  } : {};

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" style={modalStyle}>
        <button 
          className="modal-close" 
          onClick={onClose}
          style={{ color: tenantConfig?.theme?.textColor }}
        >
          ✕
        </button>
        
        <div className="modal-header">
          <div className="modal-logo">
            {hasConfig && tenantConfig?.theme?.logoUrl ? (
              <img 
                src={tenantConfig.theme.logoUrl} 
                alt={`${institution.nombre} logo`}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
            ) : null}
            <span className="logo-fallback" style={{ display: hasConfig && tenantConfig?.theme?.logoUrl ? 'none' : 'block' }}>
              {institution.logo || '🎓'}
            </span>
          </div>
          <div className="modal-title-section">
            <h2 className="modal-title" style={{ color: tenantConfig?.theme?.textColor }}>
              {institution.nombre}
            </h2>
            <div className="modal-subtitle" style={{ color: tenantConfig?.theme?.textColor }}>
              {institution.shortName && `(${institution.shortName})`}
            </div>
            <div className="modal-location" style={{ color: tenantConfig?.theme?.textColor }}>
              📍 {institution.ciudad}, {institution.provincia}
            </div>
            {hasConfig && tenantConfig?.domain && (
              <div className="modal-domain" style={{ color: tenantConfig?.theme?.accent }}>
                🌐 {tenantConfig.domain}
              </div>
            )}
          </div>
        </div>

        <div className="modal-tags">
          <span 
            className="tag level-tag"
            style={{ 
              backgroundColor: tenantConfig?.theme?.accent || '#16a34a',
              color: tenantConfig?.theme?.background || '#ffffff'
            }}
          >
            {institution.nivel}
          </span>
          <span 
            className="tag type-tag"
            style={{ 
              backgroundColor: tenantConfig?.theme?.primaryColor || '#3b82f6',
              color: tenantConfig?.theme?.background || '#ffffff'
            }}
          >
            {institution.tipo}
          </span>
          {institution.becas && (
            <span 
              className="tag scholarship-tag"
              style={{ 
                backgroundColor: tenantConfig?.theme?.accent || '#f59e0b',
                color: tenantConfig?.theme?.background || '#ffffff'
              }}
            >
              Becas Disponibles
            </span>
          )}
          {institution.popularity && (
            <span 
              className="tag popularity-tag"
              style={{ 
                backgroundColor: tenantConfig?.theme?.secondaryColor || '#e5e7eb',
                color: tenantConfig?.theme?.textColor || '#374151'
              }}
            >
              👥 {institution.popularity} interesados
            </span>
          )}
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3 style={{ color: tenantConfig?.theme?.primaryColor }}>Descripción</h3>
            <p style={{ color: tenantConfig?.theme?.textColor }}>
              {institution.descripcion || `${institution.nombre} es una institución educativa de excelencia académica ubicada en ${institution.ciudad}, ${institution.provincia}.`}
            </p>
          </div>

          {institution.carreras && institution.carreras.length > 0 && (
            <div className="modal-section">
              <h3 style={{ color: tenantConfig?.theme?.primaryColor }}>Carreras Disponibles</h3>
              <div className="carreras-grid">
                {institution.carreras.map((carrera, index) => (
                  <div 
                    key={index} 
                    className="carrera-item"
                    style={{
                      backgroundColor: tenantConfig?.theme?.surface || '#f8fafc',
                      color: tenantConfig?.theme?.textColor,
                      border: `1px solid ${tenantConfig?.theme?.primaryColor}20`
                    }}
                  >
                    {carrera}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="modal-section">
            <h3 style={{ color: tenantConfig?.theme?.primaryColor }}>Información de Contacto</h3>
            <div className="contact-info">
              <div className="contact-item" style={{ color: tenantConfig?.theme?.textColor }}>
                <strong>Email:</strong> {institution.email || 'info@' + (tenantConfig?.domain || 'institucion.edu.ar')}
              </div>
              <div className="contact-item" style={{ color: tenantConfig?.theme?.textColor }}>
                <strong>Dirección:</strong> {institution.direccion || `${institution.ciudad}, ${institution.provincia}`}
              </div>
              {tenantConfig?.domain && (
                <div className="contact-item" style={{ color: tenantConfig?.theme?.textColor }}>
                  <strong>Sitio Web:</strong> 
                  <a 
                    href={`https://${tenantConfig.domain}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: tenantConfig?.theme?.primaryColor }}
                  >
                    {tenantConfig.domain}
                  </a>
                </div>
              )}
            </div>
          </div>

          {hasConfig && (
            <div className="modal-section">
              <h3 style={{ color: tenantConfig?.theme?.primaryColor }}>🎨 Campus Personalizado</h3>
              <div 
                className="tenant-info-modal"
                style={{
                  backgroundColor: tenantConfig?.theme?.surface || '#f8fafc',
                  border: `1px solid ${tenantConfig?.theme?.primaryColor}20`,
                  borderRadius: `${tenantConfig?.theme?.cardRadius / 2 || 8}px`
                }}
              >
                <p style={{ color: tenantConfig?.theme?.textColor }}>
                  Esta institución cuenta con un campus virtual personalizado con su propia identidad y experiencia de usuario única.
                </p>
                <div className="tenant-features">
                  <span>✨ Tema personalizado</span>
                  <span>🏠 Dominio propio</span>
                  <span>🎯 Experiencia adaptada</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button 
            className="btn-secondary" 
            onClick={onClose}
            style={secondaryButtonStyle}
          >
            Cerrar
          </button>
          <button 
            className="btn-primary" 
            onClick={handlePostular}
            style={primaryButtonStyle}
          >
            Iniciar Postulación
          </button>
        </div>

        {loading && (
          <div className="modal-loading" style={{ color: tenantConfig?.theme?.textColor }}>
            Cargando configuración personalizada...
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalInstitutionInfo;
