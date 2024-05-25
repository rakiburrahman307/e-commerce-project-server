const express = require("express");
const {
  getProducts,
  getSingleProduct,
  relatedProduct,
} = require("../controllers/productControllers");
const router = express.Router();

// Get all products
router.get("/all", getProducts);
// get specific products
router.get("/:id", getSingleProduct);
// get related products
router.get('/related/:category', relatedProduct);
// Product add to carts
// router.post('/user', getUserProfile);

module.exports = router;
