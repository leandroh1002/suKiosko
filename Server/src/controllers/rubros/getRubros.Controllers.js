const getRubrosService = require("../../services/rubros/getRubros.service.js");

const getRubrosController = async (req, res) => {
  try {
    const rubros = await getRubrosService();
    res.status(200).json(rubros);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};
module.exports = { getRubrosController };

