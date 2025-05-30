const { Venta, DetalleVenta, Producto, MovimientoStock, conn } = require('../../db.js');

exports.crearVenta = async (data) => {
  console.log("data", data);

  const { fecha, medio_pago, empleado_id, cliente_id, items } = data;

  return await conn.transaction(async (t) => { // Usa conn.transaction en lugar de sequelize.transaction
    // Validar stock de todos los productos
    for (const item of items) {
      const producto = await Producto.findByPk(item.producto_id, { transaction: t });
      if (!producto) throw new Error(`Producto con ID ${item.producto_id} no encontrado`);

      if (producto.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para el producto "${producto.nombre}"`);
      }
    }

    // Calcular total
    const total = items.reduce((acc, item) => acc + item.precio_unitario * item.cantidad, 0);
    const total_compra = items.reduce((acc, item) => acc + item.precio_compra * item.cantidad, 0);
    const ganancia_total = total - total_compra;

    // Crear la venta
    const nuevaVenta = await Venta.create({
      fecha,
      medio_pago,
      ganancia_total,
      total,
      empleado_id,
      cliente_id,
    }, { transaction: t });
// console.log(items, "items desde el servicio");

    // Crear los detalles de la venta
    for (const item of items) {
      await DetalleVenta.create({
        venta_id: nuevaVenta.id,
        producto_id: item.producto_id,
        cantidad: item.cantidad,
        precio_unitario: item.precio_unitario,
        precio_compra: item.precio_compra,
        subtotal_compra: item.cantidad * item.precio_compra,
        subtotal: item.cantidad * item.precio_unitario,
        ganancia_producto: item.cantidad * item.precio_unitario - item.cantidad * item.precio_compra,
      }, { transaction: t });

      // Actualizar el stock del producto
      const producto = await Producto.findByPk(item.producto_id, { transaction: t });
      await producto.update({
        stock: producto.stock - item.cantidad,
      }, { transaction: t });
    }

    return nuevaVenta;
  });
};