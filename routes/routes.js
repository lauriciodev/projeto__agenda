const express = require("express");
const router = express();
//controllers
const homeController = require("../controllers/homeController");
const loginController = require("../controllers/loginController");
const contatoController = require("../controllers/contatoController");
const {loginRequired} = require("../middlewares/middleware");


//rota da home
router.get("/", homeController.home);

//rotas de login
router.get("/login/index",loginController.index);
router.post("/login/register",loginController.register);
router.post("/login/login",loginController.login);
router.get("/login/logout",loginController.logout);

//rotas de contato
router.get("/contato/index",loginRequired,contatoController.index);
router.post("/contato/register",loginRequired,contatoController.register);
router.get("/contato/index/:id",loginRequired,contatoController.editIndex);

module.exports = router;
