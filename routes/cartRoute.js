const express = require("express");
const { addCartProduct, getCartProducts, deleteCartProduct, increaseCartQuantity, decreaseCartQuantity, resetCartQuantity } = require("../controllers/cartControllers");
const router = express.Router();



router.post('/add', addCartProduct)
router.get('/all/:id', getCartProducts)
router.delete('/delete/:id', deleteCartProduct)
router.put('/increase/:id', increaseCartQuantity)
router.put('/decrease/:id', decreaseCartQuantity)
router.put('/reset/:id', resetCartQuantity)


module.exports = router;
