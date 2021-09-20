require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const api = require("./entry");

app.use(cors());
app.use(express.json());
app.use("/api", api);
app.get("/", (req, res) => {
  res.send("gummyReviews API");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
