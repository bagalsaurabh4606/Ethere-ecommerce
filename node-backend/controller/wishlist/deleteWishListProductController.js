
const addtoWishListModel = require("../../models/addtoWishListModel");

const deleteWishListProductController=async(req,res)=>{
  try{
    const currentuser=req.userId;
    const cartproduct=String(req.body.id);
    const product=await addtoWishListModel.findOneAndDelete({userId:currentuser , id:cartproduct})

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

module.exports=deleteWishListProductController;