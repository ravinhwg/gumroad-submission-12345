const router = require("express").Router();
const reviewController = require("../controllers/reviewController");

router.post("/reviews", reviewController.postReview);
router.get("/reviews", reviewController.getReviews);
router.get("/reviews/average", reviewController.getAverageReview);
module.exports = router;
