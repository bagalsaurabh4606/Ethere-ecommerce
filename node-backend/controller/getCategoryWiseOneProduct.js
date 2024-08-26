const productModel = require("../models/productModel");

const getCategoryWiseOneProduct=async(req,res)=>{
  try{

    const {category} = req?.body || req?.query
    console.log("ye category keliye product chaheyeL",category)
    const product=await productModel.find({category})

    res.json({
      data:product,
      message:"product fetched category wise",
      error:false,
      success:true
    })

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports=getCategoryWiseOneProduct;