const { Schema, model } = require('mongoose');

const GeneroSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "el nombre es obligatorio"],
    unique: true,
    trim: true,
  },

  estado: {
    type: String,
    required: true,
    enum: ['activo', 'inactivo'],
    default: 'activo',
  },

  descripcion: {
    type: String,
    trim: true,
  },

  fechacreacion: {
    type: Date,
    required: true,
    default: Date.now,
  },

  fechadeactualizacion: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = model('Generos', GeneroSchema);

