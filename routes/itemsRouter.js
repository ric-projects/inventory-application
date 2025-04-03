const { Router } = require("express");
// To rename controller, like userController
const itemsController = require("../controllers/itemsController");
// Rename like usersRouter
const itemsRouter = Router();

itemsRouter.get("/", itemsController.getAllItems);

itemsRouter.get("/item/:itemid", itemsController.getItemById);

itemsRouter.get('/cat', itemsController.getAllCategories);
itemsRouter.get("/cat/:catid", itemsController.getItemsByCategory);

itemsRouter.get('/brand', itemsController.getAllBrands);
itemsRouter.get("/brand/:brandid", itemsController.getItemsByBrand);

module.exports = itemsRouter;
