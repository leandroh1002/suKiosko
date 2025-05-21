const postProductosService = require('../../services/productos/postProductos.service.js');

const postProductosController = async (req, res) => {
  try {
    const data = req.body; // Datos enviados en el cuerpo de la solicitud
    console.log('Datos recibidos:', data);

    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'Se esperaba un array de productos' });
    }

    // Validar cada producto en el array
    for (const producto of data) {
      if (!producto.nombre || !producto.precio_compra) {
        console.log('Producto inválido:', producto);
        return res.status(400).json({ error: 'El nombre y el precio son obligatorios para cada producto' });
      }
    }

    // Procesar todos los productos
    const newProductos = [];
    for (const producto of data) {
      const newProducto = await postProductosService(producto);
      newProductos.push(newProducto);
    }

    res.status(201).json(newProductos); // Responde con los productos creados
  } catch (error) {
    console.error('Error en postProductosController:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postProductosController };