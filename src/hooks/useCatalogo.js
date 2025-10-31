// src/hooks/useCatalogo.js
import { useState, useEffect, useCallback } from 'react';
import { getCatalogo, getInstitucionById, getTenantConfig } from '../api/catalogoService';

const useCatalogo = () => {
  const [catalogoState, setCatalogoState] = useState({
    data: [],
    loading: true,
    error: null,
    lastFetch: null
  });
  const [institucionesFiltradas, setInstitucionesFiltradas] = useState([]);

  // Función para cargar el catálogo
  const fetchCatalogo = useCallback(async (forceRefresh = false) => {
    // Si ya tenemos datos y no es refresh forzado, no hacer petición
    if (!forceRefresh && catalogoState.data.length > 0 && !catalogoState.loading) {
      return;
    }

    setCatalogoState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));

    try {
      const result = await getCatalogo(); // Sin token, no necesita autenticación
      
      if (result.success) {
        const instituciones = result.data || [];
        setCatalogoState({
          data: instituciones,
          loading: false,
          error: null,
          lastFetch: new Date()
        });
        setInstitucionesFiltradas(instituciones);
      } else {
        setCatalogoState({
          data: [],
          loading: false,
          error: result.error,
          lastFetch: new Date()
        });
        setInstitucionesFiltradas([]);
      }
    } catch (error) {
      setCatalogoState({
        data: [],
        loading: false,
        error: {
          message: 'Error inesperado al cargar el catálogo',
          status: 500
        },
        lastFetch: new Date()
      });
      setInstitucionesFiltradas([]);
    }
  }, [catalogoState.data.length, catalogoState.loading]);

  // Función para obtener una institución específica
  const fetchInstitucionById = useCallback(async (institutionId) => {
    if (!institutionId) return null;

    try {
      const result = await getInstitucionById(institutionId); // Sin token
      return result;
    } catch (error) {
      console.error('Error al obtener institución:', error);
      return {
        success: false,
        data: null,
        error: { message: 'Error al cargar la institución' }
      };
    }
  }, []);

  // Función para refrescar el catálogo
  const refreshCatalogo = useCallback(() => {
    fetchCatalogo(true);
  }, [fetchCatalogo]);

  // Función para filtrar instituciones
  const filtrarInstituciones = useCallback((filtros = {}) => {
    if (!catalogoState.data || catalogoState.data.length === 0) {
      setInstitucionesFiltradas([]);
      return;
    }

    let filtradas = [...catalogoState.data];

    // Filtro por provincia
    if (filtros.provincia) {
      filtradas = filtradas.filter(inst => 
        inst.provincia?.toLowerCase().includes(filtros.provincia.toLowerCase())
      );
    }

    // Filtro por nivel
    if (filtros.nivel) {
      filtradas = filtradas.filter(inst => 
        inst.nivel?.toLowerCase().includes(filtros.nivel.toLowerCase())
      );
    }

    // Filtro por tipo de institución
    if (filtros.tipo) {
      filtradas = filtradas.filter(inst => 
        inst.tipo?.toLowerCase().includes(filtros.tipo.toLowerCase())
      );
    }

    // Filtro por carrera
    if (filtros.carrera) {
      filtradas = filtradas.filter(inst => 
        inst.carreras?.some(carrera => 
          carrera.toLowerCase().includes(filtros.carrera.toLowerCase())
        )
      );
    }

    // Filtro por becas
    if (filtros.becas) {
      filtradas = filtradas.filter(inst => inst.becas === true);
    }

    setInstitucionesFiltradas(filtradas);
  }, [catalogoState.data]);

  // Cargar catálogo al montar el componente
  useEffect(() => {
    fetchCatalogo();
  }, [fetchCatalogo]);

  return {
    // Estado
    instituciones: catalogoState.data,
    institucionesFiltradas,
    cargando: catalogoState.loading,
    error: catalogoState.error?.message || null,
    lastFetch: catalogoState.lastFetch,
    
    // Funciones
    refrescarCatalogo: refreshCatalogo,
    fetchInstitucionById,
    filtrarInstituciones,
    
    // Información adicional
    isEmpty: catalogoState.data.length === 0 && !catalogoState.loading,
    hasError: !!catalogoState.error
  };
};

// Exportación por defecto
export default useCatalogo;
