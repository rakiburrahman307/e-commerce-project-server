const { Review } = require("../models");
// get all user review
const getReviews = async (req, res) => {
  try {
    const productId = req?.params?.id;
    const reviews = await Review.find({ productId: productId });
    res.status(200).send(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// post user reviews
const postReview = async (req, res) => {
  try {
    const { productId, userId, userName, comment, rating } = req?.body;
    const existingUserReview = await Review.findOne({
      userId: userId,
      productId: productId,
    });
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
const deleteReview = async (req, res) => {
  try {
    const reviewId = req?.params?.id;
    console.log(reviewId);
    await Review.findByIdAndDelete({ _id: reviewId });
    res.status(200).send({ message: "Review successfully deleted!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const updateReview = async (req, res) => {
  try {
    const { id, comment, rating } = req?.body;
    console.log(id, comment, rating);
    const updateDoc = { $set: { comment: comment, rating: rating } };
    const result = await Review.findByIdAndUpdate(id, updateDoc, {
      new: true,
    });
    if (!result) {
      return res.status(404).send({ error: "Review not found" });
    }

    res.status(200).send({ message: "Review Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
module.exports = {
  getReviews,
  postReview,
  deleteReview,
  updateReview,
};
