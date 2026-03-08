require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connection');
const movieRoutes = require('./routes/movieRoutes');
const generoRoutes = require('./routes/Geneross');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/movies', movieRoutes);
app.use('/api/generos', generoRoutes);
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to database', err);
    process.exit(1);
  });
