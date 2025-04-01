const { Router } = require("express");
// To rename controller, like userController
const itemsController = require("../controllers/itesmController");
// Rename like usersRouter
const itemsRouter = Router();

itemsRouter.get("/", itemsController.basicGet);

module.exports = itemsRouter;
