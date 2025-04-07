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
  if (results.length < 1) {
    const title = await db.getCatName(catid);
    res.render("index", { items: results, title: title[0].cat_name });
  } else {
    res.render("index", { items: results, title: results[0].cat_name });
  }
};

exports.getItemById = async (req, res) => {
  const { itemid } = req.params;
  let results = await db.getItemById(itemid);
  // console.log(results);
  res.render("item", { item: results[0] });
};

exports.getItemsByBrand = async (req, res) => {
  const { brandid } = req.params;
  const results = await db.getItemsByBrand(brandid);
  if (results.length < 1) {
    const title = await db.getBrandName(brandid);
    res.render("index", { items: results, title: title[0].brand_name });
  } else {
    res.render("index", { items: results, title: results[0].brand_name });
  }
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

exports.delItem = async (req, res) => {
  const { itemid } = req.params;
  await db.delItem(itemid);
  res.redirect("/");
};
exports.delBrand = async (req, res) => {
  const { brandid } = req.params;
  await db.delBrand(brandid);
  res.redirect("/brand");
};
exports.delCat = async (req, res) => {
  const { catid } = req.params;
  await db.delCategory(catid);
  res.redirect("/cat");
};

exports.getItemToUpdate = async (req, res) => {
  const { itemid } = req.params;
  const item = await db.getItemById(itemid);
  const catAndBrands = await db.getCategoriesAndBrands();
  res.render("upditem", {
    brands: catAndBrands.brands,
    categories: catAndBrands.cats,
    item: item[0],
  });
};
exports.updateTheItem = async (req, res) => {
  const { itemid } = req.params;
  const { brand, category, part, price } = req.body;
  const brandAndCat = await db.getBrandAndCatByName(brand, category);
  await db.updateItem(
    itemid,
    part,
    price,
    brandAndCat.cat_id,
    brandAndCat.brand_id
  );
  const url = "/item/" + itemid;
  res.redirect(url);
};

exports.getBrandToUpdate = async (req, res) => {
  const { brandid } = req.params;
  const result = await db.getBrandById(brandid);
  // const url = "/upditem/" + brandid;
  res.render("updbrand", {
    brand_name: result.rows[0].brand_name,
    brand_id: brandid,
  });
};
exports.updateBrandName = async (req, res) => {
  const brandid = Number(req.params.brandid);
  const brand = req.body.brand;
  await db.updateBrandName(brandid, brand);
  res.redirect("/brand");
};
exports.getCatToUpdate = async (req, res) => {
  const { catid } = req.params;
  const result = await db.getCatToUpdate(catid);
  res.render("updcat", { cat_name: result.rows[0].cat_name, cat_id: catid });
};
exports.updateCatName = async (req, res) => {
  const catid = Number(req.params.catid);
  const catName = req.body.category;
  res.redirect("/cat");
};
