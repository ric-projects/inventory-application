const pool = require("./pool");

async function getAllItems() {
  const { rows } = await pool.query(
    `SELECT id, part, price, brand_name, cat_name FROM inventory 
    JOIN brands ON inventory.brand_id=brands.brand_id 
    JOIN category ON category.cat_id=inventory.category_id;`
  );
  return rows;
}

async function getAllBrands() {
  const { rows } = await pool.query(
    `SELECT DISTINCT inventory.brand_id, brand_name FROM brands
      JOIN inventory ON brands.brand_id=inventory.brand_id;`
  );
  return rows;
}

async function getAllCategories() {
  const { rows } = await pool.query(
    `SELECT DISTINCT cat_id, cat_name FROM category
      JOIN inventory ON category.cat_id=inventory.category_id;`
  );
  return rows;
}

async function getItemById(id) {
  const { rows } = await pool.query(
    `SELECT id, part, price, brand_name, cat_name FROM inventory 
    JOIN brands ON inventory.brand_id=brands.brand_id 
    JOIN category ON category.cat_id=inventory.category_id WHERE id= ($1);`,
    [id]
  );
  return rows;
}

async function getItemsByCategory(cat_id) {
  const { rows } = await pool.query(
    `SELECT id, part, price, brand_name, cat_name FROM inventory 
    JOIN brands ON inventory.brand_id=brands.brand_id 
    JOIN category ON category.cat_id=inventory.category_id; WHERE cat_id= ($1);`,
    [cat_id]
  );
  return rows;
}

module.exports = {
  getAllItems,
  getItemById,
  getItemsByCategory,
  getAllBrands,
  getAllCategories,
};
