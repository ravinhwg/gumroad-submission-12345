const { query } = require("../config/db");

module.exports = {
  getReviews: async (req, res) => {
    // grab the page number and the number of items per page from query string
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 10;
    // validate the page number and per page number
    if (page < 1 || perPage < 1) {
      return res.status(400).json({
        message: "Invalid page or perPage number",
      });
    }

    try {
      const reviews = await query(
        `SELECT * FROM reviews ORDER BY created_at DESC OFFSET $1 LIMIT $2`,
        [Math.abs(page * perPage - perPage), Math.abs(perPage)]
      );
      const total = await query("SELECT COUNT(*) FROM reviews");
      res.status(200).json({
        reviews: reviews.rows,
        metaData: {
          total: +total.rows[0].count,
          page,
          resultsPerPage: perPage,
          isNextPage: page * perPage < total,
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
