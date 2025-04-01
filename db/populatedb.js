require("dotenv").config();
const { Client } = require("pg");

console.log(`User is: ` + process.env.USER);

const SQL = `
CREATE TABLE ...

INSERT INTO ...

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    // ssl: true,
    connectionString: process.env.PG_CONN_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}

main();
