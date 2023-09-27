const ErrorHandler = require("../utils/ErrorHandler");
const Product = require('../models/product.js');
const apiFeatures = require("../utils/apiFeatures");



exports.newProduct = async (req, res, next) => {
  try {
    

    const imageUrl = req.body.image;
    const resPerPage = req.body.resPerPage

    const product = await Product.create({
      ...req.body,
      image: [{ url: imageUrl }], 
    });
     console.log(product);
    res.status(201).json({
      success: true,
      product,
      resPerPage
    });

  } catch (error) {
    console.error(error);
    
    // Check if the error is a validation error
    if (error.name === 'ValidationError') {
      // Extract validation error messages
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        errors: validationErrors,
      });
    }
    
    // If it's not a validation error, return a generic error response
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

//==============================================================
exports.getProducts = async (req, res, next) => {
    try {
        const resPerPage = 10;
        const productCount = await Product.countDocuments();
        
        const apiFeaturess = new apiFeatures(Product.find(), req.query).search().filter().pagination(resPerPage);

        const products = await apiFeaturess.query;

      if (!products) {
        return res.status(404).json({
          success: false,
          error: 'No products found', 
        });
      }
      res.status(200).json({
        success: true,
        count: products.length, 
        products,
        productCount,
        resPerPage
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
      });
    }
  };
  
  //get single product

  exports.getSingleProduct = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return next(new ErrorHandler("product not found", 404));
      }

      res.status(200).json({
        success: true,
        product,
      });
      
    } catch (error) {
      console.error(error);
      next(new ErrorHandler("Error fetching product", 500));
    //   res.status(500).json({
    //     success: false,
    //     error: 'Internal Server Error',
    //   });
    }
  };

  // Update product in db
  exports.updateProduct = async (req, res, next) => {
    try {
      let  product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'No product found',
        });
      }
      
      product = await Product.findByIdAndUpdate(req.params.id, req.body, {
         new:true,
         runValidators: true,
         useFindAndModify: false
      });

      res.status(200).json({
        success: true,
        message : "product is updated",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
      });
    }
  };

  // Delete an product by id
  exports.deleteProduct = async (req, res, next) => {
    try {
      let  product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'No product found',
        });
      }
      
      await Product.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: "product is deleted"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
      });
    }
  };
