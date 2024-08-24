const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apifeatures')

//get Products - /api/v1/products
exports.getProducts = catchAsyncError(async(req, res, next)=>{
    const apifeatures =  new APIFeatures(Product.find(), req.query).search()

    const products =   await apifeatures.query
    res.status(200).json({
      success: true,
      count: products.length,
      products
    })
  })

//Create product - /api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})

//get single product -  /api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
     if(!product){
        return next(new ErrorHandler("Product not found", 400))
     }
 
     res.status(201).json({
         success: true,
         product
     })
 })

//Update Product -  /api/v1/product/:id
exports.updateProduct = catchAsyncError(async(req,res,next) => {
    let product = await Product.findById(req.params.id)

    if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }

   product =  await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    })
})

//delete product - /api/v1/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
 
    if(!product){
     return res.status(201).json({
         success: false,
         message: "product not found"
     })
    }
 
    await Product.deleteOne()
 
    res.status(404).json({
     success: true,
     message: "Product deleted"
    })
 })