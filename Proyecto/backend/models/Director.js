const { Schema, model } = require('mongoose');

const DirectorSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "el nombre es obligatorio"],
    unique: true,
    trim: true,
  },

  nacionalidad: {
    type: String,
    trim: true,
  },

  fechaNacimiento: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('Director', DirectorSchema);
