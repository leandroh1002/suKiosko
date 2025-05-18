const postRubrosService = require('../../services/rubros/postRubros.service.js');

const postRubrosController = async (req, res) => {
  try {
    const data = req.body; // Datos enviados en el cuerpo de la solicitud

    if (!data.nombre) {
      return res.status(400).json({ error: 'El nombre del rubro es obligatorio' });
    }

    const newRubro = await postRubrosService(data);

    res.status(201).json(newRubro); // Responde con el rubro creado
  } catch (error) {
    if (error.message === 'El nombre del rubro ya existe') {
      return res.status(409).json({ error: error.message }); // Código 409: Conflicto
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postRubrosController };