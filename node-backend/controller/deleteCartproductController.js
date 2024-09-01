const addtocartModel = require("../models/addtoCardModel");

const deleteCartProductController=async(req,res)=>{
  try{
    const currentuser=req.userId;
    const cartproduct=String(req.body.productId);

    console.log("cart product comming",cartproduct)
    const product=await addtocartModel.findOneAndDelete({userId:currentuser , productId:cartproduct})

    console.log("cart product for delete",product)
    if(product){
      res.status(200).json({
        message:"product removed from Favorite",
        error:false,
        succes:true
      })
    }

  }catch(err){
    res.status(400).json({
      message:err.message || err,
      error:true,
      succes:false
    })
  }
}

module.exports=deleteCartProductController;