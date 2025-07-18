const { Router } = require("express");
const { getUnidadesController } = require("../controllers/unidades/getUnidades.controllers.js");

const router = Router();

router.get("/unidades", getUnidadesController);

module.exports = router;