const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
  {
    serial: {
      type: String,
      required: [true, 'El serial es obligatorio'],
      unique: true,
      trim: true,
    },
    titulo: {
      type: String,
      required: [true, 'El titulo es obligatorio'],
      trim: true,
    },
    sinopsis: {
      type: String,
      required: [true, 'La sinopsis es obligatoria'],
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'La URL es obligatoria'],
      unique: true,
      trim: true,
    },
    imagenPortada: {
      type: String,
      required: [true, 'La imagen de portada es obligatoria'],
      trim: true,
    },
    anioEstreno: {
      type: Number,
      required: [true, 'El año de estreno es obligatorio'],
      min: 1888,
    },
    genero: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Generos',
      required: [true, 'El género es obligatorio'],
    },
    director: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Director',
      required: [true, 'El director es obligatorio'],
    },
    productora: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Productora',
      required: [true, 'La productora es obligatoria'],
    },
    tipo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tipo',
      required: [true, 'El tipo es obligatorio'],
    },
  },
  {
    timestamps: {
      createdAt: 'fechaCreacion',
      updatedAt: 'fechaActualizacion',
    },
  }
);

module.exports = mongoose.model('Movie', MovieSchema);