const { Venta, DetalleVenta, Producto, Empleado } = require('../../db.js');

const getVentasService = async () => {
  try {
    // Obtiene todas las ventas con sus detalles y productos relacionados
    const ventas = await Venta.findAll({
      include: [
        {
          model: DetalleVenta,
          include: [
            {
              model: Producto,
              attributes: ['id', 'nombre', 'redondeo'], // Selecciona solo los campos necesarios
            },
          ],
        },
        {
            model: Empleado,
            attributes: ['id', 'nombre'], // Selecciona solo los campos necesarios
        }
      ],
    });
    return ventas;
  } catch (error) {
    console.error('Error en getVentasService:', error);
    throw error;
  }
};

module.exports = { getVentasService };