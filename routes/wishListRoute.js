const express = require("express");
const {
  getWishListItem,
  addWishListToCart,
} = require("../controllers/wishListControllers");
const router = express.Router();

router.get("/all/:id", getWishListItem);
router.post("/toCart", addWishListToCart)

module.exports = router;
