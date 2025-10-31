// src/hooks/useTenantConfig.js
import { useState, useEffect, useCallback } from 'react';
import { getTenantConfig } from '../api/catalogoService';

const useTenantConfig = (institutionId) => {
  const [tenantConfig, setTenantConfig] = useState({
    data: null,
    loading: false,
    error: null,
    lastFetch: null
  });

  // Función para cargar la configuración del tenant
  const fetchTenantConfig = useCallback(async (forceRefresh = false) => {
    if (!institutionId) {
      setTenantConfig({
        data: null,
        loading: false,
        error: null,
        lastFetch: null
      });
      return;
    }

    // Si ya tenemos datos y no es refresh forzado, no hacer petición
    if (!forceRefresh && tenantConfig.data && !tenantConfig.loading) {
      return;
    }

    setTenantConfig(prev => ({
      ...prev,
      loading: true,
      error: null
    }));

    try {
      const result = await getTenantConfig(institutionId);
      
      if (result.success) {
        setTenantConfig({
          data: result.data,
          loading: false,
          error: null,
          lastFetch: new Date()
        });
      } else {
        setTenantConfig({
          data: null,
          loading: false,
          error: result.error,
          lastFetch: new Date()
        });
      }
    } catch (error) {
      setTenantConfig({
        data: null,
        loading: false,
        error: {
          message: 'Error inesperado al cargar configuración del tenant',
          status: 500
        },
        lastFetch: new Date()
      });
    }
  }, [institutionId, tenantConfig.data, tenantConfig.loading]);

  // Función para refrescar la configuración
  const refreshTenantConfig = useCallback(() => {
    fetchTenantConfig(true);
  }, [fetchTenantConfig]);

  // Cargar configuración cuando cambie el institutionId
  useEffect(() => {
    fetchTenantConfig();
  }, [fetchTenantConfig]);

  return {
    // Estado
    tenantConfig: tenantConfig.data,
    loading: tenantConfig.loading,
    error: tenantConfig.error?.message || null,
    lastFetch: tenantConfig.lastFetch,
    
    // Funciones
    refreshTenantConfig,
    
    // Información adicional
    hasConfig: !!tenantConfig.data,
    hasError: !!tenantConfig.error
  };
};

export default useTenantConfig;
