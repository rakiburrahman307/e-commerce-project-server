const express = require("express");
const {
  getProducts,
  getSingleProduct,
} = require("../controllers/productControllers");
const authMiddleware = require("../middleware");
const router = express.Router();

// Get all products
router.get("/all", getProducts);
// // Login user
router.get("/:id", authMiddleware, getSingleProduct);
// // Logout user
// router.post('/logout', logoutUser);
// // Get user profile
// router.get('/user', authMiddleware, getUserProfile);

module.exports = router;
