const mongoose = require('mongoose');
const { userAuthSchema, productSchema } = require('../schema');

// User Model 
const User = mongoose.model('user', userAuthSchema);
const Product = mongoose.model('products', productSchema);

module.exports ={
    User,
    Product,
}
