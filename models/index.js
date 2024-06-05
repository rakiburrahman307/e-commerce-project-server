const mongoose = require('mongoose');
const { userAuthSchema, productSchema, customerReviewSchema, wishListSchema, cartProductSchema } = require('../schema');

// User Model 
const User = mongoose.model('user', userAuthSchema);
const Product = mongoose.model('products', productSchema);
const Review = mongoose.model('reviews', customerReviewSchema);
const Cart = mongoose.model('cart', cartProductSchema);
const WishList = mongoose.model('wishlist', wishListSchema);

module.exports ={
    User,
    Product,
    Review,
    Cart,
    WishList
}
