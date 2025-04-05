const db = require("../db/queries");

exports.getAllItems = async (req, res) => {
  //   res.send(`Hello world`);
  const items = await db.getAllItems();
  res.render("index", { items: items, title: "All Items" });
};

exports.getAllCategories = async (req, res) => {
  //
  const items = await db.getAllCategories();
  res.render("category", { items: items });
};

exports.getAllBrands = async (req, res) => {
  const items = await db.getAllBrands();
  res.render("brand", { items: items });
};

exports.getItemsByCategory = async (req, res) => {
  const { catid } = req.params;
  const results = await db.getItemsByCategory(catid);
  res.render("index", { items: results, title: results[0].cat_name });
};

exports.getItemById = async (req, res) => {
  const { itemid } = req.params;
  const results = await db.getItemById(itemid);
  // console.log(results);
  res.render("item", { item: results[0] });
};

exports.getItemsByBrand = async (req, res) => {
  const { brandid } = req.params;
  const results = await db.getItemsByBrand(brandid);
  res.render("index", { items: results, title: results[0].brand_name });
};

exports.getCatsAndBrands = async (req, res) => {
  const results = await db.getCategoriesAndBrands();
  res.render("newItem", { brands: results.brands, categories: results.cats });
};

exports.renderNewCatPage = (req, res) => {
  res.render("newcat");
};
exports.renderNewBrandPage = (req, res) => {
  res.render("newbrand");
};

exports.postNewCategory = async (req, res) => {
  const { category } = req.body;
  await db.addCategory(category);
  res.redirect("/cat");
};

exports.postNewBrand = async (req, res) => {
  const { brand } = req.body;
  await db.addBrand(brand);
  // const items = await db.getAllBrands();
  // res.render("brand", { items: items });
  res.redirect("/brand");
};

exports.addItem = async (req, res) => {
  const { part, price, category, brand } = req.body;
  await db.addItem(part, price, category, brand);
  res.redirect("/");
};
