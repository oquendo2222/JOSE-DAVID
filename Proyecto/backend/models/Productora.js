const { Schema, model } = require('mongoose');

const ProductoraSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "el nombre es obligatorio"],
    unique: true,
    trim: true,
  },

  pais: {
    type: String,
    trim: true,
  },

  fundacion: {
    type: Number,
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('Productora', ProductoraSchema);
