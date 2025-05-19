const { Rubro } = require("../../db.js"); // Asegúrate de que la ruta sea correcta

const getRubrosService = async () => {
  try {
    const products = await Rubro.findAll({
      attributes: ['id', 'nombre'], // Selecciona solo los campos necesarios
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

module.exports = getRubrosService;