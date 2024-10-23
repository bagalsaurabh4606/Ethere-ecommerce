const { json } = require("express");
const productModel = require("../models/productModel");

const deleteAdminProductController=async (req,res)=>{
  try{
    const {id}=req.body;
    const product=await productModel.findOneAndDelete({id:id})
    if (product) {
      res.status(200).json({
        message: "Product deleted successfully",
        error: false,
        success: true,
      });
    } 
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports=deleteAdminProductController;