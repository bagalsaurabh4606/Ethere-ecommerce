const uploadProductPremission = require("../helper/presmission");
const productModel =require("../models/productModel");

async function uploadPoductController(req ,res){
  try{

    const sessionuserId=req.userId
    if(!uploadProductPremission(sessionuserId)){
      throw new Error("permission denied")
    }
    const uploadproduct=await productModel(req.body)
    const saveproduct=await uploadproduct.save()
    
    res.status(201).json({
      message:"product uploaded successfully",
      error:false,
      success:true,
      data:saveproduct
    })

  }catch(err){
    res.status(400).json({
      message:err.message || err,
      error:true,
      success:false
    })
  }
}

module.exports=uploadPoductController