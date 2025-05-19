const putRubrosService = require('../../services/rubros/putRubros.service.js');

const putRubrosController = async (req, res) => {
    //esta funcionando pero creo que luego lo enviare por body, tengo que modificar la ruta y sacar el :id
  try {
    const { id } = req.params; // ID del rubro a actualizar
    const { nombre } = req.body; // Solo se espera el campo "nombre"

    if (!id || !nombre) {
      return res.status(400).json({ error: 'ID y nombre son requeridos' });
    }

    const updatedRubro = await putRubrosService(id, { nombre });

    res.status(200).json(updatedRubro); // Responde con el rubro actualizado
  } catch (error) {
    console.log('error', error);
    
    if (error.message === 'Rubro no encontrado') {
      return res.status(404).json({ error: error.message }); // Código 404: No encontrado
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = { putRubrosController };