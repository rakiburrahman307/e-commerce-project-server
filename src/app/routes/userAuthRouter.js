const express = require("express");
const {
  loginUser,
  registerNewUser,
  logoutUser,
  getUserProfile,
} = require("../controllers/userAuthControllers");
const authMiddleware = require("../middleware/auth");
const validateRequest = require("../middleware/validateRequest");
const userZodValidation = require("../zodValidationSchema/userZodValidation");
const router = express.Router();

// Register a new user
router.post(
  "/register",
  validateRequest(userZodValidation.createUserValidationSchema),
  registerNewUser
);
// Login user
router.post(
  "/login",
  validateRequest(userZodValidation.loginValidationSchema),
  loginUser
);
// Logout user
router.post("/logout", logoutUser);
// Get user profile
router.get("/user", authMiddleware, getUserProfile);

module.exports = router;
