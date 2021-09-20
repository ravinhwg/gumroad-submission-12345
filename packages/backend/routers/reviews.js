const router = require("express").Router();
const reviewController = require("../controllers/reviewController");

router.post("/reviews", reviewController.postReview);
router.get("/reviews", reviewController.getReviews);

module.exports = router;
