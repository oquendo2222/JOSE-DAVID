const Director = require('../models/Director');
const { request, response } = require('express');

const buildEstadoFilter = (estado) => {
    if (!estado) {
        return {};
    }

    return { estado };
};

const getDirectores = async (req = request, res = response) => {
    try {
        const directores = await Director.find(buildEstadoFilter(req.query.estado)).sort({ nombre: 1 });
        res.json({
            success: true,
            data: directores
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createDirector = async (req = request, res = response) => {
    try {
        const { nombre, estado = 'Activo' } = req.body;
        
        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'El nombre es obligatorio'
            });
        }

        const directorDb = await Director.findOne({ nombre: nombre.trim() });
        if (directorDb) {
            return res.status(400).json({
                success: false,
                message: 'El director ya existe'
            });
        }

        const director = new Director({ nombre: nombre.trim(), estado });
        await director.save();
        res.status(201).json({
            success: true,
            message: 'Director creado exitosamente',
            data: director
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateDirector = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, estado } = req.body;

        const director = await Director.findByIdAndUpdate(
            id,
            { nombre: nombre?.trim(), estado },
            { new: true, runValidators: true }
        );

        if (!director) {
            return res.status(404).json({
                success: false,
                message: 'Director no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Director actualizado exitosamente',
            data: director
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteDirector = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const director = await Director.findByIdAndDelete(id);

        if (!director) {
            return res.status(404).json({
                success: false,
                message: 'Director no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Director eliminado exitosamente',
            data: director
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getDirectores,
    createDirector,
    updateDirector,
    deleteDirector
};
