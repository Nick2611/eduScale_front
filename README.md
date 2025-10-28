# IsCale - Frontend Educational Scale

Una aplicación web para encontrar instituciones educativas desarrollada con React y Vite.

## Características

- 🎨 Diseño moderno con tema oscuro
- 🔍 Búsqueda de instituciones educativas
- 🏷️ Sistema de filtros avanzado
- 📱 Diseño responsive
- ⚡ Construido con Vite para desarrollo rápido

## Tecnologías

- **React 18** - Biblioteca de UI
- **Vite** - Herramienta de construcción
- **Tailwind CSS** - Framework de CSS
- **Lucide React** - Iconos
- **AWS Amplify** - Hosting y deployment

## Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd front_edu_scale
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Scripts Disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## Deployment en AWS Amplify

1. Conecta tu repositorio a AWS Amplify
2. El archivo `amplify.yml` está configurado para el deployment automático
3. Amplify detectará automáticamente los cambios y desplegará la aplicación

## Estructura del Proyecto

```
src/
├── components/
│   ├── Header.jsx          # Header con navegación
│   ├── SearchSection.jsx   # Sección de búsqueda principal
│   ├── FilterSidebar.jsx   # Sidebar de filtros
│   ├── InstitutionCard.jsx # Tarjeta de institución
│   ├── InstitutionGrid.jsx # Grid de instituciones
│   └── Footer.jsx          # Footer
├── App.jsx                 # Componente principal
├── index.css              # Estilos globales
└── main.jsx               # Punto de entrada
```

## Personalización

### Colores
Los colores están definidos en `tailwind.config.js`:
- `dark-bg`: #0A0A1A (fondo principal)
- `dark-card`: #1A1A2E (tarjetas)
- `accent-blue`: #3B82F6 (azul principal)

### Componentes
Cada componente está en su propio archivo para facilitar el mantenimiento y reutilización.

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request# eduScale_front
