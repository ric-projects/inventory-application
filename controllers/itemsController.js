const db = require("../db/queries");

exports.getAllItems = async (req, res) => {
  //   res.send(`Hello world`);
  const items = await db.getAllItems();
  res.render("index", { items: items });
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

exports.getItemsByCategory = (req, res) => {
  //
};

exports.getItemById = async (req, res) => {
  const { itemid } = req.params;
  const results = await db.getItemById(itemid);
  // console.log(results);
  res.render("item", { item: results[0] });
};

exports.getItemsByBrand = async (req, res) => {
  //
};
