const productModel = require("../../models/productModel")

const getproductController=async(req, res)=>{

  try{
    const getProduct =await productModel.find().sort({createdAt:-1})

    console.log("all product",getProduct)
    res.json({
      message:"All Product",
      error:false,
      success:true,
      data:getProduct
    })



  }catch(err){
    res.status(400).json({
      message:err.message || err,
      error:true,
      success:false
    })
  }

}

module.exports=getproductController