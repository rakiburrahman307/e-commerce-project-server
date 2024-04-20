const mongoose = require('mongoose');
// userAuthSchema 
const userAuthSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



module.exports = {
    userAuthSchema,

};