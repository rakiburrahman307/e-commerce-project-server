const express = require("express");
const { addCartProduct } = require("../controllers/cartControllers");
const router = express.Router();



router.post('/add', addCartProduct)


module.exports = router;
