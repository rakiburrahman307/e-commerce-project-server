const mongoose = require('mongoose');
const { userAuthSchema, productSchema, customerReviewSchema } = require('../schema');

// User Model 
const User = mongoose.model('user', userAuthSchema);
const Product = mongoose.model('products', productSchema);
const Review = mongoose.model('reviews', customerReviewSchema);

module.exports ={
    User,
    Product,
    Review,
}
