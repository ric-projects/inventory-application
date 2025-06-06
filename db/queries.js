const pool = require("./pool");

async function getAllItems() {
  const { rows } = await pool.query(
    `SELECT id, part, price, brand_name, cat_name FROM inventory 
    LEFT OUTER JOIN brands ON inventory.brand_id=brands.brand_id 
    LEFT OUTER JOIN category ON category.cat_id=inventory.category_id;`
  );
  return rows;
}

async function getAllBrands() {
  const { rows } = await pool.query(
    `SELECT DISTINCT brand_id, brand_name FROM brands;`
  );
  // `SELECT DISTINCT inventory.brand_id, brand_name FROM brands
  //   JOIN inventory ON brands.brand_id=inventory.brand_id;`
  return rows;
}

async function getAllCategories() {
  const { rows } = await pool.query(
    `SELECT DISTINCT cat_id, cat_name FROM category;`
  );

  // `SELECT DISTINCT cat_id, cat_name FROM category
  //     JOIN inventory ON category.cat_id=inventory.category_id;`;
  return rows;
}

async function getItemById(id) {
  const { rows } = await pool.query(
    `SELECT id, part, price, brand_name, cat_name FROM inventory 
    LEFT OUTER JOIN brands ON inventory.brand_id=brands.brand_id 
    LEFT OUTER JOIN category ON category.cat_id=inventory.category_id WHERE id= ($1);`,
    [id]
  );
  return rows;
}

async function getItemsByCategory(cat_id) {
  const { rows } = await pool.query(
    `SELECT id, part, price, brand_name, cat_name FROM inventory 
    JOIN brands ON inventory.brand_id=brands.brand_id 
    JOIN category ON category.cat_id=inventory.category_id WHERE cat_id= ($1);`,
    [cat_id]
  );
  return rows;
}

async function getItemsByBrand(brand_id) {
  const { rows } = await pool.query(
    `SELECT id, part, price, brand_name, cat_name FROM inventory
    JOIN brands ON inventory.brand_id=brands.brand_id
    JOIN category ON category.cat_id=inventory.category_id WHERE inventory.brand_id= ($1);`,
    [brand_id]
  );
  return rows;
}

async function getCategoriesAndBrands() {
  const cats = (await pool.query(`SELECT * FROM category;`)).rows;
  const brands = (await pool.query(`SELECT * FROM brands;`)).rows;
  return { cats, brands };
}

async function addCategory(cat) {
  await pool.query(`INSERT INTO category (cat_name) VALUES ($1);`, [cat]);
}
async function addBrand(brand) {
  await pool.query(`INSERT INTO brands (brand_name) VALUES ($1);`, [brand]);
}
async function delCategory(cat) {
  await pool.query(`DELETE FROM category WHERE cat_id=($1)`, [cat]);
}
async function delBrand(brand) {
  await pool.query(`DELETE FROM brands WHERE brand_id=($1)`, [brand]);
}

async function addItem(part, price, category, brand) {
  const items = await getCatAndBrandID(category, brand);
  await pool.query(
    `INSERT INTO inventory (part, price, category_id, brand_id)
      VALUES ($1, $2, $3, $4);`,
    [part, price, items.cat_id, items.brand_id]
  );
}

async function getCatAndBrandID(category, brand) {
  const cat_id = (
    await pool.query(`SELECT * FROM category WHERE cat_name = ($1);`, [
      category,
    ])
  ).rows[0].cat_id;
  const brand_id = (
    await pool.query(`SELECT * FROM brands WHERE brand_name = ($1);`, [brand])
  ).rows[0].brand_id;
  return { cat_id, brand_id };
}

async function delItem(itemid) {
  await pool.query(`DELETE FROM inventory WHERE id=($1);`, [itemid]);
}

async function getCatName(cat_id) {
  const { rows } = await pool.query(
    `SELECT cat_name FROM category WHERE cat_id=($1);`,
    [cat_id]
  );
  return rows;
}
async function getBrandName(brandid) {
  const { rows } = await pool.query(
    `SELECT brand_name FROM brands WHERE brand_id=($1);`,
    [brandid]
  );
  return rows;
}

async function getBrandAndCatByName(brand, cat) {
  const { brand_id } = (
    await pool.query(
      `
    SELECT brand_id FROM brands WHERE brand_name=$1;
    `,
      [brand]
    )
  ).rows[0];
  const { cat_id } = (
    await pool.query(
      `
    SELECT cat_id FROM category WHERE cat_name=$1;`,
      [cat]
    )
  ).rows[0];
  return { brand_id, cat_id };
}

async function updateItem(itemid, part, price, category, brand) {
  await pool.query(
    `
    UPDATE inventory 
    SET part=($2), price=($3), category_id=($4), brand_id=($5) 
    WHERE id=($1);
  `,
    [itemid, part, price, category, brand]
  );
}

async function getBrandById(brand_id) {
  return await pool.query(`SELECT brand_name FROM brands WHERE brand_id=($1)`, [
    brand_id,
  ]);
}

async function updateBrandName(brand_id, brand_name) {
  await pool.query(
    `
    UPDATE brands SET brand_name=($2) WHERE brand_id=($1);`,
    [brand_id, brand_name]
  );
}
async function getCatToUpdate(cat_id) {
  return await pool.query(`SELECT cat_name FROM category WHERE cat_id=($1);`, [
    cat_id,
  ]);
}
async function updateCatName(cat_id, cat_name) {
  return await pool.query(
    `UPDATE category SET cat_name=($2) WHERE cat_id=($1);`,
    [cat_id, cat_name]
  );
}

module.exports = {
  getAllItems,
  getItemById,
  getItemsByCategory,
  getAllBrands,
  getAllCategories,
  getItemsByBrand,
  getCategoriesAndBrands,
  addCategory,
  addBrand,
  delCategory,
  delBrand,
  addItem,
  delItem,
  getCatName,
  getBrandName,
  updateItem,
  getBrandAndCatByName,
  getBrandById,
  updateBrandName,
  getCatToUpdate,
  updateCatName,
};
