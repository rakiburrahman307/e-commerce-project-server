const express = require("express");
const { addCartProduct, getCartProducts } = require("../controllers/cartControllers");
const router = express.Router();



router.post('/add', addCartProduct)
router.get('/all/:id', getCartProducts)


module.exports = router;
