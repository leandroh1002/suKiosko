const { Router } = require("express");
const router = Router();

const productos = require("./productos.route.js");
const ventas = require("./ventas.route.js");
const rubros = require("./rubros.route.js");

router.use(productos);
router.use(ventas);
router.use(rubros);

module.exports = router;
