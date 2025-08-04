const { Producto, UnidadMedida, Rubro } = require("../../db.js"); // Asegúrate de que la ruta sea correcta
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
      attributes: ['id', 'nombre', 'redondeo', 'descripcion', 'codigo_barra', 'stock', 'precio_compra', 'vencimiento'], // Selecciona solo los campos necesarios
      where: whereClause, // Aplica los filtros dinámicos
      include: [
        {
          model: UnidadMedida, // Incluye la relación con UnidadMedida
          as: 'unidadMedida', // Define el alias para la relación
          attributes: ['id', 'nombre', 'simbolo', 'factor_conversion'], // Selecciona los campos necesarios de UnidadMedida
        },
        {
          model: Rubro, // Incluye la relación con Rubro
          attributes: ['nombre'], // Selecciona solo el nombre del rubro
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