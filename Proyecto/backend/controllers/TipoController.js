const Tipo = require('../models/Tipo');
const { request, response } = require('express');

const getTipos = async (req = request, res = response) => {
    try {
        const tipos = await Tipo.find().sort({ nombre: 1 });
        res.json({
            success: true,
            data: tipos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createTipo = async (req = request, res = response) => {
    try {
        const { nombre, descripcion = '' } = req.body;
        
        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'El nombre es obligatorio'
            });
        }

        const tipoDb = await Tipo.findOne({ nombre: nombre.trim() });
        if (tipoDb) {
            return res.status(400).json({
                success: false,
                message: 'El tipo ya existe'
            });
        }

        const tipo = new Tipo({ nombre: nombre.trim(), descripcion });
        await tipo.save();
        res.status(201).json({
            success: true,
            message: 'Tipo creado exitosamente',
            data: tipo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateTipo = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        const tipo = await Tipo.findByIdAndUpdate(
            id,
            { nombre: nombre?.trim(), descripcion },
            { new: true, runValidators: true }
        );

        if (!tipo) {
            return res.status(404).json({
                success: false,
                message: 'Tipo no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Tipo actualizado exitosamente',
            data: tipo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteTipo = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const tipo = await Tipo.findByIdAndDelete(id);

        if (!tipo) {
            return res.status(404).json({
                success: false,
                message: 'Tipo no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Tipo eliminado exitosamente',
            data: tipo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getTipos,
    createTipo,
    updateTipo,
    deleteTipo
};
