const { DetalleVenta, Producto, sequelize } = require('../../db.js');

const getMasVendidosService = async (limite) => {
  try {
    // Consulta para obtener los productos más vendidos
    const productosMasVendidos = await DetalleVenta.findAll({
      attributes: [
        'producto_id',
        [sequelize.fn('SUM', sequelize.col('cantidad')), 'total_vendido'], // Calcula la suma de la cantidad vendida
      ],
      include: [
        {
          model: Producto,
          attributes: ['id', 'nombre', 'redondeo', 'codigo_barra'], // Selecciona los campos necesarios del producto
        },
      ],
      group: ['producto_id', 'Producto.id'], // Agrupa por producto_id y Producto.id
      order: [[sequelize.fn('SUM', sequelize.col('cantidad')), 'DESC']], // Ordena por total_vendido
      limit: limite, // Limita la cantidad de resultados
    });

    return productosMasVendidos;
  } catch (error) {
    console.error('Error en getMasVendidosService:', error);
    throw error;
  }
};

module.exports = { getMasVendidosService };