const { Pool } = require("pg");

let pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: "",
  port: process.env.PGPORT,
});

pool.on("connect", (info) => {
  console.log(
    "POSTGRES: " +
      info.connectionParameters.user +
      " connected to " +
      info.connectionParameters.host +
      ":" +
      info.connectionParameters.port +
      "/" +
      info.connectionParameters.database
  );
});
pool.on("error", () => {
  console.log("POSTGRES: Failed to connect to database");
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};
