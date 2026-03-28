require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connection');
const ensureCatalogData = require('./db/seedData');
const movieRoutes = require('./routes/movieRoutes');
const generoRoutes = require('./routes/Generos');
const directorRoutes = require('./routes/directorRoutes');
const productoraRoutes = require('./routes/productoraRoutes');
const tipoRoutes = require('./routes/tipoRoutes');

const app = express();

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
  : [];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Origen no permitido por CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// middleware
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true });
});

// routes
app.use('/api/movies', movieRoutes);
app.use('/api/generos', generoRoutes);
app.use('/api/director', directorRoutes);
app.use('/api/productora', productoraRoutes);
app.use('/api/tipo', tipoRoutes);
const PORT = process.env.PORT || 3000;

connectDB()
  .then(async () => {
    await ensureCatalogData();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to database', err);
    process.exit(1);
  });
