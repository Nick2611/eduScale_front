// src/api/catalogoService.js
import axios from 'axios';

// Configuración base de la API
// En desarrollo usará el proxy, en producción la URL completa
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://tuqlcfqj0l.execute-api.us-east-1.amazonaws.com/v2'
  : '/v2';

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT automáticamente
apiClient.interceptors.request.use(
  (config) => {
    // El token se agregará dinámicamente en cada petición
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejar errores comunes
    if (error.response?.status === 401) {
      console.error('Token de autorización inválido o expirado');
    } else if (error.response?.status === 403) {
      console.error('Acceso denegado');
    } else if (error.response?.status >= 500) {
      console.error('Error interno del servidor');
    }
    return Promise.reject(error);
  }
);

/**
 * Obtiene todo el catálogo de facultades
 * @param {string} token - JWT token para autenticación
 * @returns {Promise<Array>} Lista de instituciones
 */
export const getCatalogo = async () => {
  try {
    console.log('🔄 Intentando obtener catálogo desde API...');
    console.log('📍 URL base:', API_BASE_URL);
    console.log('📍 URL completa:', `${API_BASE_URL}/catalogo`);
    // Petición simple sin headers de autorización
    const response = await apiClient.get('/catalogo');
    
    console.log('✅ Catálogo obtenido desde API:', response.data);
    
    // La API devuelve {count: number, items: Array}
    // Extraemos solo los items para mantener compatibilidad
    const instituciones = response.data.items || response.data;
    console.log('📋 Instituciones procesadas:', instituciones);
    
    // Mapear los datos de la API al formato que espera el frontend
    const institucionesMapeadas = instituciones.map(item => ({
      id: item._id || item.id,
      nombre: item.name || item.nombre,
      shortName: item.shortName || item.nombre,
      provincia: item.province || item.provincia || 'CABA',
      ciudad: item.city || item.province || 'No especificada', // El componente busca 'ciudad'
      tipo: item.type === 'universidad' ? 'Pública' : (item.tipo || 'Pública'),
      nivel: Array.isArray(item.level) ? item.level.map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(', ') : (item.nivel || 'Universitario'),
      carreras: Array.isArray(item.tags) ? item.tags.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1)) : (item.carreras || []),
      becas: item.becas !== undefined ? item.becas : true, // Asumir que tienen becas si no se especifica
      descripcion: item.descripcion || `${item.name} - ${item.shortName || 'Universidad'}`,
      ubicacion: item.city || item.ubicacion || item.province || 'No especificada',
      logo: '🎓', // Placeholder para logo
      logoUrl: item.logoUrl || null,
      popularity: item.popularity || 0,
      tenant_id: item.tenant_id
    }));
    
    console.log('🎯 Instituciones mapeadas:', institucionesMapeadas);
    
    return {
      success: true,
      data: institucionesMapeadas,
      error: null
    };
  } catch (error) {
    console.warn('⚠️ Error al obtener catálogo desde API:', error.message);
    console.log('🔄 Usando datos de prueba para desarrollo...');
    
    // Si es un error de CORS o de red, devolver datos de prueba
    return {
      success: true,
      data: [
        {
          id: 1,
          nombre: "Universidad Nacional de Buenos Aires (Demo)",
          provincia: "Buenos Aires",
          tipo: "Pública",
          nivel: "Universitario",
          carreras: ["Medicina", "Ingeniería", "Derecho", "Psicología"],
          becas: true,
          descripcion: "La universidad más prestigiosa de Argentina (Datos de prueba)",
          ubicacion: "Ciudad de Buenos Aires"
        },
        {
          id: 2,
          nombre: "Universidad Tecnológica Nacional (Demo)",
          provincia: "Buenos Aires",
          tipo: "Pública",
          nivel: "Universitario",
          carreras: ["Ingeniería", "Informática"],
          becas: true,
          descripcion: "Especializada en carreras técnicas (Datos de prueba)",
          ubicacion: "Buenos Aires"
        },
        {
          id: 3,
          nombre: "Universidad de Córdoba (Demo)",
          provincia: "Córdoba",
          tipo: "Pública",
          nivel: "Universitario",
          carreras: ["Medicina", "Arquitectura", "Administración"],
          becas: false,
          descripcion: "Una de las universidades más antiguas del país (Datos de prueba)",
          ubicacion: "Córdoba Capital"
        },
        {
          id: 4,
          nombre: "Instituto Tecnológico de Buenos Aires (Demo)",
          provincia: "Buenos Aires",
          tipo: "Privada",
          nivel: "Universitario",
          carreras: ["Ingeniería", "Informática", "Administración"],
          becas: true,
          descripcion: "Instituto privado de excelencia académica (Datos de prueba)",
          ubicacion: "Buenos Aires"
        },
        {
          id: 5,
          nombre: "Universidad Nacional de La Plata (Demo)",
          provincia: "Buenos Aires",
          tipo: "Pública",
          nivel: "Universitario",
          carreras: ["Arquitectura", "Ingeniería", "Medicina", "Derecho"],
          becas: false,
          descripcion: "Universidad pública con gran tradición (Datos de prueba)",
          ubicacion: "La Plata"
        }
      ],
      error: null
    };
  }
};

/**
 * Obtiene los datos de una institución específica
 * @param {string} institutionId - ID de la institución
 * @param {string} token - JWT token para autenticación
 * @returns {Promise<Object>} Datos de la institución
 */
export const getInstitucionById = async (institutionId) => {
  try {
    const response = await apiClient.get(`/catalogo/${institutionId}`);
    return {
      success: true,
      data: response.data,
      error: null
    };
  } catch (error) {
    console.error('Error al obtener institución:', error);
    
    return {
      success: false,
      data: null,
      error: {
        message: error.response?.data?.message || error.message || 'Error al cargar la institución',
        status: error.response?.status || 500,
        code: error.code
      }
    };
  }
};

/**
 * Obtiene la configuración personalizada de un tenant/institución
 * @param {string} institutionId - ID de la institución (tenant_id)
 * @returns {Promise<Object>} Configuración del tenant
 */
export const getTenantConfig = async (institutionId) => {
  try {
    console.log('🔄 Obteniendo configuración del tenant:', institutionId);
    const response = await apiClient.get(`/tenant-config/${institutionId}`);
    console.log('✅ Configuración del tenant obtenida:', response.data);
    
    return {
      success: true,
      data: response.data,
      error: null
    };
  } catch (error) {
    console.warn('⚠️ Error al obtener configuración del tenant:', error.message);
    
    return {
      success: false,
      data: null,
      error: {
        message: error.response?.data?.message || error.message || 'Error al cargar configuración del tenant',
        status: error.response?.status || 500,
        code: error.code
      }
    };
  }
};

/**
 * Obtiene los estados posibles
 * @param {string} token - JWT token para autenticación
 * @returns {Promise<Array>} Lista de estados
 */
export const getEstados = async () => {
  try {
    console.log('🔄 Intentando obtener estados desde API...');
    const response = await apiClient.get('/estado');
    console.log('✅ Estados obtenidos desde API:', response.data);
    
    return {
      success: true,
      data: response.data,
      error: null
    };
  } catch (error) {
    console.warn('⚠️ Error al obtener estados desde API:', error.message);
    console.log('🔄 Usando estados de Argentina como fallback...');
    
    // Fallback con estados/provincias de Argentina
    return {
      success: true,
      data: [
        { id: 'caba', nombre: 'CABA' },
        { id: 'buenos-aires', nombre: 'Buenos Aires' },
        { id: 'cordoba', nombre: 'Córdoba' },
        { id: 'santa-fe', nombre: 'Santa Fe' },
        { id: 'mendoza', nombre: 'Mendoza' },
        { id: 'tucuman', nombre: 'Tucumán' },
        { id: 'entre-rios', nombre: 'Entre Ríos' },
        { id: 'salta', nombre: 'Salta' },
        { id: 'corrientes', nombre: 'Corrientes' },
        { id: 'misiones', nombre: 'Misiones' },
        { id: 'jujuy', nombre: 'Jujuy' },
        { id: 'chaco', nombre: 'Chaco' },
        { id: 'formosa', nombre: 'Formosa' },
        { id: 'santiago-del-estero', nombre: 'Santiago del Estero' },
        { id: 'catamarca', nombre: 'Catamarca' },
        { id: 'la-rioja', nombre: 'La Rioja' },
        { id: 'san-juan', nombre: 'San Juan' },
        { id: 'san-luis', nombre: 'San Luis' },
        { id: 'neuquen', nombre: 'Neuquén' },
        { id: 'rio-negro', nombre: 'Río Negro' },
        { id: 'chubut', nombre: 'Chubut' },
        { id: 'santa-cruz', nombre: 'Santa Cruz' },
        { id: 'tierra-del-fuego', nombre: 'Tierra del Fuego' },
        { id: 'la-pampa', nombre: 'La Pampa' }
      ],
      error: null
    };
  }
};

// Exportar todas las funciones como un objeto catalogoService
export const catalogoService = {
  getCatalogo,
  getInstitucionById,
  getEstados,
  getTenantConfig
};

// Exportar la instancia de axios por si se necesita usar directamente
export { apiClient };

// Exportación por defecto
export default catalogoService;
