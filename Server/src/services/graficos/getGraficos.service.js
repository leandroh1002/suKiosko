const { Producto, Venta, DetalleVenta, sequelize } = require('../../db.js');
const { Op } = require('sequelize'); // Importa los operadores de Sequelize

const getGraficosService = async () => {
  try {
    // Variedad de productos: Cantidad de productos disponibles
    const cantidadProductos = await Producto.count();

    // Ganancias totales: Suma de las ganancias de todas las ventas
    const gananciasTotales = await Venta.sum('total');

    // Ventas totales: Cantidad de ventas realizadas
    const ventasTotales = await Venta.count();

    // Cantidad de transferencias: Ventas realizadas con el medio de pago "transferencia"
    const cantidadTransferencias = await Venta.count({
      where: { medio_pago: 'transferencia' },
    });

    // Producto más vendido: Producto con mayor cantidad vendida
    const productoMasVendido = await DetalleVenta.findOne({
      attributes: [
        'producto_id',
        [sequelize.fn('SUM', sequelize.col('cantidad')), 'total_vendido'],
      ],
      include: [
        {
          model: Producto,
          attributes: ['nombre'],
        },
      ],
      group: ['producto_id', 'Producto.id'],
      order: [[sequelize.fn('SUM', sequelize.col('cantidad')), 'DESC']],
    });

    // Variación semanal: Comparación de ventas actuales con las de la semana anterior
    const ventasSemanaActual = await Venta.count({
      where: {
        fecha: {
            [Op.gte]: sequelize.literal("NOW() - INTERVAL '7 DAYS'"),
        },
      },
    });

    const ventasSemanaAnterior = await Venta.count({
      where: {
        fecha: {
            [Op.between]: [
                sequelize.literal("NOW() - INTERVAL '14 DAYS'"),
                sequelize.literal("NOW() - INTERVAL '7 DAYS'"),
              ],
        },
      },
    });

        // Calcula la variación semanal
        let variacionSemanal;
        if (ventasSemanaAnterior === 0) {
        variacionSemanal = 'N/A'; // Si no hay ventas en la semana anterior, no se puede calcular la variación
        } else {
        variacionSemanal = ((ventasSemanaActual - ventasSemanaAnterior) / ventasSemanaAnterior) * 100;
        }
        return {
            cantidadProductos,
            gananciasTotales,
            ventasTotales,
            cantidadTransferencias,
            productoMasVendido: productoMasVendido?.Producto?.nombre || 'N/A',
            variacionSemanal: typeof variacionSemanal === 'number' ? `${variacionSemanal.toFixed(2)}%` : variacionSemanal,
          };
  } catch (error) {
    console.error('Error en getGraficosService:', error);
    throw error;
  }
};

module.exports = getGraficosService;