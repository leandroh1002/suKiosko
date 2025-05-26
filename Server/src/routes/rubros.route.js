const { Router } = require('express');

//controllers
const { getRubrosController } = require('../controllers/rubros/getRubros.Controllers');
const { postRubrosController } = require('../controllers/rubros/postRubros.Controllers');
const { putRubrosController } = require('../controllers/rubros/putRubros.Controllers');
// const { deleteRubrosController } = require('../controllers/rubros/deleteRubros.Controllers');


const rubrosRouter = Router();

// Routes
rubrosRouter.get('/rubros', getRubrosController);
/**
 * @swagger
 * /rubros:
 *   get:
 *     summary: Muestra un listado de rubros.
 *     tags:
 *       - Rubros
 *     responses:
 *       200:
 *         description: Lista de rubros obtenida con éxito.
 *       400:
 *         description: Error en la solicitud.
 */

rubrosRouter.put('/rubros/:id', putRubrosController);
/**
 * @swagger
 * /rubros:
 *   put:
 *     summary: muestra un listado de rubros.
 *     tags:
 *       - Rubros
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

rubrosRouter.post('/rubros', postRubrosController);
/**
 * @swagger
 * /rubros:
 *   post:
 *     summary: muestra un listado de rubros.
 *     tags:
 *       - Rubros
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: El nombre del rubro que quiere agregar.
 *     responses:
 *       201:
 *         description: Opción creada exitosamente.
 *       409:
 *         description: El rubro ya existe.
 *       500:
 *         description: Error interno del servidor.
 */
// rubrosRouter.delete('/rubros', deleteRubrosController);
// /**
//  * @swagger
//  * /rubros:
//  *   delete:
//  *     summary: muestra un listado de rubros.
//  *     tags:
//  *       - Rubros
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/x-www-form-urlencoded:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               idPeople:
//  *                 type: string
//  *                 description: ID del usuario.
//  *               idOption:
//  *                 type: integer
//  *                 description: ID de la opción a eliminar.
//  *     responses:
//  *       200:
//  *         description: Opción eliminada exitosamente.
//  *       400:
//  *         description: Error en los datos de la solicitud.
//  *       401:
//  *         description: No autorizado para eliminar la opción.
//  *       404:
//  *         description: No se encontraron registros para eliminar.
//  *       500:
//  *         description: Error interno del servidor.
//  */


module.exports = rubrosRouter;
