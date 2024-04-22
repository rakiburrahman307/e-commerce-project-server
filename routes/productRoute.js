const express = require("express");
const { getProducts } = require("../controllers/productControllers");
const router = express.Router();

// Get all products
router.get("/all", getProducts);
// // Login user
// router.post('/login', loginUser);
// // Logout user
// router.post('/logout', logoutUser);
// // Get user profile
// router.get('/user', authMiddleware, getUserProfile);

module.exports = router;