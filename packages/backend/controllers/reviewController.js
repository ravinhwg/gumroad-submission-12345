const { query } = require("../config/db");

module.exports = {
  getReviews: async (req, res) => {
    try {
      const reviews = await query(
        `SELECT * FROM reviews ORDER BY created_at DESC`
      );
      const total = await query("SELECT COUNT(*) FROM reviews");
      res.status(200).json({
        reviews: reviews.rows,
        metaData: {
          total: +total.rows[0].count,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  postReview: async (req, res) => {
    try {
      // validate incoming reviews
      const { starCount, reviewText } = req.body;
      if (!starCount || !reviewText || starCount < 1 || starCount > 5) {
        return res.status(400).json({
          message: "Invalid review",
        });
      }

      await query(
        "INSERT INTO reviews(star_count, review_text) VALUES($1, $2)",
        [+starCount, reviewText]
      );
      res.status(201).json({
        message: "Review created",
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  getAverageReview: async (req, res) => {
    try {
      const average = await query("SELECT AVG(star_count) FROM reviews");
      res.status(200).json({
        average: +average.rows[0].avg,
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
