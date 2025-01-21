const express = require("express");
const authMiddleware = require("../middleware/auth");
const validateRequest = require("../middleware/validateRequest");
const userZodValidation = require("../zodValidationSchema/userZodValidation");
const authControllers = require("../controllers/userAuthControllers");
const router = express.Router();

// Register a new user
router.post(
  "/register",
  validateRequest(userZodValidation.createUserValidationSchema),
  authControllers.registerNewUser
);
// Login user
router.post(
  "/login",
  validateRequest(userZodValidation.loginValidationSchema),
  authControllers.loginUser
);
// Logout user
router.post("/logout", authControllers.logoutUser);
// Get user profile
router.get("/user", authMiddleware, authControllers.getUserProfile);

module.exports = router;
