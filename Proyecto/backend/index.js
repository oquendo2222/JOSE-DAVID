require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connection');
const movieRoutes = require('./routes/movieRoutes');
const generoRoutes = require('./routes/Generos');
const directorRoutes = require('./routes/directorRoutes');
const productoraRoutes = require('./routes/productoraRoutes');
const tipoRoutes = require('./routes/tipoRoutes');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/movies', movieRoutes);
app.use('/api/generos', generoRoutes);
app.use('/api/director', directorRoutes);
app.use('/api/productora', productoraRoutes);
app.use('/api/tipo', tipoRoutes);
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to database', err);
    process.exit(1);
  });
