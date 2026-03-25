const Movie = require('../models/movie');
const Genero = require('../models/Generos');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');

const relationConfig = {
  genero: { model: Genero, label: 'género', mustBeActive: true },
  director: { model: Director, label: 'director', mustBeActive: true },
  productora: { model: Productora, label: 'productora', mustBeActive: true },
  tipo: { model: Tipo, label: 'tipo', mustBeActive: false },
};

const populateMedia = [
  { path: 'genero', select: 'nombre estado' },
  { path: 'director', select: 'nombre estado' },
  { path: 'productora', select: 'nombre estado slogan' },
  { path: 'tipo', select: 'nombre descripcion' },
];

const buildMediaPayload = (body) => ({
  serial: body.serial?.trim(),
  titulo: body.titulo?.trim(),
  sinopsis: body.sinopsis?.trim(),
  url: body.url?.trim(),
  imagenPortada: body.imagenPortada?.trim(),
  anioEstreno: body.anioEstreno,
  genero: body.genero,
  director: body.director,
  productora: body.productora,
  tipo: body.tipo,
});

const validateRelations = async (payload) => {
  for (const [field, config] of Object.entries(relationConfig)) {
    const found = await config.model.findById(payload[field]);

    if (!found) {
      return `El ${config.label} seleccionado no existe`;
    }

    if (config.mustBeActive && found.estado !== 'Activo') {
      return `El ${config.label} seleccionado debe estar activo`;
    }
  }

  return null;
};

const handleError = (res, error) => {
  if (error?.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0] || 'campo';
    return res.status(400).json({
      success: false,
      message: `Ya existe un registro con el ${field} indicado`,
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: Object.values(error.errors)[0]?.message || error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: error.message,
  });
};

exports.createMovie = async (req, res) => {
  try {
    const payload = buildMediaPayload(req.body);
    const relationError = await validateRelations(payload);

    if (relationError) {
      return res.status(400).json({
        success: false,
        message: relationError,
      });
    }

    const movie = await Movie.create(payload);
    const saved = await Movie.findById(movie._id).populate(populateMedia);

    return res.status(201).json({
      success: true,
      message: 'Media creada exitosamente',
      data: saved,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate(populateMedia).sort({ fechaCreacion: -1 });

    return res.json({
      success: true,
      data: movies,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate(populateMedia);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Media no encontrada',
      });
    }

    return res.json({
      success: true,
      data: movie,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const payload = buildMediaPayload(req.body);
    const relationError = await validateRelations(payload);

    if (relationError) {
      return res.status(400).json({
        success: false,
        message: relationError,
      });
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    }).populate(populateMedia);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Media no encontrada',
      });
    }

    return res.json({
      success: true,
      message: 'Media actualizada exitosamente',
      data: movie,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Media no encontrada',
      });
    }

    return res.json({
      success: true,
      message: 'Media eliminada exitosamente',
    });
  } catch (error) {
    return handleError(res, error);
  }
};