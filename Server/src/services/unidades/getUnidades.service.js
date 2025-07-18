const { UnidadMedida } = require('../../db.js');

const getUnidadesService = async () => {
  try {
    const unidades = await UnidadMedida.findAll();
    return unidades;
  } catch (error) {
    throw new Error('Error al obtener las unidades de medida: ' + error.message);
  }
};

module.exports = getUnidadesService;