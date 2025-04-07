require("dotenv").config();
const { Client } = require("pg");

console.log(`User is: ` + process.env.USER);

const SQL = `
CREATE TABLE IF NOT EXISTS brands (
  brand_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  brand_name VARCHAR (255) NOT NULL
);

CREATE TABLE IF NOT EXISTS category (
  cat_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  cat_name VARCHAR (50) NOT NULL
);

CREATE TABLE IF NOT EXISTS inventory (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  part VARCHAR (255),
  category_id SMALLINT CHECK (category_id > 0),
  price SMALLINT CHECK (price > 0),
  brand_id SMALLINT CHECK (brand_id > 0)
);

INSERT INTO inventory (part, category_id, price, brand_id)
VALUES
  ('Deck', '1', '60', '1'),
  ('Deck', '1', '35', '3'),
  ('Trucks', '1', '60', '3'),
  ('formula four wheels', '1', '40', '4'),
  ('SPF wheels', '1', '30', '5'),
  ('flight deck', '1', '68', '2'),
  ('logo hoodie', '2', '35', '4'),
  ('socks', '2', '15', '2');

INSERT INTO brands (brand_name)
VALUES
  ('Primitive'),
  ('Santa Cruz'),
  ('Element'),
  ('Spitfire'),
  ('Bones');

INSERT INTO category (cat_name)
VALUES
  ('Parts'),
  ('Apparel');

ALTER TABLE inventory
  ADD CONSTRAINT Fk_catid
    FOREIGN KEY(category_id)
    REFERENCES category(cat_id)
    ON UPDATE CASCADE
    ON DELETE SET NULL;

ALTER TABLE inventory
  ADD CONSTRAINT Fk_brandid
    FOREIGN KEY (brand_id)
    REFERENCES brands(brand_id)
    ON UPDATE CASCADE
    ON DELETE SET NULL;
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    // ssl: true,
    connectionString: process.env.PG_CONN_STRING,
    ssl: true,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}

main();

// Constraints added :
//  ALTER TABLE inventory ADD CONSTRAINT Fk_catid FOREIGN KEY(category_id) REFERENCES category(cat_id) ON UPDATE CASCADE ON DELETE SET NULL;
//  ALTER TABLE inventory ADD CONSTRAINT Fk_brandid FOREIGN KEY (brand_id) REFERENCES brands(brand_id) ON UPDATE CASCADE ON DELETE SET NULL;

// Show entire table:
// SELECT * FROM inventory
//  JOIN brands ON inventory.brand_id = brands.brand_id
//  JOIN category ON category.cat_id = inventory.category_id;
