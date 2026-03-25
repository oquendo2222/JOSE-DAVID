# Backend - Sistema de Gestión de Medios

API REST para gestionar películas, series, directores, géneros, productoras y tipos de medios.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB con Mongoose
- CORS
- dotenv para variables de entorno
- Nodemon para desarrollo

## Instalación

```bash
npm install
```

## Configuración

Crear archivo `.env` en la raíz del backend:

```env
PORT=4000
MONGO_DBIP=mongodb+srv://usuario:password@cluster.mongodb.net/dbname
```

## Ejecución

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

## Endpoints de la API

### Películas/Series
- `GET /api/movies` - Obtener todas las películas/series
- `POST /api/movies` - Crear nueva película/serie
- `PUT /api/movies/:id` - Actualizar película/serie
- `DELETE /api/movies/:id` - Eliminar película/serie

### Géneros
- `GET /api/generos` - Obtener todos los géneros
- `POST /api/generos` - Crear nuevo género
- `PUT /api/generos/:id` - Actualizar género
- `DELETE /api/generos/:id` - Eliminar género

### Directores
- `GET /api/director` - Obtener todos los directores
- `POST /api/director` - Crear nuevo director
- `PUT /api/director/:id` - Actualizar director
- `DELETE /api/director/:id` - Eliminar director

### Productoras
- `GET /api/productora` - Obtener todas las productoras
- `POST /api/productora` - Crear nueva productora
- `PUT /api/productora/:id` - Actualizar productora
- `DELETE /api/productora/:id` - Eliminar productora

### Tipos
- `GET /api/tipo` - Obtener todos los tipos
- `POST /api/tipo` - Crear nuevo tipo
- `PUT /api/tipo/:id` - Actualizar tipo
- `DELETE /api/tipo/:id` - Eliminar tipo

## Estructura del proyecto

```
backend/
├── controllers/     # Controladores de la API
├── models/         # Modelos de MongoDB
├── routes/         # Definición de rutas
├── db/            # Configuración de base de datos
├── index.js       # Punto de entrada
├── package.json   # Dependencias
└── .env          # Variables de entorno
```