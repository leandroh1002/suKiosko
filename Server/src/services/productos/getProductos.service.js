const { Producto, UnidadMedida } = require("../../db.js"); // Asegúrate de que la ruta sea correcta

const getProductosService = async () => {
  try {
    const products = await Producto.findAll({
      attributes: ['id', 'nombre', 'precio_unitario', 'descripcion'], // Selecciona solo los campos necesarios
      include: [
        {
          model: UnidadMedida, // Incluye la relación con UnidadMedida
          attributes: ['id', 'nombre', 'simbolo'], // Selecciona los campos necesarios de UnidadMedida
        },
      ],
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

module.exports = getProductosService;