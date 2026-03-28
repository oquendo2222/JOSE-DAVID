const Productora = require('../models/Productora');
const { request, response } = require('express');

const buildEstadoFilter = (estado) => {
    if (!estado) {
        return {};
    }

    return { estado };
};

const getProductoras = async (req = request, res = response) => {
    try {
        const productoras = await Productora.find(buildEstadoFilter(req.query.estado)).sort({ nombre: 1 });
        res.json({
            success: true,
            data: productoras
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createProductora = async (req = request, res = response) => {
    try {
        const { nombre, estado = 'Activo', slogan = '', descripcion = '' } = req.body;
        
        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'El nombre es obligatorio'
            });
        }

        const productoraDb = await Productora.findOne({ nombre: nombre.trim() });
        if (productoraDb) {
            return res.status(400).json({
                success: false,
                message: 'La productora ya existe'
            });
        }

        const productora = new Productora({ nombre: nombre.trim(), estado, slogan, descripcion });
        await productora.save();
        res.status(201).json({
            success: true,
            message: 'Productora creada exitosamente',
            data: productora
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateProductora = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, estado, slogan, descripcion } = req.body;

        const productora = await Productora.findByIdAndUpdate(
            id,
            { nombre: nombre?.trim(), estado, slogan, descripcion },
            { new: true, runValidators: true }
        );

        if (!productora) {
            return res.status(404).json({
                success: false,
                message: 'Productora no encontrada'
            });
        }

        res.json({
            success: true,
            message: 'Productora actualizada exitosamente',
            data: productora
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteProductora = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const productora = await Productora.findByIdAndDelete(id);

        if (!productora) {
            return res.status(404).json({
                success: false,
                message: 'Productora no encontrada'
            });
        }

        res.json({
            success: true,
            message: 'Productora eliminada exitosamente',
            data: productora
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getProductoras,
    createProductora,
    updateProductora,
    deleteProductora
};
