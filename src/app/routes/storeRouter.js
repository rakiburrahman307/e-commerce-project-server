const express = require('express');
const storeControllers = require('../controllers/storeControllers');

const router = express.Router()

// create a new store 
router.post("/create-store", storeControllers.createStore)



module.exports = router;