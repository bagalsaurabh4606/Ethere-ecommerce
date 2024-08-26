const uploadProductPremission = require("../helper/presmission")
const productModel = require("../models/productModel")

async function upadateProductController(req , res){
try{

  
  if(!uploadProductPremission(req.userId)){
    throw new Error("permission denied")
  }

  const {_id , ...resBody}=req.body
  const updateProduct=await productModel.findByIdAndUpdate(_id,resBody)

  res.json({
    message:"product updated successfully",
    data:updateProduct,
    error:false,
    success:true
  })

}catch(err){
    res.status(400).json({
      message:err.message || err,
      error:true,
      success:false
    })
  }
}

module.exports=upadateProductController