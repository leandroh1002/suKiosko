const { Router } = require('express');

//controllers
const { getMasVendidosController } = require('../controllers/ventas/MasVendidos/getMasVendidos.Controllers');
const { getVentasController } = require('../controllers/ventas/getVentas.Controllers');
const { postVentasController } = require('../controllers/ventas/postVentas.Controllers');
const { putVentasController } = require('../controllers/ventas/putVentas.Controllers');
const { deleteVentasController } = require('../controllers/ventas/deleteVentas.Controllers');


const ventasRouter = Router();

// Routes
ventasRouter.get('/masvendidos', getMasVendidosController);
ventasRouter.get('/ventas', getVentasController);
/**
 * @swagger
 * /ventas:
 *   get:
 *     summary: muestra un listado de ventas.
 *     tags:
 *       - Ventas
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
ventasRouter.put('/ventas', putVentasController);
/**
 * @swagger
 * /ventas:
 *   put:
 *     summary: muestra un listado de ventas.
 *     tags:
 *       - Ventas
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
ventasRouter.post('/ventas', postVentasController);
/**
 * @swagger
 * /ventas:
 *   post:
 *     summary: muestra un listado de ventas.
 *     tags:
 *       - Ventas
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
ventasRouter.delete('/ventas', deleteVentasController);
/**
 * @swagger
 * /ventas:
 *   delete:
 *     summary: muestra un listado de ventas.
 *     tags:
 *       - Ventas
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


module.exports = ventasRouter;
