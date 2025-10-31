// src/components/TenantInstitutionCard.jsx
import React from 'react';
import useTenantConfig from '../hooks/useTenantConfig';
import './TenantInstitutionCard.css';

const TenantInstitutionCard = ({ institution, onViewMore }) => {
  const { tenantConfig, loading, error, hasConfig } = useTenantConfig(institution.tenant_id);

  const cardStyle = hasConfig && tenantConfig?.theme ? {
    backgroundColor: tenantConfig.theme.surface || tenantConfig.theme.background,
    borderRadius: `${tenantConfig.theme.cardRadius || 16}px`,
    boxShadow: tenantConfig.theme.cardShadow || '0 4px 16px rgba(0,0,0,.08)',
    color: tenantConfig.theme.textColor
  } : {};

  const primaryButtonStyle = hasConfig && tenantConfig?.theme ? {
    backgroundColor: tenantConfig.theme.primaryColor,
    borderRadius: `${tenantConfig.theme.buttonRadius || 10}px`,
    fontFamily: tenantConfig.theme.fontFamily
  } : {};

  const secondaryButtonStyle = hasConfig && tenantConfig?.theme ? {
    backgroundColor: tenantConfig.theme.secondaryColor,
    borderRadius: `${tenantConfig.theme.buttonRadius || 10}px`,
    fontFamily: tenantConfig.theme.fontFamily,
    color: tenantConfig.theme.textColor
  } : {};

  if (loading) {
    return (
      <div className="tenant-institution-card loading" style={cardStyle}>
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Cargando configuración personalizada...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tenant-institution-card" style={cardStyle}>
      <div className="card-header">
        <div className="institution-logo">
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
            🎓
          </span>
        </div>
        <div className="institution-info" style={{ fontFamily: tenantConfig?.theme?.fontFamily }}>
          <h3 className="institution-name" style={{ color: tenantConfig?.theme?.textColor }}>
            {institution.nombre}
          </h3>
          <div className="institution-location" style={{ color: tenantConfig?.theme?.textColor }}>
            📍 {institution.ciudad}, {institution.provincia}
          </div>
          {hasConfig && tenantConfig?.domain && (
            <div className="tenant-domain" style={{ color: tenantConfig?.theme?.accent }}>
              🌐 {tenantConfig.domain}
            </div>
          )}
        </div>
      </div>

      <div className="institution-tags">
        <span 
          className="tag level-tag" 
          style={{ 
            backgroundColor: tenantConfig?.theme?.accent,
            color: tenantConfig?.theme?.background 
          }}
        >
          {institution.nivel}
        </span>
        <span 
          className="tag type-tag"
          style={{ 
            backgroundColor: tenantConfig?.theme?.primaryColor,
            color: tenantConfig?.theme?.background 
          }}
        >
          {institution.tipo}
        </span>
        {institution.becas && (
          <span 
            className="tag scholarship-tag"
            style={{ 
              backgroundColor: tenantConfig?.theme?.accent,
              color: tenantConfig?.theme?.background 
            }}
          >
            Becas
          </span>
        )}
      </div>

      <p className="institution-description" style={{ 
        color: tenantConfig?.theme?.textColor,
        fontFamily: tenantConfig?.theme?.fontFamily 
      }}>
        {institution.descripcion}
      </p>



      <div className="card-actions">
        <button 
          className="btn-secondary"
          style={secondaryButtonStyle}
          onClick={() => onViewMore && onViewMore(institution)}
        >
          Ver más
        </button>
        <button 
          className="btn-primary"
          style={primaryButtonStyle}
        >
          Postular
        </button>
      </div>

      {error && (
        <div className="tenant-error" style={{ color: '#ef4444', fontSize: '0.875rem' }}>
          ⚠️ Error al cargar configuración: {error}
        </div>
      )}
    </div>
  );
};

export default TenantInstitutionCard;
