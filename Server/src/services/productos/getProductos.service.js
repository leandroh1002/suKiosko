const { Producto, UnidadMedida } = require("../../db.js"); // Asegúrate de que la ruta sea correcta
const { Op } = require("sequelize"); // Importa operadores de Sequelize

const getProductosService = async (filters) => {
  console.log(filters, "filters en getProductosService");
  
  try {
    const whereClause = {};

    // Agrega filtros dinámicos si se proporcionan
    if (filters.nombre) {
      whereClause.nombre = { [Op.like]: `%${filters.nombre}%` }; // Filtro por nombre (LIKE)
    }
    if (filters.codigo_barra) {
      whereClause.codigo_barra = { [Op.like]: `%${filters.codigo_barra}%` }; // Filtro por código de barra (LIKE)
    }

    const products = await Producto.findAll({
      attributes: ['id', 'nombre', 'precio_unitario', 'descripcion', 'codigo_barra', 'stock', 'precio_compra'], // Selecciona solo los campos necesarios
      where: whereClause, // Aplica los filtros dinámicos
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