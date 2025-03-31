const { Router } = require("express");
// To rename controller, like userController
const controller = require("../controllers/controller");
// Rename like usersRouter
const router = Router();

router.get("/", controller.basicGet);

module.exports = router;
