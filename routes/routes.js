const express = require("express");
const router = express();
//controllers
const homeController = require("../controllers/homeController");
const loginController = require("../controllers/loginController");

//rota da home
router.get("/", homeController.home);

//rotas de login
router.get("/login/index",loginController.index);
router.post("/login/register",loginController.register);
router.post("/login/login",loginController.login);
router.get("/login/logout",loginController.logout);

module.exports = router;
