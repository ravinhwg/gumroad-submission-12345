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
      const reviews = await query(`SELECT * FROM reviews OFFSET $1 LIMIT $2`, [
        Math.abs(page * perPage - perPage),
        Math.abs(perPage),
      ]);
      const total = await query("SELECT COUNT(*) FROM reviews");
      res.send({
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
      // TODO: add database query to add a review
      console.log("postReview");
    } catch (error) {
      throw new Error(error);
    }
  },
};
