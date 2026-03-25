const { Schema, model } = require('mongoose');

const TipoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "el nombre es obligatorio"],
    unique: true,
    trim: true,
  },

  descripcion: {
    type: String,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('Tipo', TipoSchema);
