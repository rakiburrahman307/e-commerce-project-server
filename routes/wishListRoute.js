const express = require("express");
const {
  getWishListItem,
  addWishListToCart,
  deleteItemFromWishList,
} = require("../controllers/wishListControllers");
const router = express.Router();

router.get("/all/:id", getWishListItem);
router.post("/toCart", addWishListToCart)
router.delete("/delete/:id", deleteItemFromWishList)

module.exports = router;
