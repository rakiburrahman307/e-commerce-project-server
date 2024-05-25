const mongoose = require('mongoose');
const { userAuthSchema, productSchema, customerReviewSchema, CartProductSchema } = require('../schema');

// User Model 
const User = mongoose.model('user', userAuthSchema);
const Product = mongoose.model('products', productSchema);
const Review = mongoose.model('reviews', customerReviewSchema);
const Cart = mongoose.model('cart', CartProductSchema);

module.exports ={
    User,
    Product,
    Review,
    Cart
}
