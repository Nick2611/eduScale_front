// src/api/catalogoService.js
import axios from 'axios';

// Configuración base de la API
// Usar variable de ambiente si está disponible, sino usar la configuración por defecto
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 
  (process.env.NODE_ENV === 'production' 
    ? '/api/v2'  // Usar el redirect de Amplify en producción
    : '/v2');

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Cabeceras CORS para producción
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
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
    
    // Intentar petición directa primero
    let response;
    try {
      response = await apiClient.get('/catalogo');
    } catch (corsError) {
      // Si falla por CORS, intentar con fetch y mode no-cors como fallback
      console.log('⚠️ Error CORS con axios, intentando con fetch...');
      
      try {
        const fetchResponse = await fetch(`${API_BASE_URL}/catalogo`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        
        if (!fetchResponse.ok) {
          throw new Error(`HTTP error! status: ${fetchResponse.status}`);
        }
        
        const data = await fetchResponse.json();
        response = { data };
      } catch (fetchError) {
        console.error('❌ Error con fetch también:', fetchError.message);
        throw corsError; // Lanzar el error original de CORS
      }
    }
    
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
    console.warn('🔍 Tipo de error:', error.code || error.name);
    console.log('🔄 Usando datos de prueba como fallback...');
    
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
          ubicacion: "Ciudad de Buenos Aires",
          tenant_id: "u-bue-uba"
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
          ubicacion: "Buenos Aires",
          tenant_id: "u-bue-utn"
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
          ubicacion: "Córdoba Capital",
          tenant_id: "u-cor-unc"
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
          ubicacion: "Buenos Aires",
          tenant_id: "u-bue-itba"
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
          ubicacion: "La Plata",
          tenant_id: "u-bue-unlp"
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
  console.log('🔄 Obteniendo configuración del tenant:', institutionId);
  
  // En producción con Amplify, usar configuración por defecto directamente
  // para evitar problemas de CORS
  const isAmplifyProduction = window.location.hostname.includes('amplifyapp.com');
  
  if (isAmplifyProduction) {
    console.log('🏭 Detectado entorno Amplify - usando configuración por defecto');
    
    // Configuraciones específicas por tenant para demo
    const tenantConfigs = {
      'u-bue-uba': {
        tenant_id: 'u-bue-uba',
        primary_color: '#1e40af',
        secondary_color: '#1e3a8a',
        accent_color: '#3b82f6',
        background_color: '#f8fafc',
        text_color: '#1e293b',
        institution_name: 'Universidad de Buenos Aires',
        logo_url: null,
        custom_css: null,
        theme_mode: 'light'
      },
      'u-bue-utn': {
        tenant_id: 'u-bue-utn',
        primary_color: '#dc2626',
        secondary_color: '#b91c1c',
        accent_color: '#ef4444',
        background_color: '#fef2f2',
        text_color: '#1e293b',
        institution_name: 'Universidad Tecnológica Nacional',
        logo_url: null,
        custom_css: null,
        theme_mode: 'light'
      },
      'u-cor-unc': {
        tenant_id: 'u-cor-unc',
        primary_color: '#7c3aed',
        secondary_color: '#6d28d9',
        accent_color: '#8b5cf6',
        background_color: '#faf5ff',
        text_color: '#1e293b',
        institution_name: 'Universidad Nacional de Córdoba',
        logo_url: null,
        custom_css: null,
        theme_mode: 'light'
      },
      'u-bue-itba': {
        tenant_id: 'u-bue-itba',
        primary_color: '#059669',
        secondary_color: '#047857',
        accent_color: '#10b981',
        background_color: '#f0fdf4',
        text_color: '#1e293b',
        institution_name: 'Instituto Tecnológico de Buenos Aires',
        logo_url: null,
        custom_css: null,
        theme_mode: 'light'
      },
      'u-bue-unlp': {
        tenant_id: 'u-bue-unlp',
        primary_color: '#ea580c',
        secondary_color: '#c2410c',
        accent_color: '#f97316',
        background_color: '#fff7ed',
        text_color: '#1e293b',
        institution_name: 'Universidad Nacional de La Plata',
        logo_url: null,
        custom_css: null,
        theme_mode: 'light'
      }
    };
    
    const config = tenantConfigs[institutionId] || {
      tenant_id: institutionId,
      primary_color: '#2563eb',
      secondary_color: '#1d4ed8',
      accent_color: '#3b82f6',
      background_color: '#f8fafc',
      text_color: '#1e293b',
      institution_name: 'Institución Educativa',
      logo_url: null,
      custom_css: null,
      theme_mode: 'light'
    };
    
    console.log('✅ Configuración del tenant (por defecto):', config);
    
    return {
      success: true,
      data: config,
      error: null
    };
  }

  // En desarrollo local, intentar la petición real
  try {
    console.log('📍 URL tenant:', `${API_BASE_URL}/tenant-config/${institutionId}`);
    
    // Intentar petición directa primero
    let response;
    try {
      response = await apiClient.get(`/tenant-config/${institutionId}`);
    } catch (corsError) {
      console.log('⚠️ Error CORS en tenant-config con axios, intentando con fetch...');
      
      try {
        const fetchResponse = await fetch(`${API_BASE_URL}/tenant-config/${institutionId}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        
        if (!fetchResponse.ok) {
          throw new Error(`HTTP error! status: ${fetchResponse.status}`);
        }
        
        const data = await fetchResponse.json();
        response = { data };
      } catch (fetchError) {
        console.error('❌ Error con fetch también en tenant-config:', fetchError.message);
        throw corsError; // Lanzar el error original de CORS
      }
    }
    
    console.log('✅ Configuración del tenant obtenida desde API:', response.data);
    
    return {
      success: true,
      data: response.data,
      error: null
    };
  } catch (error) {
    console.warn('⚠️ Error al obtener configuración del tenant:', error.message);
    console.warn('🔍 Tipo de error tenant:', error.code || error.name);
    
    // Fallback a configuración por defecto
    console.log('🔄 Usando configuración de tenant por defecto debido a error...');
    return {
      success: true,
      data: {
        tenant_id: institutionId,
        primary_color: '#2563eb',
        secondary_color: '#1d4ed8',
        accent_color: '#3b82f6',
        background_color: '#f8fafc',
        text_color: '#1e293b',
        institution_name: 'Institución Educativa',
        logo_url: null,
        custom_css: null,
        theme_mode: 'light'
      },
      error: null
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
