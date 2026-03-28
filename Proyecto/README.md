# Sistema de Gestión de Medios

## Descripción
Aplicación full-stack para administrar películas y series según el caso de estudio de Ingeniería Web II. El sistema separa cinco módulos: Género, Director, Productora, Tipo y Media.

## Qué cumple ahora
- CRUD completo para los cinco módulos.
- Media con serial único y URL única.
- Fechas automáticas de creación y actualización en todos los módulos.
- Media relacionada con género, director, productora y tipo.
- Restricción para crear o editar media solo con géneros, directores y productoras activas.
- Catálogo inicial automático para géneros y tipos.
- Frontend administrativo con navegación por módulos.

## Requisitos
- Node.js 18 o superior.
- MongoDB local o remoto.
- npm.

## Configuración
### Backend
Crear [backend/.env](backend/.env) con:

```env
PORT=4000
MONGO_DBIP=mongodb://localhost:27017/media_admin
```

## Instalación
### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Ejecución
### Terminal 1
```bash
cd backend
npm run dev
```

### Terminal 2
```bash
cd frontend
npm run dev
```

## URLs
- Backend: http://localhost:4000
- Frontend: http://localhost:5173

## Endpoints principales
- GET, POST, PUT, DELETE /api/generos
- GET, POST, PUT, DELETE /api/director
- GET, POST, PUT, DELETE /api/productora
- GET, POST, PUT, DELETE /api/tipo
- GET, POST, PUT, DELETE /api/movies

## Estructura
```text
backend/
  controllers/
  db/
  models/
  routes/
  index.js
frontend/
  src/
    components/
    pages/
    services/
    App.jsx
    main.jsx
```
