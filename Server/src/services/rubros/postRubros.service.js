const { Rubro } = require('../../db.js');

const postRubrosService = async (data) => {
  try {
    // Intenta crear el rubro
    const newRubro = await Rubro.create(data);
    return newRubro;
  } catch (error) {
    // Verifica si el error es por violación de unicidad
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new Error('El nombre del rubro ya existe');
    }
    throw error;
  }
};

module.exports = postRubrosService;