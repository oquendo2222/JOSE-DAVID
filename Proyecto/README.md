# Sistema de Gestión de Medios - Películas y Series

## Descripción
Aplicación full-stack extremadamente simple para consultar datos de películas, series, directores, productoras y tipos de contenido. El frontend hace peticiones al backend y muestra los datos en formato JSON.

## Características

### Backend
- API REST con Express
- Base de datos MongoDB
- CRUD completo para:
  - Películas y Series
  - Géneros
  - Directores
  - Productoras
  - Tipos

### Frontend
- Interfaz minimalista con React
- Botones para hacer peticiones a diferentes endpoints
- Visualización de datos en formato JSON
- Sin formularios ni navegación compleja

## Requisitos

- Node.js 18+
- MongoDB corriendo localmente o cloud URI en `.env`
- npm o yarn

## Instalación

### 1. Clonar el proyecto
```bash
git clone <repo-url>
cd Proyecto
```

### 2. Instalar backend
```bash
cd backend
npm install
```

### 3. Configurar variables de entorno backend
Crear archivo `.env` en `backend/`:
```
PORT=4000
MONGO_DBIP=mongodb+srv://joseoquendo_db_user:Henao20072026@cluster0.kadiz6m.mongodb.net/?appName=Cluster0
```

### 4. Instalar frontend
```bash
cd ../frontend
npm install
```

## Ejecución

### Backend
```bash
cd backend
npm start
```
El servidor backend estará disponible en `http://localhost:4000`

### Frontend
```bash
cd frontend
npm run dev
```
La aplicación frontend estará disponible en `http://localhost:5180`

## Uso
La aplicación tiene botones para hacer peticiones a diferentes endpoints:
- **Ver Películas/Series**: Muestra todas las películas y series
- **Ver Directores**: Muestra todos los directores
- **Ver Géneros**: Muestra todos los géneros
- **Ver Productoras**: Muestra todas las productoras
- **Ver Tipos**: Muestra todos los tipos

Al hacer clic en cualquier botón, se hace una petición HTTP al backend y se muestran los datos en formato JSON crudo.
MONGO_DBIP=mongodb://localhost:27017/mydb
```

### 4. Instalar frontend
```bash
cd ../frontend
npm install
```

## Ejecución

### Iniciar MongoDB (si está instalado localmente)
```bash
mongod
```

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
El servidor estará en: `http://localhost:3000`

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
La aplicación estará en: `http://localhost:5173`

## Uso

1. Abre el navegador en `http://localhost:5173`
2. Navega por los módulos usando el menú superior
3. Cada módulo permite:
   - 📋 Ver lista de registros
   - ➕ Crear nuevo registro
   - ✏️ Editar registro existente
   - 🗑️ Eliminar registro

## Estructura del Proyecto

```
backend/
├── models/          # Esquemas MongoDB
├── controllers/     # Lógica de negocio
├── routes/         # Rutas API
├── db/             # Conexión DB
└── index.js        # Servidor principal

frontend/
├── src/
│   ├── components/  # Form.js, List.js reutilizables
│   ├── pages/      # Páginas de cada módulo
│   ├── services/   # Llamadas API con axios
│   ├── App.jsx     # Routing principal
│   └── index.css   # Estilos globales
```

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/movies | Listar películas/series |
| POST | /api/movies | Crear película/serie |
| PUT | /api/movies/:id | Actualizar película/serie |
| DELETE | /api/movies/:id | Eliminar película/serie |
| GET | /api/generos | Listar géneros |
| POST | /api/generos | Crear género |
| PUT | /api/generos/:id | Actualizar género |
| DELETE | /api/generos/:id | Eliminar género |
| GET | /api/director | Listar directores |
| POST | /api/director | Crear director |
| PUT | /api/director/:id | Actualizar director |
| DELETE | /api/director/:id | Eliminar director |
| GET | /api/productora | Listar productoras |
| POST | /api/productora | Crear productora |
| PUT | /api/productora/:id | Actualizar productora |
| DELETE | /api/productora/:id | Eliminar productora |
| GET | /api/tipo | Listar tipos |
| POST | /api/tipo | Crear tipo |
| PUT | /api/tipo/:id | Actualizar tipo |
| DELETE | /api/tipo/:id | Eliminar tipo |

## Tecnologías Utilizadas

### Backend
- **Express** - Framework web
- **Mongoose** - ODM para MongoDB
- **CORS** - Cross-Origin Resource Sharing
- **Nodemon** - Reinicio automático en desarrollo
- **dotenv** - Variables de entorno

### Frontend
- **React 19** - Librería UI
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **Vite** - Build tool

## Licencia
ISC

## Autor
Jose David Oquendo Henao
