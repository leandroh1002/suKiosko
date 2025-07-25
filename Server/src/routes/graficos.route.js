const { Router } = require('express');

//controllers
const { getGraficosController } = require('../controllers/graficos/getGraficos.controllers.js');
const { postProductosController } = require('../controllers/productos/postProductos.Controllers');
const { putProductosController } = require('../controllers/productos/putProductos.Controllers');
const { deleteProductosController } = require('../controllers/productos/deleteProductos.Controllers');


const graficosRouter = Router();

// Routes
graficosRouter.get('/graficos', getGraficosController);
/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Muestra un listado de productos.
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Lista de productos obtenida con éxito.
 *       400:
 *         description: Error en la solicitud.
 */
graficosRouter.put('/productos', putProductosController);
/**
 * @swagger
 * /productos:
 *   put:
 *     summary: muestra un listado de productos.
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               idPeople:
 *                 type: string
 *                 description: ID del usuario.
 *               idOption:
 *                 type: integer
 *                 description: ID de la opción a eliminar.
 *     responses:
 *       200:
 *         description: Opción eliminada exitosamente.
 *       400:
 *         description: Error en los datos de la solicitud.
 *       401:
 *         description: No autorizado para eliminar la opción.
 *       404:
 *         description: No se encontraron registros para eliminar.
 *       500:
 *         description: Error interno del servidor.
 */
graficosRouter.post('/productos', postProductosController);
/**
 * @swagger
 * /productos:
 *   post:
 *     summary: muestra un listado de productos.
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               idPeople:
 *                 type: string
 *                 description: ID del usuario.
 *               idOption:
 *                 type: integer
 *                 description: ID de la opción a eliminar.
 *     responses:
 *       200:
 *         description: Opción eliminada exitosamente.
 *       400:
 *         description: Error en los datos de la solicitud.
 *       401:
 *         description: No autorizado para eliminar la opción.
 *       404:
 *         description: No se encontraron registros para eliminar.
 *       500:
 *         description: Error interno del servidor.
 */
graficosRouter.delete('/productos', deleteProductosController);
/**
 * @swagger
 * /productos:
 *   delete:
 *     summary: muestra un listado de productos.
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               idPeople:
 *                 type: string
 *                 description: ID del usuario.
 *               idOption:
 *                 type: integer
 *                 description: ID de la opción a eliminar.
 *     responses:
 *       200:
 *         description: Opción eliminada exitosamente.
 *       400:
 *         description: Error en los datos de la solicitud.
 *       401:
 *         description: No autorizado para eliminar la opción.
 *       404:
 *         description: No se encontraron registros para eliminar.
 *       500:
 *         description: Error interno del servidor.
 */


module.exports = graficosRouter;
