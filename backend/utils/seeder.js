const Product  = require("../models/product.js");
const products = require('../data/products');
const connectDatabase = require('../config/database');


connectDatabase();


const seedProducts = async () => {

    try {
        await Product.deleteMany();
        console.log("Products deleted")
        await Product.insertMany(products);
        console.log("products inserted")
        process.exit();

    } catch(error) {
        console.log(error.message)
        process.exit();
    }

}

seedProducts();