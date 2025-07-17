const getUnidadesService = require('../../services/unidades/getUnidades.service.js');

const getUnidadesController = async (req, res) => {
  try {
    const unidades = await getUnidadesService();
    res.status(200).json(unidades);
  } catch (error) {
    console.error('Error en getUnidadesController:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUnidadesController };