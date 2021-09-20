module.exports = {
  getReviews: async (req, res) => {
    try {
      // TODO: add database query to get all reviews
      console.log("getReviews");
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
