const express = require("express");
const { postReview, getReviews, deleteReview, updateReview } = require("../controllers/reviewControllers");
const router = express.Router();

// get all reviews
router.get("/:id", getReviews);
// add a new review
router.post("/add", postReview);
// update review
router.put("/update", updateReview);
// delete the review post 
router.delete("/delete/:id", deleteReview);

module.exports = router;
