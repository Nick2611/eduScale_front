import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FiltersBar from '../components/FiltersBar';
import InstitutionCard from '../components/InstitutionCard';
import ModalInstitutionInfo from '../components/ModalInstitutionInfo';
import Footer from '../components/Footer';
import useCatalogo from '../hooks/useCatalogo';
import './Catalogo.css';

const Catalogo = () => {
  const { 
    instituciones,
    institucionesFiltradas, 
    cargando, 
    error, 
    filtrarInstituciones, 
    refrescarCatalogo 
  } = useCatalogo();
  
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    provincia: '',
    nivel: '',
    tipo: '',
    carrera: '',
    becas: false
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleSearch = () => {
    filtrarInstituciones(filters);
  };

  const handleViewMore = (institution) => {
    setSelectedInstitution(institution);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInstitution(null);
  };

  // Aplicar filtros automáticamente cuando cambian
  useEffect(() => {
    handleSearch();
  }, [filters, filtrarInstituciones]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="catalogo-page">
      <Navbar />
      
      <main className="catalogo-main">
        <div className="catalogo-container">
          <div className="hero-section">
            <h1 className="hero-title">Catálogo de Instituciones Educativas</h1>
            <p className="hero-subtitle">
              Encontrá la institución que mejor se adapte a tus objetivos académicos
            </p>
          </div>

          <FiltersBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            instituciones={instituciones}
          />

          <section className="institutions-section">
            <div className="section-header">
              <h2 className="section-title">Instituciones Disponibles</h2>
              {!cargando && (
                <p className="results-count">
                  {institucionesFiltradas.length} resultado{institucionesFiltradas.length !== 1 ? 's' : ''} encontrado{institucionesFiltradas.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {cargando ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Cargando instituciones...</p>
              </div>
            ) : error ? (
              <div className="error-state">
                <div className="error-icon">⚠️</div>
                <h3>Error al cargar el catálogo</h3>
                <p>{error}</p>
                <button onClick={refrescarCatalogo} className="retry-button">
                  Intentar nuevamente
                </button>
              </div>
            ) : institucionesFiltradas.length > 0 ? (
              <div className="institutions-grid">
                {institucionesFiltradas.map(institution => (
                  <InstitutionCard
                    key={institution.id}
                    institution={institution}
                    onViewMore={handleViewMore}
                  />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No se encontraron instituciones</h3>
                <p>Intenta ajustar los filtros para obtener más resultados.</p>
              </div>
            )}
          </section>
        </div>
      </main>

      <ModalInstitutionInfo
        institution={selectedInstitution}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <Footer />
    </div>
  );
};

export default Catalogo;
