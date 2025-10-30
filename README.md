# EduScale - Plataforma Nacional de Admisiones Educativas

EduScale es una aplicación web Single Page Application (SPA) desarrollada con React para la gestión de admisiones educativas en Argentina. La plataforma permite a los usuarios explorar instituciones educativas y realizar postulaciones de manera digital.

## 🚀 Características

- **Catálogo de Instituciones**: Explora universidades, colegios y escuelas técnicas
- **Sistema de Filtros**: Busca por provincia, nivel educativo, tipo de institución y carreras
- **Autenticación**: Sistema de login simulado con JWT
- **Gestión de Postulaciones**: Formulario completo para postulaciones
- **Estado de Postulaciones**: Seguimiento del estado de cada postulación
- **Diseño Responsive**: Compatible con desktop, tablet y móvil
- **Estilo Gubernamental**: Diseño inspirado en portales oficiales como argentina.gob.ar

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework frontend
- **React Router v6** - Navegación SPA
- **CSS Modules** - Estilos modulares (sin Tailwind)
- **Context API** - Manejo de estado global
- **JSON Mock Data** - Simulación de APIs

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Navbar.jsx              # Barra de navegación superior
│   ├── FiltersBar.jsx          # Barra de filtros de búsqueda
│   ├── InstitutionCard.jsx     # Tarjeta de institución
│   ├── ModalInstitutionInfo.jsx # Modal con detalles de institución
│   └── Footer.jsx              # Pie de página
├── pages/
│   ├── Catalogo.jsx            # Página principal del catálogo
│   ├── Login.jsx               # Página de inicio de sesión
│   ├── Postulacion.jsx         # Formulario de postulación
│   └── MiEstado.jsx            # Estado de postulaciones del usuario
├── context/
│   └── AuthContext.jsx         # Context para autenticación
├── data/
│   ├── catalogo.json           # Datos mock de instituciones
│   └── postulaciones.json      # Datos mock de postulaciones
├── App.jsx                     # Componente principal
└── index.js                    # Punto de entrada
```

## 🎨 Paleta de Colores

- **Primario**: `#2563EB` (Azul)
- **Secundario**: `#1E293B` (Azul marino)
- **Fondo**: `#F9FAFB` (Gris claro)
- **Texto**: `#111827` / `#334155`
- **Acentos**: `#64748B` (Gris medio)

## 🚦 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de instalación

1. **Navega al directorio del proyecto**:
   ```bash
   cd /Users/lolo/Documents/FrontEnd/eduscale
   ```

2. **Instala las dependencias** (ya hecho):
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**:
   ```bash
   npm start
   ```

4. **Abre tu navegador** y visita:
   ```
   http://localhost:3000
   ```

### Comandos disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta los tests
- `npm run eject` - Expone la configuración de Webpack

## 👤 Credenciales de Prueba

Para probar el sistema de autenticación, utiliza:

- **Email**: `usuario@example.com`
- **Contraseña**: `password`

## 📱 Funcionalidades Implementadas

### 🏠 Página Principal (Catálogo)
- Hero section con título y descripción
- Barra de filtros con 4 campos de selección
- Checkbox para filtrar instituciones con becas
- Grid responsive de tarjetas de instituciones
- Modal con información detallada de cada institución

### 🔐 Sistema de Autenticación
- Página de login con validación
- Simulación de JWT en localStorage
- Context API para manejo de estado de sesión
- Rutas protegidas para usuarios autenticados

### 📝 Sistema de Postulaciones
- Formulario completo con información personal, académica y documentos
- Carga simulada de archivos
- Validación de campos requeridos
- Redirección automática si no está logueado

### 📊 Estado de Postulaciones
- Lista de postulaciones del usuario
- Estados: "En revisión", "Aceptado", "Rechazado"
- Información detallada de cada postulación
- Badges de estado con colores diferenciados

### 🎨 Diseño y UX
- Interfaz inspirada en portales gubernamentales
- Animaciones sutiles (hover, focus, etc.)
- Responsive design con breakpoints en 768px y 480px
- Accesibilidad con focus states y semantic HTML
- Loading states y error handling

## 🔧 Personalización

### Agregar nuevas instituciones
Edita el archivo `src/data/catalogo.json` para agregar más instituciones:

```json
{
  "id": 7,
  "nombre": "Nueva Universidad",
  "ciudad": "Ciudad",
  "provincia": "Provincia",
  "nivel": "Universitario",
  "tipo": "Pública",
  "becas": true,
  "descripcion": "Descripción breve",
  "descripcionCompleta": "Descripción detallada",
  "email": "info@universidad.edu.ar",
  "direccion": "Dirección completa",
  "carreras": ["Carrera 1", "Carrera 2"],
  "logo": "🎓"
}
```

### Modificar estilos
Los estilos están organizados en archivos CSS modulares. Cada componente tiene su propio archivo CSS correspondiente.

## 📋 Próximas Funcionalidades

- Integración con APIs reales
- Notificaciones push
- Sistema de mensajería interno
- Panel de administración
- Reportes y analytics
- Integración con sistemas de pago
- Autenticación con OAuth2

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 📞 Soporte

Para soporte técnico o consultas sobre el proyecto, contacta a:
- Email: soporte@eduscale.gov.ar
- Tel: +54 11 4000-0000

---

**EduScale** - Desarrollado con ❤️ para el Ministerio de Educación de Argentina
