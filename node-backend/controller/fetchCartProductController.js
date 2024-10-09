const addtocarModel = require("../models/addtoCardModel");
const productModel = require("../models/productModel");

const fetchCartProductController=async(req,res)=>{
  try{
    const currentuser=req.userId;
    console.log("cart product user ",currentuser)
    const cartProduct=await addtocarModel.find({userId:currentuser})
    
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