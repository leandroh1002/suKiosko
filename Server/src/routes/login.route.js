const { Router } = require("express");
const postLogin = require("../controllers/login/postLogin.controllers.js");

const router = Router();

router.post("/login", postLogin);

module.exports = router;
