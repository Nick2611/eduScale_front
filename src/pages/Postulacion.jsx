import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Postulacion.css';

const Postulacion = () => {
  const location = useLocation();
  const institution = location.state?.institution;

  if (!institution) {
    return (
      <div className="postulacion-page">
        <Navbar />
        <main className="postulacion-main">
          <div className="postulacion-container">
            <div className="error-message">
              <h2>Error</h2>
              <p>No se ha seleccionado una institución. Por favor, regresa al catálogo.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="postulacion-page">
      <Navbar />
      
      <main className="postulacion-main">
        <div className="postulacion-container">
          <div className="postulacion-header">
            <h1>Postulación a {institution.nombre}</h1>
            <p>Completa todos los campos para enviar tu postulación</p>
          </div>

          <form className="postulacion-form">
            <div className="form-section">
              <h3>Información Personal</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input type="text" id="nombre" name="nombre" required />
                </div>
                <div className="form-group">
                  <label htmlFor="apellido">Apellido</label>
                  <input type="text" id="apellido" name="apellido" required />
                </div>
                <div className="form-group">
                  <label htmlFor="dni">DNI</label>
                  <input type="text" id="dni" name="dni" required />
                </div>
                <div className="form-group">
                  <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                  <input type="date" id="fechaNacimiento" name="fechaNacimiento" required />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Información de Contacto</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input type="tel" id="telefono" name="telefono" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Información Académica</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="colegioPrevio">Colegio de Procedencia</label>
                  <input type="text" id="colegioPrevio" name="colegioPrevio" required />
                </div>
                <div className="form-group">
                  <label htmlFor="anoIngreso">Año de Ingreso Deseado</label>
                  <select id="anoIngreso" name="anoIngreso" required>
                    <option value="">Seleccionar año</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="carrera">Carrera de Interés</label>
                  <select id="carrera" name="carrera" required>
                    <option value="">Seleccionar carrera</option>
                    {institution.carreras.map(carrera => (
                      <option key={carrera} value={carrera}>{carrera}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Documentación</h3>
              <div className="upload-section">
                <div className="upload-item">
                  <label>Documento de Identidad (DNI)</label>
                  <input type="file" accept=".pdf,.jpg,.png" />
                </div>
                <div className="upload-item">
                  <label>Certificado de Estudios Secundarios</label>
                  <input type="file" accept=".pdf,.jpg,.png" />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary">
                Guardar Borrador
              </button>
              <button type="submit" className="btn-primary">
                Enviar Postulación
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Postulacion;
