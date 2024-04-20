const express = require('express');
const { loginUser, registerNewUser, logoutUser, getUserProfile } = require('../controllers/userAuthControllers');
const authMiddleware = require('../middleware');
const router = express.Router();



// Register a new user
router.post('/register', registerNewUser); 
// Login user
router.post('/login', loginUser);
// Logout user
router.post('/logout', logoutUser);
// Get user profile
router.get('/user', authMiddleware, getUserProfile);

  
module.exports = router;