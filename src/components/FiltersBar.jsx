import React, { useState, useEffect } from 'react';
import { catalogoService } from '../api/catalogoService';
import './FiltersBar.css';

const FiltersBar = ({ filters, onFilterChange, onSearch, instituciones = [] }) => {
  const [estados, setEstados] = useState([]);
  const [cargandoEstados, setCargandoEstados] = useState(true);
  const [opcionesFiltros, setOpcionesFiltros] = useState({
    niveles: [],
    tipos: [],
    carreras: [],
    provincias: []
  });

  // Función para limpiar todos los filtros
  const handleClearFilters = () => {
    onFilterChange('provincia', '');
    onFilterChange('nivel', '');
    onFilterChange('tipo', '');
    onFilterChange('carrera', '');
    onFilterChange('becas', false);
    // Ejecutar búsqueda automáticamente después de limpiar
    setTimeout(() => onSearch(), 0);
  };

  // Cargar estados desde la API
  useEffect(() => {
    const cargarEstados = async () => {
      try {
        const result = await catalogoService.getEstados();
        
        if (result.success && result.data) {
          setEstados(Array.isArray(result.data) ? result.data : []);
        } else {
          throw new Error(result.error?.message || 'Error al cargar estados');
        }
      } catch (error) {
        console.error('Error al cargar estados:', error);
        setEstados([]);
      } finally {
        setCargandoEstados(false);
      }
    };

    cargarEstados();
  }, []);

  // Extraer opciones dinámicamente de las instituciones cargadas
  useEffect(() => {
    if (!Array.isArray(instituciones) || instituciones.length === 0) {
      setOpcionesFiltros({
        niveles: [],
        tipos: [],
        carreras: [],
        provincias: []
      });
      return;
    }

    // Extraer valores únicos de cada campo
    const nivelesUnicos = [...new Set(instituciones.map(inst => inst.nivel).filter(Boolean))];
    const tiposUnicos = [...new Set(instituciones.map(inst => inst.tipo).filter(Boolean))];
    const provinciasUnicas = [...new Set(instituciones.map(inst => inst.provincia).filter(Boolean))];
    
    // Extraer carreras de todos los arrays de carreras
    const todasLasCarreras = instituciones
      .flatMap(inst => Array.isArray(inst.carreras) ? inst.carreras : [])
      .filter(Boolean);
    const carrerasUnicas = [...new Set(todasLasCarreras)];

    console.log('🎯 Filtros dinámicos extraídos:', {
      niveles: nivelesUnicos,
      tipos: tiposUnicos,
      provincias: provinciasUnicas,
      carreras: carrerasUnicas
    });

    setOpcionesFiltros({
      niveles: nivelesUnicos,
      tipos: tiposUnicos,
      carreras: carrerasUnicas,
      provincias: provinciasUnicas
    });
  }, [instituciones]);

  return (
    <div className="filters-bar">
      <div className="filters-container">
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="provincia">Provincia</label>
            <select
              id="provincia"
              value={filters.provincia}
              onChange={(e) => onFilterChange('provincia', e.target.value)}
            >
              <option value="">Todas las provincias</option>
              {opcionesFiltros.provincias.map(provincia => (
                <option key={provincia} value={provincia}>
                  {provincia}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="nivel">Nivel Educativo</label>
            <select
              id="nivel"
              value={filters.nivel}
              onChange={(e) => onFilterChange('nivel', e.target.value)}
            >
              <option value="">Todos los niveles</option>
              {opcionesFiltros.niveles.map(nivel => (
                <option key={nivel} value={nivel}>{nivel}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="tipo">Tipo de Institución</label>
            <select
              id="tipo"
              value={filters.tipo}
              onChange={(e) => onFilterChange('tipo', e.target.value)}
            >
              <option value="">Todos los tipos</option>
              {opcionesFiltros.tipos.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="carrera">Carrera</label>
            <select
              id="carrera"
              value={filters.carrera}
              onChange={(e) => onFilterChange('carrera', e.target.value)}
            >
              <option value="">Todas las carreras</option>
              {opcionesFiltros.carreras.map(carrera => (
                <option key={carrera} value={carrera}>{carrera}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="filters-bottom">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="becas"
              checked={filters.becas}
              onChange={(e) => onFilterChange('becas', e.target.checked)}
            />
            <label htmlFor="becas">Solo instituciones con becas disponibles</label>
          </div>

          <div className="filter-actions">
            <button className="clear-filters-btn" onClick={handleClearFilters}>
              🗑️ Limpiar Filtros
            </button>
            <button className="search-btn" onClick={onSearch}>
              🔍 Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;
