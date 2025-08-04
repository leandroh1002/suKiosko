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
      // Asegurarse de que precio_unitario esté disponible para cálculos posteriores
      item.precio_unitario = producto.precio_compra;
    }
console.log("items", items);

    // Calcular total
    const total = items.reduce((acc, item) => acc + item.redondeo * item.cantidad, 0);
    const total_compra = items.reduce((acc, item) => acc + item.precio_unitario * item.cantidad, 0);
    const ganancia_total = total - total_compra;
    const recompra = total - ganancia_total;

    // Crear la venta
    const nuevaVenta = await Venta.create({
      fecha,
      medio_pago,
      ganancia_total,
      recompra,
      total,
      empleado_id,
      cliente_id,
    }, { transaction: t });
console.log(items, "items desde el servicio");

    // Crear los detalles de la venta
    for (const item of items) {
      await DetalleVenta.create({
        venta_id: nuevaVenta.id,
        producto_id: item.producto_id,
        cantidad: item.cantidad,
        redondeo: item.redondeo,
        precio_compra: item.precio_compra,
        subtotal_compra: item.cantidad * item.precio_compra,
        subtotal: item.cantidad * item.redondeo,
        ganancia_producto: item.cantidad * item.redondeo - item.cantidad * item.precio_compra,
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