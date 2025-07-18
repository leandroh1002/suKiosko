const { Gasto } = require('../db');

const getGastosController = async (req, res) => {
    try {
        const gastos = await Gasto.findAll();
        res.status(200).json(gastos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const postGastosController = async (req, res) => {
    try {
        const { monto, descripcion, tipo } = req.body;
        const nuevoGasto = await Gasto.create({ monto, descripcion, tipo });
        res.status(201).json(nuevoGasto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getGastosController, postGastosController };
