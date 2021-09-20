const router = require("express").Router();
const reviewRoutes = require("./routers/reviews");
router.use(reviewRoutes);
module.exports = router;
