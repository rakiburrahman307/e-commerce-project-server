const mongoose = require("mongoose");
const {
  productSchema,
  customerReviewSchema,
  wishListSchema,
  cartProductSchema,
} = require("../schema");

// User Model

const Product = mongoose.model("products", productSchema);
const Review = mongoose.model("reviews", customerReviewSchema);
const Cart = mongoose.model("cart", cartProductSchema);
const WishList = mongoose.model("wishlist", wishListSchema);

module.exports = {
  Product,
  Review,
  Cart,
  WishList,
};
