const { Pool } = require("pg");

let pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: "",
  port: process.env.PGPORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
