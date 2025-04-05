const { Router } = require("express");
// To rename controller, like userController
const itemsController = require("../controllers/itemsController");
// Rename like usersRouter
const itemsRouter = Router();

itemsRouter.get("/", itemsController.getAllItems);

itemsRouter.get("/item/:itemid", itemsController.getItemById);
itemsRouter.get("/newitem", itemsController.getCatsAndBrands);

itemsRouter.get("/cat", itemsController.getAllCategories);
itemsRouter.get("/cat/:catid", itemsController.getItemsByCategory);

itemsRouter.get("/brand", itemsController.getAllBrands);
itemsRouter.get("/brand/:brandid", itemsController.getItemsByBrand);

itemsRouter.get("/newcat", itemsController.renderNewCatPage);
itemsRouter.post("/newcat", itemsController.postNewCategory);
itemsRouter.get("/newbrand", itemsController.renderNewBrandPage);
itemsRouter.post("/newbrand", itemsController.postNewBrand);

itemsRouter.post("/newitem", itemsController.addItem);

module.exports = itemsRouter;
