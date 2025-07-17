const getGraficosService = require('../../services/graficos/getGraficos.service');

const getGraficosController = async (req, res) => {
  try {
    const graficos = await getGraficosService(); // Llama al servicio para obtener los datos
    res.status(200).json(graficos); // Responde con los datos obtenidos
  } catch (error) {
    console.error('Error en getGraficosController:', error);
    res.status(500).json({ error: 'Error al obtener los datos de gráficos' });
  }
};

module.exports = { getGraficosController };