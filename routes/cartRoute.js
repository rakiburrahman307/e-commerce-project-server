const express = require("express");
const {
  addCartProduct,
  getCartProducts,
  deleteCartProduct,
  increaseCartQuantity,
  decreaseCartQuantity,
  resetCartQuantity,
  clearCart,
  addCartToWishList,
} = require("../controllers/cartControllers");
const router = express.Router();

// All Cart Routers

router.post("/add", addCartProduct);
router.get("/all/:id", getCartProducts);
router.delete("/delete/:id", deleteCartProduct);
router.put("/increase/quantity/:id", increaseCartQuantity);
router.put("/decrease/quantity/:id", decreaseCartQuantity);
router.put("/reset/quantity/:id", resetCartQuantity);
router.delete("/clear/:userId", clearCart);
router.post("/toWish", addCartToWishList);

module.exports = router;
