
const addtoWishListModel = require("../../models/addtoWishListModel");


const getWishListProductController=async(req,res)=>{
  try{
    const currentuser=req.userId;
    const cartProduct=await addtoWishListModel.find({userId:currentuser})
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

module.exports=getWishListProductController;