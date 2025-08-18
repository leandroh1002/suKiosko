const postProductosService = require('../../services/productos/postProductos.service.js');

const postProductosController = async (req, res) => {
  try {
    const data = req.body; // Datos enviados en el cuerpo de la solicitud
    console.log('Datos recibidos:', data);

    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'Se esperaba un array de productos' });
    }

    // Procesar y transformar todos los productos
    const newProductos = [];
    for (const producto of data) {
      // Mapear los campos del JSON a los campos del modelo de la base de datos
      const transformedProducto = {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        codigo_barra: producto.codigo_barra,
        stock: producto.stock,
        precio_compra: producto.precio_compra || 0.00, // Usar precio_unitario o default
        redondeo: producto.redondeo,
        vencimiento: producto.Vencimiento ? producto.Vencimiento.split('/').reverse().join('-') : '2050-01-01', // Convertir DD/MM/YYYY a YYYY-MM-DD
        unidad_medida_id: producto.unidad_medida_id,
        rubro_id: producto.rubro_id,
      };

      // Validar que los campos requeridos existan después de la transformación
      if (!transformedProducto.nombre || !transformedProducto.redondeo || !transformedProducto.unidad_medida_id || !transformedProducto.rubro_id) {
        console.log('Producto inválido después de transformar:', transformedProducto);
        return res.status(400).json({ 
          error: 'Faltan campos obligatorios. Asegúrese de que nombre, Redondeo, UnidadMedida y Rubro estén presentes en cada producto.',
          producto_fallido: transformedProducto 
        });
      }
      
      const newProducto = await postProductosService(transformedProducto);
      newProductos.push(newProducto);
    }

    res.status(201).json(newProductos); // Responde con los productos creados
  } catch (error) {
    console.error('Error en postProductosController:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postProductosController };