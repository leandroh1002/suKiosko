const { getVentasService } = require('../../services/ventas/getVentas.service.js'); // Asegúrate de que la ruta sea correcta

const getVentasController = async (req, res) => {
  try {
    const ventas = await getVentasService(); // Llama al servicio para obtener las ventas
    res.status(200).json(ventas); // Responde con las ventas obtenidas
  } catch (error) {
    console.error('Error en getVentasController:', error);
    res.status(500).json({ error: 'Error al obtener las ventas' });
  }
};

module.exports = { getVentasController };