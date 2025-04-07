const { Pool } = require("pg");

module.exports = new Pool({
  // host: "",
  // database: "",
  // port: "",

  //   ssl: true,
  connectionString: process.env.PG_CONN_STRING,
  ssl: true,
});
