const { Rubro } = require('../../db.js');

const putRubrosService = async (id, data) => {
  try {
    // Busca el rubro por ID
    const rubro = await Rubro.findByPk(id);

    if (!rubro) {
      throw new Error('Rubro no encontrado');
    }

    // Actualiza solo el campo "nombre"
    await rubro.update({ nombre: data.nombre });

    return rubro; // Retorna el rubro actualizado
  } catch (error) {
    console.error('Error updating rubro:', error);
    throw error;
  }
};

module.exports = putRubrosService;