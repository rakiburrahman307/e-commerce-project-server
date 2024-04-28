const express = require('express');
const { postReview, getReviews } = require('../controllers/reviewControllers');
const router = express.Router()




// get all comments
router.post('/all', getReviews); 
// add a new comment
router.post('/add', postReview); 


module.exports = router;