const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter product name'],
        trim:true,
        maxLength: [100, 'product name cannot exceed 100 characters'],
    },
    price: {
        type: Number,
        required: [true, 'please enter product price'],
        maxLength: [5, 'product price cannot exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'please enter product description'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    image: [
        {
         url: {
               type: String,
                  // required: true
             },
    }],

    category: {
        type : String,
        required: [true, "please select category for this item"],
        enum : {
            values : [
                "Electronics",
                "Cameras",
                "Laptops",
                "Accessories",
                "Headphones",
                "Food",
                "Books",
                "Clothes/Shoes",
                "Beauty/Health",
                "Sports",
                "Outdoor"
            ],
            message : "Please select correct category for product"
        }
    },
    seller : {
        type : String,
        required : [true, 'Please enter product seller ']
    },
    stock : {
        type : Number,
        required : [true, 'please enter product stock'],
        maxLength : [5, "product stock cannot exceed 5 characters"],
        default: 0
    },
    numOfReviews : {
        type: Number,
        default: 0
    },
    reviews : [
        {
        name : {
            type : String,
            // required : true
        },
         rating : {
            type: Number,
            // required : true
         },
         comment : {
            type : String,
            // required : true
         }
    }],
    createdAt : {
        type: Date,
        default : Date.now()
    }
})

module.exports = mongoose.model('product',productSchema); 