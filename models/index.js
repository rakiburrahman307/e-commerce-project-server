const mongoose = require('mongoose');
const { userAuthSchema } = require('../schema');

// User Model 
const User = mongoose.model('User', userAuthSchema);

module.exports ={
    User,
}