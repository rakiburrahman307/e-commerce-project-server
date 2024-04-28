const { Review } = require("../models");
// get all user review 
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).send(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// post user reviews 
const postReview = async (req, res) => {
  const { productId, userId, userName, comment, rating } = req?.body;
  console.log(productId, userId, userName, comment, rating);
  try {
    const existingUserReview = await Review.findOne({userId});
    if (existingUserReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product" });
    }
    const reviews = new Review({
      productId,
      userId,
      userName,
      comment,
      rating,
    });
    await reviews.save();
    res.status(200).send({ message: "Review successfully Submit!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getReviews,
  postReview,
};
