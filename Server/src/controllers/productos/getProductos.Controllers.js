const getProductosService = require('../../services/productos/getProductos.service.js');

const getProductosController = async (req, res) => {
  try {
    const filters = req.query; // Obtén los filtros desde la query string
    const products = await getProductosService(filters);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProductosController };