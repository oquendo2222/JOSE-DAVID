const Generos = require('../models/Generos');
const { request, response } = require('express');

const buildEstadoFilter = (estado) => {
    if (!estado) {
        return {};
    }

    return { estado };
};

const getGeneros = async (req = request, res = response) => {
    try {
        const generos = await Generos.find(buildEstadoFilter(req.query.estado)).sort({ nombre: 1 });
        res.json({
            success: true,
            data: generos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createGenero = async (req = request, res = response) => {
    try {
        const { nombre, descripcion = '', estado = 'Activo' } = req.body;
        
        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'El nombre es obligatorio'
            });
        }

        const generoDb = await Generos.findOne({ nombre: nombre.trim() });
        if (generoDb) {
            return res.status(400).json({
                success: false,
                message: 'El género ya existe'
            });
        }

        const genero = new Generos({ nombre: nombre.trim(), descripcion, estado });
        await genero.save();
        res.status(201).json({
            success: true,
            message: 'Género creado exitosamente',
            data: genero
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateGenero = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, estado } = req.body;

        const genero = await Generos.findByIdAndUpdate(
            id,
            { nombre: nombre?.trim(), descripcion, estado },
            { new: true, runValidators: true }
        );

        if (!genero) {
            return res.status(404).json({
                success: false,
                message: 'Género no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Género actualizado exitosamente',
            data: genero
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteGenero = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const genero = await Generos.findByIdAndDelete(id);

        if (!genero) {
            return res.status(404).json({
                success: false,
                message: 'Género no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Género eliminado exitosamente',
            data: genero
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getGeneros,
    createGenero,
    updateGenero,
    deleteGenero
};
