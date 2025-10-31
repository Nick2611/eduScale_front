// src/components/TenantTheme.jsx
import React, { useEffect } from 'react';
import useTenantConfig from '../hooks/useTenantConfig';

const TenantTheme = ({ institutionId, children }) => {
  const { tenantConfig, loading, error, hasConfig } = useTenantConfig(institutionId);

  useEffect(() => {
    if (!hasConfig || !tenantConfig?.theme) {
      // Restaurar tema por defecto si no hay configuración
      document.documentElement.style.removeProperty('--primary-color');
      document.documentElement.style.removeProperty('--secondary-color');
      document.documentElement.style.removeProperty('--accent-color');
      document.documentElement.style.removeProperty('--background-color');
      document.documentElement.style.removeProperty('--surface-color');
      document.documentElement.style.removeProperty('--text-color');
      document.documentElement.style.removeProperty('--font-family');
      document.documentElement.style.removeProperty('--button-radius');
      document.documentElement.style.removeProperty('--card-radius');
      document.documentElement.style.removeProperty('--card-shadow');
      return;
    }

    const theme = tenantConfig.theme;
    console.log('🎨 Aplicando tema personalizado:', theme);

    // Aplicar variables CSS personalizadas
    if (theme.primaryColor) {
      document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    }
    if (theme.secondaryColor) {
      document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
    }
    if (theme.accent) {
      document.documentElement.style.setProperty('--accent-color', theme.accent);
    }
    if (theme.background) {
      document.documentElement.style.setProperty('--background-color', theme.background);
    }
    if (theme.surface) {
      document.documentElement.style.setProperty('--surface-color', theme.surface);
    }
    if (theme.textColor) {
      document.documentElement.style.setProperty('--text-color', theme.textColor);
    }
    if (theme.fontFamily) {
      document.documentElement.style.setProperty('--font-family', theme.fontFamily);
    }
    if (theme.buttonRadius) {
      document.documentElement.style.setProperty('--button-radius', `${theme.buttonRadius}px`);
    }
    if (theme.cardRadius) {
      document.documentElement.style.setProperty('--card-radius', `${theme.cardRadius}px`);
    }
    if (theme.cardShadow) {
      document.documentElement.style.setProperty('--card-shadow', theme.cardShadow);
    }

    // Cambiar favicon si está configurado
    if (theme.faviconUrl) {
      const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
      favicon.rel = 'icon';
      favicon.href = theme.faviconUrl;
      if (!document.querySelector('link[rel="icon"]')) {
        document.head.appendChild(favicon);
      }
    }

    // Cambiar título del documento si hay dominio personalizado
    if (tenantConfig.domain) {
      const institutionName = tenantConfig.domain.split('.')[0].toUpperCase();
      document.title = `${institutionName} - EduScale`;
    }

  }, [tenantConfig, hasConfig]);

  if (loading) {
    return (
      <div className="tenant-theme-loading">
        <div>Cargando configuración personalizada...</div>
        {children}
      </div>
    );
  }

  if (error) {
    console.warn('No se pudo cargar la configuración del tenant:', error);
    return children; // Mostrar con tema por defecto
  }

  return (
    <div className="tenant-theme-container" data-tenant={institutionId}>
      {children}
    </div>
  );
};

export default TenantTheme;
