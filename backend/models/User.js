const mongoose = require('mongoose');
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter product name'],
        maxLength: [30, 'product name cannot exceed 100 characters'],
    },
    email: {
        type: String,
        required: [true, 'please enter your email'],
        unique: true,
        validate : [validator.isEmail, "please enter your email"]
    },
    password: {
        type: String,
        required: [true, 'please enter your password'],
        minLength: [6, "password must be min 6 characters"],
        select : false
    },
    avatar: {
        piblic_id : {
            type: String,
            required : true
        },
        url : {
            type: String,
            required : true
        }
    },

    role : {
        type: String,
        default : "user"
    },

    createdAt : {
        type: Date,
        default : Date.now()
    },
    resetPasswordToken: String, 
    resetPasswordExpire: Date
})

module.exports = mongoose.model('user', userSchema); 