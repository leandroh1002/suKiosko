const { Producto } = require('../../db.js');

const postProductosService = async (data) => {
  try {
    // Intenta crear el producto
    const newProducto = await Producto.create(data);
    return newProducto;
  } catch (error) {
    // Verifica si el error es por violación de unicidad
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new Error('El nombre del producto ya existe');
    }
    throw error;
  }
};

module.exports = postProductosService;