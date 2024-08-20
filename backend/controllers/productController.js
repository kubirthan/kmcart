exports.getProducts = (req, res, next)=>{
    res.status(200).json({
        success: true,
        message: "This route will show the all products in database"
    })
}