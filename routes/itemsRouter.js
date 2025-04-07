const { Router } = require("express");
// To rename controller, like userController
const itemsController = require("../controllers/itemsController");
// Rename like usersRouter
const itemsRouter = Router();

itemsRouter.get("/", itemsController.getAllItems);

itemsRouter.get("/item/:itemid", itemsController.getItemById);
itemsRouter.get("/newitem", itemsController.getCatsAndBrands);
itemsRouter.get("/delitem/:itemid", itemsController.delItem);

itemsRouter.get("/cat", itemsController.getAllCategories);
itemsRouter.get("/cat/:catid", itemsController.getItemsByCategory);
itemsRouter.get("/delcat/:catid", itemsController.delCat);

itemsRouter.get("/brand", itemsController.getAllBrands);
itemsRouter.get("/brand/:brandid", itemsController.getItemsByBrand);
itemsRouter.get("/delbrand/:brandid", itemsController.delBrand);

itemsRouter.get("/newcat", itemsController.renderNewCatPage);
itemsRouter.post("/newcat", itemsController.postNewCategory);
itemsRouter.get("/newbrand", itemsController.renderNewBrandPage);
itemsRouter.post("/newbrand", itemsController.postNewBrand);

itemsRouter.post("/newitem", itemsController.addItem);

itemsRouter.get("/upditem/:itemid", itemsController.getItemToUpdate);
itemsRouter.post("/upditem/:itemid", itemsController.updateTheItem);

itemsRouter.get("/updbrand/:brandid", itemsController.getBrandToUpdate);
itemsRouter.post("/updbrand/:brandid", itemsController.updateBrandName);

itemsRouter.get("/updcat/:catid", itemsController.getCatToUpdate);
itemsRouter.post("/updcat/:catid", itemsController.updateCatName);

module.exports = itemsRouter;
