const addtocarModel = require("../models/addtoCardModel");
const productModel = require("../models/productModel");

const fetchCartProductController=async(req,res)=>{
  try{
    const currentuser=req.userId;
    console.log("useridddddd",currentuser)
    
    // console.log("productttttttt",products)
    const cartProduct=await addtocarModel.find({userId:currentuser})
    console.log("dekh aa raha hai ya nahi ",cartProduct)
    res.json({
      error:false,
      success:true,
      data:cartProduct,
    })
  }catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports=fetchCartProductController;