const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const api = require("./entry");

app.use("/api", api);
app.get("/", (req, res) => {
  res.send("gummyReviews API");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
