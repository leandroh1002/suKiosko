const { Router } = require('express');
const { getGastosController, postGastosController } = require('../controllers/gastos.controllers');

const gastosRouter = Router();

gastosRouter.get('/gastos', getGastosController);
gastosRouter.post('/gastos', postGastosController);

module.exports = gastosRouter;
