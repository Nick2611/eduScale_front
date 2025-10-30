import React from 'react';
import './FiltersBar.css';

const FiltersBar = ({ filters, onFilterChange, onSearch }) => {
  const provincias = [
    'Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza', 'Tucumán', 
    'Entre Ríos', 'Salta', 'Misiones', 'Neuquén', 'Chaco',
    'Corrientes', 'Santiago del Estero', 'San Juan', 'Jujuy',
    'Río Negro', 'Formosa', 'Chubut', 'San Luis', 'Catamarca',
    'La Rioja', 'La Pampa', 'Santa Cruz', 'Tierra del Fuego'
  ];

  const niveles = [
    'Primario', 'Secundario', 'Terciario', 'Universitario'
  ];

  const tipos = [
    'Pública', 'Privada', 'Cooperativa'
  ];

  const carreras = [
    'Medicina', 'Ingeniería', 'Derecho', 'Psicología', 'Arquitectura',
    'Administración', 'Contabilidad', 'Enfermería', 'Educación',
    'Informática', 'Técnico Electromecánico', 'Técnico en Programación'
  ];

  return (
    <div className="filters-bar">
      <div className="filters-container">
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="provincia">Ciudad/Provincia</label>
            <select
              id="provincia"
              value={filters.provincia}
              onChange={(e) => onFilterChange('provincia', e.target.value)}
            >
              <option value="">Todas las provincias</option>
              {provincias.map(provincia => (
                <option key={provincia} value={provincia}>{provincia}</option>
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
              {niveles.map(nivel => (
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
              {tipos.map(tipo => (
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
              {carreras.map(carrera => (
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

          <button className="search-btn" onClick={onSearch}>
            🔍 Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;
