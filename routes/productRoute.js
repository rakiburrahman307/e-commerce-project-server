const express = require("express");
const {
  getProducts,
  getSingleProduct,
  relatedProduct,
} = require("../controllers/productControllers");
const authMiddleware = require("../middleware");
const router = express.Router();

// Get all products
router.get("/all", getProducts);
// get specific products
router.get("/:id", authMiddleware, getSingleProduct);
// get related products
router.get('/related/:category', relatedProduct);
// // Get user profile
// router.get('/user', authMiddleware, getUserProfile);

module.exports = router;
