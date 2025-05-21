const putProductosService = require('../../services/productos/putProductos.service.js');

const putProductosController = async (req, res) => {
  try {
    const { id } = req.params; // ID del producto a actualizar
    const data = req.body; // Datos a actualizar

    if (!id || !data) {
      return res.status(400).json({ error: 'ID y datos son requeridos' });
    }

    const updatedProducto = await putProductosService(id, data);

    res.status(200).json(updatedProducto); // Responde con el producto actualizado
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { putProductosController };