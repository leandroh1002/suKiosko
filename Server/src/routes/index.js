const { Router } = require("express");
const router = Router();

const productos = require("./productos.route.js");
const ventas = require("./ventas.route.js");
const rubros = require("./rubros.route.js");
const graficos = require("./graficos.route.js");
const gastos = require("./gastos.route.js");
const unidades = require("./unidades.route.js");

router.use(gastos);
router.use(graficos);
router.use(productos);
router.use(ventas);
router.use(rubros);
router.use(unidades);

module.exports = router;
