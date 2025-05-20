const { Producto } = require('../../db.js');

const putProductosService = async (id, data) => {
  try {
    // Busca el producto por ID
    const producto = await Producto.findByPk(id);

    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    // Actualiza el producto con los datos proporcionados
    await producto.update(data);

    return producto; // Retorna el producto actualizado
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

module.exports = putProductosService;