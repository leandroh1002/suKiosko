const { Producto } = require('../../db.js');

const putProductosService = async (id, data) => {
  try {
    // Busca el producto por ID
    const producto = await Producto.findByPk(id);

    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    // Objeto para almacenar los datos de actualización válidos
    const updateData = {};
    // Itera sobre los datos de entrada y filtra los valores no deseados
    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
        updateData[key] = data[key];
      }
    }

    // Actualiza el producto solo con los datos válidos
    await producto.update(updateData);

    return producto; // Retorna el producto actualizado
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

module.exports = putProductosService;