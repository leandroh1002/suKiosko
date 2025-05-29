const ventasService = require('../../services/ventas/postVentas.service.js');

const postVentasController = async (req, res) => {
  console.log("data", req.body);
  
    try {
        const venta = await ventasService.crearVenta(req.body);
        res.status(201).json({ mensaje: 'Venta registrada exitosamente', venta });
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
      }
};

module.exports = { postVentasController };