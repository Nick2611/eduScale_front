import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import postulacionesData from '../data/postulaciones.json';
import './MiEstado.css';

const MiEstado = () => {
  const { user } = useAuth();
  const [postulaciones, setPostulaciones] = useState([]);

  useEffect(() => {
    if (user) {
      // Filtrar postulaciones del usuario actual
      const userPostulaciones = postulacionesData.filter(
        p => p.usuarioId === user.id
      );
      setPostulaciones(userPostulaciones);
    }
  }, [user]);

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'Aceptado':
        return 'status-accepted';
      case 'Rechazado':
        return 'status-rejected';
      case 'En revisión':
      default:
        return 'status-pending';
    }
  };

  const getStatusIcon = (estado) => {
    switch (estado) {
      case 'Aceptado':
        return '✅';
      case 'Rechazado':
        return '❌';
      case 'En revisión':
      default:
        return '🔄';
    }
  };

  return (
    <div className="mi-estado-page">
      <Navbar />
      
      <main className="mi-estado-main">
        <div className="mi-estado-container">
          <div className="page-header">
            <h1>Mi Estado de Postulaciones</h1>
            <p>Aquí puedes ver el progreso de todas tus postulaciones</p>
          </div>

          {postulaciones.length > 0 ? (
            <div className="postulaciones-list">
              {postulaciones.map(postulacion => (
                <div key={postulacion.id} className="postulacion-card">
                  <div className="postulacion-header">
                    <div className="institution-info">
                      <h3>{postulacion.institucionNombre}</h3>
                      <p className="carrera-info">{postulacion.carrera}</p>
                    </div>
                    <div className={`status-badge ${getStatusColor(postulacion.estado)}`}>
                      <span className="status-icon">{getStatusIcon(postulacion.estado)}</span>
                      <span className="status-text">{postulacion.estado}</span>
                    </div>
                  </div>
                  
                  <div className="postulacion-details">
                    <div className="detail-item">
                      <strong>Fecha de postulación:</strong>
                      <span>{new Date(postulacion.fechaPostulacion).toLocaleDateString('es-AR')}</span>
                    </div>
                    
                    <div className="detail-item">
                      <strong>Documentos enviados:</strong>
                      <div className="documentos-list">
                        {postulacion.documentos.map((doc, index) => (
                          <span key={index} className="documento-item">
                            📄 {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="postulacion-actions">
                    <button className="btn-secondary">Ver Detalles</button>
                    {postulacion.estado === 'En revisión' && (
                      <button className="btn-outline">Editar Postulación</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-postulaciones">
              <div className="no-postulaciones-icon">📋</div>
              <h3>No tienes postulaciones aún</h3>
              <p>Explora nuestro catálogo de instituciones y realiza tu primera postulación.</p>
              <a href="/" className="btn-primary">Ver Catálogo</a>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MiEstado;
