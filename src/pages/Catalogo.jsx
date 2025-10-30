import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FiltersBar from '../components/FiltersBar';
import InstitutionCard from '../components/InstitutionCard';
import ModalInstitutionInfo from '../components/ModalInstitutionInfo';
import Footer from '../components/Footer';
import catalogoData from '../data/catalogo.json';
import './Catalogo.css';

const Catalogo = () => {
  const [institutions, setInstitutions] = useState([]);
  const [filteredInstitutions, setFilteredInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    provincia: '',
    nivel: '',
    tipo: '',
    carrera: '',
    becas: false
  });

  useEffect(() => {
    // Simular carga de datos del catálogo
    setInstitutions(catalogoData);
    setFilteredInstitutions(catalogoData);
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleSearch = () => {
    let filtered = institutions;

    // Filtrar por provincia
    if (filters.provincia) {
      filtered = filtered.filter(inst => 
        inst.provincia.toLowerCase().includes(filters.provincia.toLowerCase())
      );
    }

    // Filtrar por nivel
    if (filters.nivel) {
      filtered = filtered.filter(inst => 
        inst.nivel.toLowerCase().includes(filters.nivel.toLowerCase())
      );
    }

    // Filtrar por tipo
    if (filters.tipo) {
      filtered = filtered.filter(inst => 
        inst.tipo.toLowerCase().includes(filters.tipo.toLowerCase())
      );
    }

    // Filtrar por carrera
    if (filters.carrera) {
      filtered = filtered.filter(inst => 
        inst.carreras.some(carrera => 
          carrera.toLowerCase().includes(filters.carrera.toLowerCase())
        )
      );
    }

    // Filtrar por becas
    if (filters.becas) {
      filtered = filtered.filter(inst => inst.becas === true);
    }

    setFilteredInstitutions(filtered);
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
  }, [filters, institutions]);

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
          />

          <section className="institutions-section">
            <div className="section-header">
              <h2 className="section-title">Instituciones Disponibles</h2>
              <p className="results-count">
                {filteredInstitutions.length} resultado{filteredInstitutions.length !== 1 ? 's' : ''} encontrado{filteredInstitutions.length !== 1 ? 's' : ''}
              </p>
            </div>

            {filteredInstitutions.length > 0 ? (
              <div className="institutions-grid">
                {filteredInstitutions.map(institution => (
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
