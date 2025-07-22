const { getMasVendidosService } = require('../../../services/ventas/getMasVendidos.service.js'); // Asegúrate de que la ruta sea correcta

const getMasVendidosController = async (req, res) => {
  try {
    const { cantidad } = req.query; // Obtiene la cantidad desde los parámetros de consulta
    const limite = parseInt(cantidad, 10) || 10; // Si no se proporciona, usa 10 como valor por defecto

    const productosMasVendidos = await getMasVendidosService(limite); // Llama al servicio con el límite
    res.status(200).json(productosMasVendidos); // Responde con los productos más vendidos
  } catch (error) {
    console.error('Error en getMasVendidosController:', error);
    res.status(500).json({ error: 'Error al obtener los productos más vendidos' });
  }
};

module.exports = { getMasVendidosController };